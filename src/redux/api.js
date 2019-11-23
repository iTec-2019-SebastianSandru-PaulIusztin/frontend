import createAPI from './createAPI';

const API_SPEC = {
  endpoints: {
    auth: '/auth/email/:id?/',
    buyer: '/buyer/:id?/',
    shops: '/stores/:id?/'
  },
  mappings: {},
  options: {}
};

const BASE_URL = 'https://bc859898.ngrok.io/api/';

export default createAPI(BASE_URL, API_SPEC);
