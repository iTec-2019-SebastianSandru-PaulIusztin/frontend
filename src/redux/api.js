import createAPI from './createAPI';

const API_SPEC = {
  endpoints: {
    auth: '/auth/email/:id?/',
    buyer: '/buyer/:id?/'
  },
  mappings: {},
  options: {}
};

const BASE_URL = 'https://add26e8b.ngrok.io/api/';

export default createAPI(BASE_URL, API_SPEC);
