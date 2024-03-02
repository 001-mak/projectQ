import Home from "../components/Home"
import Login from "../components/Login";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import Register from "../components/Register";
import PartAE from "../components/admin/pages/parts/part-ae";
import PartsLV from "../components/admin/pages/parts/parts-lv";
import ProductAE from "../components/admin/pages/products/product-ae";
import ProductsLV from "../components/admin/pages/products/products-lv";
import UserAE from "../components/admin/pages/users/user-ae";
import UsersLV from "../components/admin/pages/users/users-lv";

const routes = [
	{
		path: '/',
		component: Home,
		exact: true,
	},
    {
		path: '/login',
		component: Login,
		private: false,
	},
    {
		path: '/register',
		component: Register,
		private: false,
	},
    {
		path: '/forgot-password',
		component: ForgotPassword,
		private: false,
	},
    {
		path: '/reset-password',
		component: ResetPassword,
		private: false,
	},
    {
		path: '/forgot-password',
		component: ForgotPassword,
		private: false,
	},
    {
		path: '/part-ae',
		component: PartAE,
		private: true,
	},
    {
		path: '/part-lv',
		component: PartsLV,
		private: true,
	},
    {
		path: '/product-ae',
		component: ProductAE,
		private: true,
	},
    {
		path: '/product-lv',
		component: ProductsLV,
		private: true,
	},
    {
		path: '/user-ae',
		component: UserAE,
		private: true,
	},
    {
		path: '/user-lv',
		component: UsersLV,
		private: true,
	},
];

export default routes;