import SignIn from './features/Auth/components/FormLogin';
import SignUp from './features/Auth/components/FormRegister';
import Home from './features/Home/page/Home';
import AccountSettings from './features/AccountSetting/AccountSettings';
import UserManagement from './Admin/UserManagement/UserManagement';

export const ROUTES = [
    {
        path: "/signup",
        exact: true,
        main: SignUp
    },
    {
        path: "/login",
        exact: true,
        main: SignIn
    }
]

export const PRIVATE_ROUTES = [
    {
        path: "/",
        exact: true,
        main: Home
    },
    {
        path: "/account-setting",
        exact: true,
        main: AccountSettings
    },
    {
        path: "/admin/user-management",
        exact: true,
        main: UserManagement
    }
]