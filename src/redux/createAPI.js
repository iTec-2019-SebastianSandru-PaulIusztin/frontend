import axios from 'axios';
import URI from 'urijs';
import { compile, parse } from 'path-to-regexp';
import { matchPath } from 'react-router';
import md5 from 'md5';

import {
  takeEvery,
  takeLatest,
  take,
  call,
  put,
  race,
  fork,
  all,
  select,
  cancel,
  delay
} from 'redux-saga/effects';
import { channel } from 'redux-saga';

import { normalize, schema } from 'normalizr';

import { createSelector } from 'reselect';

import {
  map,
  reduce,
  forEach,
  get as _get,
  replace,
  size,
  keys,
  find,
  max,
  concat,
  without,
  compact,
  flatten,
  uniq,
  join,
  omit,
  omitBy,
  findKey,
  head,
  snakeCase,
  toUpper,
  has,
  includes,
  isString,
  isObject,
  isArray,
  isEmpty,
  isNil,
  pick,
  toInteger,
  flatMap,
  sortBy,
  ceil
} from 'lodash';

import { API_REQUEST_TIMEOUT, FAILED_REQUESTS_OFFLINE_THRESHOLD } from '../settings';

export default (baseURL, { endpoints = {}, mappings = {}, options = {} }) => {
  const ACTIONS = ['get', 'create', 'update', 'destroy', 'poll', 'upload'];
  const STATES = {
    requested: 'requested',
    succeeded: 'succeeded',
    failed: 'failed'
  };
  const METHODS = {
    create: 'POST',
    update: 'PATCH',
    destroy: 'DELETE',
    get: 'GET'
  };

  const resources = reduce(
    endpoints,
    (acc, endpoint, name) => {
      const resource = createResource(name, endpoint);
      return {
        ...acc,
        [resource.name]: resource
      };
    },
    {}
  );

  //
  //  ACTIONS

  const REQUESTED = '@ api / REQUESTED';
  const SUCCEEDED = '@ api / SUCCEEDED';
  const FAILED = '@ api / FAILED';
  const POLL_SPAWNED = '@ api / POLL_SPAWNED';
  const POLL_TIMEOUT = '@ api / POLL_TIMEOUT';
  const DOWNLOAD_REQUESTED = '@ api / DOWNLOAD_REQUESTED';
  const DOWNLOAD_SUCCEEDED = '@ api / DOWNLOAD_SUCCEEDED';
  const DOWNLOAD_FAILED = '@ api / DOWNLOAD_FAILED';

  const create = (url, data) => ({
    type: REQUESTED,
    payload: { url: buildURL(url), data, method: METHODS.create }
  });

  const update = (url, data) => ({
    type: REQUESTED,
    payload: { url: buildURL(url), data, method: METHODS.update }
  });

  const get = (url, params = {}) => ({
    type: REQUESTED,
    payload: { url: buildURL(url, params), method: METHODS.get }
  });

  const destroy = (url, params = {}) => ({
    type: REQUESTED,
    payload: { url: buildURL(url, params), method: METHODS.destroy }
  });

  const poll = (url, params = {}, options = DEFAULT_POLL_OPTIONS) => ({
    type: POLL_SPAWNED,
    payload: { url: buildURL(url, params), ...options }
  });

  const upload = (url, data) => ({
    type: REQUESTED,
    payload: {
      url: buildURL(url),
      data: buildFormData(data),
      method: METHODS.update,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }
  });

  const download = (url, params = {}, filename, options = {}) => ({
    type: DOWNLOAD_REQUESTED,
    payload: { url: buildURL(url, params), filename, options }
  });

  const DEFAULT_POLL_OPTIONS = {
    interval: 5 * 1000,
    timeout: 50 * 1000,
    state: {}
  };

  const http = axios.create({
    baseURL,
    timeout: API_REQUEST_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  //
  //  SAGA

  function* saga() {
    yield takeEvery(REQUESTED, performRequest);
    yield takeEvery([REQUESTED, FAILED, SUCCEEDED], emitResourceSpecificActions);
    yield takeLatest(POLL_SPAWNED, performPoll);
  }

  function* performRequest({ payload }) {
    const { url, method, data, config } = payload;

    try {
      const response = yield call(http.request, { method, url, data, config });
      yield put({ type: SUCCEEDED, payload: { url, method, response } });
    }
    catch (exception) {
      if (isNetworkError(exception)) {
        const { response } = exception;
        const error = parseErrors(exception);
        yield put({ type: FAILED, payload: { url, method, response, error } });
      }
      else if (isTimeoutError(exception)) {
        const response = null;
        const error = exception;
        yield put({ type: FAILED, payload: { url, method, response, error } });
      }
      else throw exception;
    }
  }

  function* performPoll({ payload }) {
    const { url, interval, timeout, state } = payload;

    const resourceName = parseURL(url).resource;
    const resource = getResource(resourceName);

    if (!resource) {
      return;
    }

    if (!state.timestamp) {
      yield fork(performPoll, {
        payload: { ...payload, state: { ...state, timestamp: Date.now() } }
      });
      return;
    }

    if (state.timeout + timeout < Date.now()) {
      yield put({ type: POLL_TIMEOUT, payload });
      return;
    }

    yield put({ type: resource.POLL_REQUESTED, payload });

    const entries = yield select(resource.selectors.getAll);
    const lastID = max(map(entries, 'id'));

    yield put(get(url, { id__gt: lastID }));

    const { success } = yield race({
      success: take(resource.GET_SUCCEEDED),
      failure: take(resource.GET_FAILED)
    });

    if (success && !isEmpty(success.payload.data)) {
      yield put({ type: resource.POLL_SUCCEEDED, payload });
      return;
    }

    yield delay(interval);
    yield fork(performPoll, { payload });
  }

  function* waitForResponse({ url, timeout = 10000 }) {
    const successfulRequests = channel();
    const failedRequests = channel();
    const watchForSuccessfulRequests = yield takeEvery(SUCCEEDED, function* checkURL(
      action
    ) {
      if (action.payload.url === url) {
        yield put(successfulRequests, action);
      }
    });

    const watchForFailedRequests = yield takeEvery(FAILED, function* checkURL(action) {
      if (action.payload.url === url) {
        yield put(failedRequests, action);
      }
    });

    const { success } = yield race({
      success: take(successfulRequests),
      failure: take(failedRequests),
      timeout: delay(timeout)
    });

    yield cancel(watchForSuccessfulRequests);
    yield cancel(watchForFailedRequests);
    successfulRequests.close();
    failedRequests.close();

    return success || null;
  }

  function* emitResourceSpecificActions({ type, payload }) {
    const { url, method } = payload;
    const resourceName = parseURL(url).resource;
    const resource = getResource(resourceName);

    if (!resource) {
      return;
    }

    const action = findKey(METHODS, (m) => m === method);
    switch (type) {
      case REQUESTED:
        yield put({
          type: resource[actionDescriptor(action, 'requested')],
          payload: { url }
        });
        break;

      case SUCCEEDED: {
        const { response } = payload;
        const meta = pick(response.data, ['count', 'page_size']);
        const { entities } = normalizeResponseWithSchema(response.data, resource.schema);
        const resourcesInResponse = uniq(
          compact(flatten([resourceName, keys(entities)]))
        );
        const resources =          action !== 'update' ? map(resourcesInResponse, getResource) : [resource];

        yield all(
          map(resources, (resource) => put({
            type: resource[actionDescriptor(action, 'succeeded')],
            payload: { url, meta, data: _get(entities, resource.name, {}) }
          }))
        );

        break;
      }

      case FAILED: {
        const { error } = payload;
        yield put({
          type: resource[actionDescriptor(action, 'failed')],
          payload: { url, error }
        });
        break;
      }

      default:
        break;
    }
  }

  //
  //   REDUCER

  const initialState = {
    pendingRequests: {
      global: 0
    },
    uploadRequests: [],
    networkFailedRequests: 0
  };

  function reducer(state = initialState, action = {}) {
    let networkFailed = false;
    switch (action.type) {
      case REQUESTED: {
        const { url, method, config } = action.payload;
        if (isUploadRequest(config)) {
          return {
            ...state,
            uploadRequests: concat(state.uploadRequests, url)
          };
        }

        if (method !== METHODS.get) {
          return state;
        }

        const { resource } = parseURL(url);
        const keys = compact(['global', url, resource]);

        return {
          ...state,
          pendingRequests: reduce(
            keys,
            (acc, key) => ({
              ...acc,
              [key]: _get(acc, key, 0) + 1
            }),
            state.pendingRequests
          )
        };
      }

      case FAILED: {
        const { error } = action.payload;
        if (error && isNetworkError(error)) {
          networkFailed = true;
        }
      }
      case SUCCEEDED: {
        const { url, method, response, error } = action.payload;
        if (
          isUploadRequest(_get(response, 'config.config'))
          || isUploadRequest(_get(error, 'config.config'))
        ) {
          return {
            ...state,
            networkFailedRequests: networkFailed ? state.networkFailedRequests + 1 : 0,
            uploadRequests: without(state.uploadRequests, url)
          };
        }

        if (method !== METHODS.get) {
          return {
            ...state,
            networkFailedRequests: networkFailed ? state.networkFailedRequests + 1 : 0
          };
        }

        const { resource } = parseURL(url);
        const keys = compact(['global', url, resource]);

        return {
          ...state,
          networkFailedRequests: networkFailed ? state.networkFailedRequests + 1 : 0,
          pendingRequests: reduce(
            keys,
            (acc, key) => ({
              ...acc,
              [key]: _get(acc, key, 0) - 1
            }),
            state.pendingRequests
          )
        };
      }

      default:
        return state;
    }
  }

  function reduceRequests(resourceName, state = {}, action = {}) {
    const resource = getResource(resourceName);
    if (!resource) {
      return state;
    }

    switch (action.type) {
      case resource.GET_SUCCEEDED:
      case resource.CREATE_SUCCEEDED:
      case resource.UPDATE_SUCCEEDED: {
        const { data, url } = action.payload;

        const entities = reduce(
          data,
          (acc, entry, key) => ({
            ...acc,
            [key]: {
              ...acc[key],
              ...entry
            }
          }),
          _get(state, 'entities', {})
        );

        const paginationHash = getPaginationHash(url);
        const currentPage = toInteger(_get(parseURL(url), 'params.page', 1));
        const loadedPages = _get(state, ['meta', paginationHash, 'loadedPages'], []);

        const meta = {
          ..._get(state, 'meta', {}),
          [paginationHash]: {
            ...action.payload.meta,
            loadedPages: uniq([...loadedPages, currentPage])
          }
        };

        return {
          ...state,
          entities,
          meta
        };
      }

      case resource.DESTROY_SUCCEEDED: {
        const { url } = action.payload;
        const {
          params: { id }
        } = parseURL(url);
        return {
          ...state,
          entities: omit(state.entities, id)
        };
      }

      default:
        return state;
    }
  }

  //
  //  HELPERS

  function buildURL(resourceOrURL, query = {}) {
    if (!isString(resourceOrURL)) {
      throw new Error(`Invalid resource or URL given: ${JSON.stringify(resourceOrURL)}`);
    }

    const parsedURL = parseURL(resourceOrURL);
    const givenURL = URI.parse(resourceOrURL);
    const givenParams = {
      ...URI.parseQuery(givenURL.query),
      ...query
    };

    const url = new URI(baseURL);

    const params = { ...parsedURL.params, ...givenParams };
    const pathname = isResourceName(resourceOrURL)
      ? getResource(resourceOrURL).endpoint
      : isResourceName(parsedURL.resource)
        ? getResource(parsedURL.resource).endpoint
        : resourceOrURL;

    const compiled = compilePath(pathname, params);

    url.path(URI.joinPaths(url.path(), normalizePath(compiled.path)).toString());
    url.query(compiled.params);

    return url.toString();
  }

  function parseURL(url) {
    const matchedRoutes = compact(
      map(resources, ({ name, endpoint }) => {
        const match = matchPath(normalizePath(url), {
          path: endpoint,
          exact: true
        });
        return match ? { ...match, resource: name } : null;
      })
    );

    const parsedURL = URI.parse(url);

    if (!isEmpty(matchedRoutes)) {
      const { resource, params } = head(matchedRoutes);
      const allParams = {
        ...URI.parseQuery(parsedURL.query),
        ...params
      };

      return {
        resource,
        params: omitBy(allParams, isNil)
      };
    }

    return {
      resource: null,
      path: parsedURL.path,
      params: URI.parseQuery(parsedURL.query)
    };
  }

  function compilePath(routePath, allParams) {
    const path = compile(routePath)(allParams);
    const routeTokens = map(parse(routePath), 'name');
    const params = omit(allParams, routeTokens);
    return { path, params };
  }

  function normalizePath(path) {
    const givenURL = new URI(path);
    const apiBaseURL = new URI(baseURL);

    const replacements = [
      [new RegExp(`^(/?${apiBaseURL.path()})?`), '/'],
      [/\/+/g, '/'],
      [/^([^.]*[^/])$/, '$1/']
    ];

    return reduce(
      replacements,
      (acc, [pattern, replacement]) => replace(acc, pattern, replacement),
      givenURL.path()
    );
  }

  function normalizeResponseWithSchema(responseData, schema) {
    if (isObject(schema)) {
      if (isListResponse(responseData)) {
        return normalize(responseData, { results: [schema] });
      }
      if (isObject(responseData)) {
        return normalize(responseData, schema);
      }
    }
    return {
      entities: {},
      result: []
    };
  }

  function isListResponse(response) {
    return (
      has(response, 'results') && has(response, 'pages') && has(response, 'page_size')
    );
  }

  function createResource(name, endpoint) {
    return {
      name,
      endpoint,
      schema: createSchema(name),
      selectors: createSelectors(name),
      ...createActionTypes(name)
    };
  }

  function createSchema(resourceName) {
    const mappingOptions = (resourceName) => {
      if (has(mappings, resourceName)) {
        return reduce(
          mappings[resourceName],
          (acc, nestedResourceName, key) => ({
            ...acc,
            [key]: createSchema(nestedResourceName)
          }),
          {}
        );
      }
      return {};
    };

    if (isArray(resourceName)) {
      const resource = head(resourceName);
      return [
        new schema.Entity(resource, mappingOptions(resource), _get(options, resource, {}))
      ];
    }
    if (isString(resourceName)) {
      return new schema.Entity(
        resourceName,
        mappingOptions(resourceName),
        _get(options, resourceName, {})
      );
    }

    return null;
  }

  function createActionTypes(resourceName, actions = ACTIONS) {
    const actionNames = reduce(
      actions,
      (types, action) => {
        if (includes(ACTIONS, action)) {
          return {
            ...types,
            ...reduce(
              STATES,
              (actions, state) => {
                const key = actionDescriptor(action, state);
                return {
                  ...actions,
                  [key]: `@ ${snakeCase(resourceName)} / ${key}`
                };
              },
              {}
            )
          };
        }
        return types;
      },
      {}
    );
    return actionNames;
  }

  function createRootSelector(resourceName) {
    return (state) => _get(state, [resourceName, 'entities'], {});
  }

  function createSelectors(resourceName) {
    const getAll = createRootSelector(resourceName);
    const getForID = (id) => createSelector(getAll, (entities) => entities[id]);
    const getForURL = (url) => createSelector(getAll, (entities) => find(entities, { url }));
    const countAll = createSelector(getAll, (entities) => size(keys(entities)));

    return {
      getAll,
      getForID,
      getForURL,
      countAll
    };
  }

  function actionDescriptor(action, state) {
    if (includes(ACTIONS, action) && includes(STATES, state)) {
      return toUpper(join([action, state], '_'));
    }
    return null;
  }

  function isResourceName(name) {
    return has(resources, name);
  }

  function getResource(name) {
    return resources[name];
  }

  function setHeaders(headers) {
    forEach(headers, (value, name) => {
      axios.defaults.headers.common[name] = value;
    });
  }

  function buildFormData(data) {
    return reduce(
      data,
      (acc, value, key) => {
        acc.append(key, value);
        return acc;
      },
      new FormData()
    );
  }

  function isUploadRequest(request) {
    return _get(request, 'headers.Content-Type') === 'multipart/form-data';
  }

  function isNetworkError(error) {
    return (
      error.message
      && !isEmpty(error.message.match(/^(Request failed with status code|Network Error)/))
    );
  }

  function isTimeoutError(error) {
    return error.message && !isEmpty(error.message.match(/^timeout of (\d+)ms exceeded/));
  }

  function parseErrors(errorResponse) {
    let response = errorResponse;

    if (has(response, 'payload.error')) {
      response = _get(response, 'payload.error');
    }
    if (has(response, 'error')) {
      response = _get(response, 'error');
    }

    let errors = has(response, 'response.data')
      ? _get(response, 'response.data')
      : response;

    const parseError = (error) => {
      if (isArray(error)) {
        return map(error, parseError);
      }
      if (isString(error)) {
        return error;
      }
      if (isObject(error) && has(error, 'message') && has(error, 'code')) {
        return error.message;
      }
      if (isObject(error)) {
        return reduce(
          error,
          (acc, field, name) => ({
            ...acc,
            [name]: parseError(field)
          }),
          {}
        );
      }
      return null;
    };

    if (isString(errors)) {
      if (errors[0] === '<') {
        return { _error: 'Internal Server Error' };
      }

      return {
        _error: errors
      };
    }

    if (has(errors, 'message')) {
      errors = { ...errors, message: errors.message };
    }

    return reduce(
      errors,
      (acc, error, key) => {
        const field = key === 'non_field_errors' ? '_error' : key;
        return {
          ...acc,
          [field]: parseError(error)
        };
      },
      {}
    );
  }

  function getPaginationHash(url) {
    const { resource, params } = parseURL(url);
    const sortParams = (params) => {
      const sortedKeys = sortBy(keys(params));
      return flatMap(sortedKeys, (key) => [key, _get(params, key)]);
    };
    const key = join([resource, ...sortParams(omit(params, 'page'))], '__');
    return md5(key);
  }

  //
  //  SELECTORS

  const isLoading = (resourceOrURL) => createSelector(
    (state) => state.api,
    (api) => _get(api, ['pendingRequests', resourceOrURL || 'global'], 0) > 0
  );
  const isUploading = (url) => createSelector(
    (state) => state.api,
    (api) => includes(api.uploadRequests, url)
  );
  const isOffline = createSelector(
    (state) => state.api,
    (api) => api.networkFailedRequests >= FAILED_REQUESTS_OFFLINE_THRESHOLD
  );

  const getPaginationMeta = (url) => (state) => {
    const { resource } = parseURL(url);
    return _get(state, [resource, 'meta', getPaginationHash(url)], {});
  };
  const getNextPageNumber = (url) => createSelector(
    [getCurrentPageNumber(url), getTotalPagesNumber(url)],
    (currentPage, totalPages) => {
      if (!totalPages) {
        return null;
      }
      if (currentPage === totalPages) {
        return null;
      }
      return currentPage + 1;
    }
  );
  const getTotalPagesNumber = (url) => createSelector(getPaginationMeta(url), (meta) => ceil(_get(meta, 'count', 0) / _get(meta, 'page_size', 1)));
  const getCurrentPageNumber = (url) => createSelector(getLoadedPages(url), (pages) => max(pages) || 1);
  const getLoadedPages = (url) => createSelector(getPaginationMeta(url), (meta) => _get(meta, 'loadedPages', []));

  return {
    get,
    create,
    update,
    destroy,
    poll,
    upload,
    download,
    waitForResponse,
    ...resources,
    reduceRequests,
    baseURL,

    http,
    setHeaders,
    normalizeResponseWithSchema,
    isNetworkError,
    isTimeoutError,
    parseErrors,
    normalizePath,
    buildURL,
    parseURL,
    buildFormData,
    getPaginationHash,

    reducer,
    saga,

    isLoading,
    isUploading,
    isOffline,
    getPaginationMeta,
    getCurrentPageNumber,
    getNextPageNumber,
    getTotalPagesNumber,
    getLoadedPages,

    REQUESTED,
    SUCCEEDED,
    FAILED,
    DOWNLOAD_REQUESTED,
    DOWNLOAD_SUCCEEDED,
    DOWNLOAD_FAILED
  };
};
