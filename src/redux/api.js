import createAPI from './createAPI';

const API_SPEC = {
  endpoints: {
    auth: '/auth/email/:id?/',
    buyer: '/buyer/:id?/',
    shops: '/stores/:id?/',
    products: '/products/:id?/',
    sellers: '/sellers/:id?/',
    payments: '/payments/:id?/'
  },
  mappings: {},
  options: {}
};


const BASE_URL = 'https://b5d5934d.ngrok.io/api/';

export default createAPI(BASE_URL, API_SPEC);
