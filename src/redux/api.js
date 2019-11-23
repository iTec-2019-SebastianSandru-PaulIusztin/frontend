import createAPI from './createAPI';

const API_SPEC = {
  endpoints: {
    auth: '/auth/email/:id?/',
    buyer: '/buyer/:id?/'
  },
  mappings: {},
  options: {}
};

const BASE_URL = 'https://aa2adbc9.ngrok.io/api/';

export default createAPI(BASE_URL, API_SPEC);
