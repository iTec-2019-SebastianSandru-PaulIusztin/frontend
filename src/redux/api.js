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

<<<<<<< HEAD
const BASE_URL = 'http://192.168.43.50:8888/api/';
=======
const BASE_URL = 'https://bc859898.ngrok.io/api/';
>>>>>>> 3a55daa6d09625b2665d3d75834d9718e9e0999d

export default createAPI(BASE_URL, API_SPEC);
