import SignIn from './features/Auth/pages/LoginPage';
import SignUp from './features/Auth/components/FormRegister';
import Home from './features/Home/page/Home';
import AccountSettings from './features/AccountSetting/AccountSettings';
import UserManagement from './Admin/UserManagement/UserManagement';
import Music from './features/Music/pages/Music';

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
        path: "/music/:slug",
        exact: true,
        main: Music
    }
]

export const PRIVATE_ROUTES_ADMIN = [
    {
        path: "/admin/user-management",
        exact: true,
        main: UserManagement
    }
]

export const PRIVATE_ROUTES_MANAGER = [
    {
        path: "/manager/user-management",
        exact: true,
        main: UserManagement
    }
]