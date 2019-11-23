import createAPI from './createAPI';

const API_SPEC = {
  endpoints: {
    auth: '/auth/email/:id?/'
  },
  mappings: {},
  options: {}
};

const BASE_URL = 'http://localhost:8888/api/';

export default createAPI(BASE_URL, API_SPEC);
