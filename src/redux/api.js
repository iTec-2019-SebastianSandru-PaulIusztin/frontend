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


const BASE_URL = 'https://c6170e24.ngrok.io/api/';


export default createAPI(BASE_URL, API_SPEC);
