import GradePage from "../pages/Grade";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ProfilePage from "../pages/Profile";

const allPages = {
    grade: {
        path: "/",
        component: GradePage
    },
    login: {
        path: "/",
        component: LoginPage
    },
    register: {
        path: "/register",
        component: RegisterPage
    },
    profile: {
        path: "/profile",
        component: ProfilePage
    }
};

const routes = {
    guest: [allPages.login, allPages.register],
    user: [allPages.grade, allPages.profile],
};

export default routes;