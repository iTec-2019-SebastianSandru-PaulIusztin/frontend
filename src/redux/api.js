import createAPI from './createAPI';

const API_SPEC = {
  endpoints: {
    auth: '/auth/email/:id?/',
    buyer: '/buyer/:id?/',
    shops: '/stores/:id?/',
    products: '/products/:id?/'
  },
  mappings: {},
  options: {}
};

const BASE_URL = 'http://192.168.43.50:8888/api/';

export default createAPI(BASE_URL, API_SPEC);
