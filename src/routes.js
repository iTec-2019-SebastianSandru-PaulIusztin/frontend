import RegisterScreen from './screens/auth/RegisterScreen';
import LoginScreen from './screens/auth/LoginScreen';
import Tables from './views/examples/Tables';
import Shopcart from "./views/examples/Shopcart";
import Profile from "./views/examples/Profile";
import Products from "./views/examples/Products";

const routes = [
  {
    path: '/index',
    name: 'Dashboard',
    component: Tables,
    icon: 'ni ni-tv-2 text-primary',
    layout: '/admin'
  },
  {
    path: '/shop/cart',
    name: 'Shop Cart',
    component: Shopcart,

    icon: 'ni ni-money-coins text-orange',
    layout: '/admin'
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    component: Profile,

    icon: 'ni ni-single-02 text-yellow',
    layout: '/admin'
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    icon: 'ni ni-bullet-list-67 text-red',
    layout: '/admin'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginScreen,
    icon: 'ni ni-key-25 text-info',
    layout: '/auth'
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-circle-08 text-pink',
    component: RegisterScreen,
    layout: '/auth'
  }
];
export default routes;
