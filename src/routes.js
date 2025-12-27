import { ROUTES } from "./configs";
import AuthLayout from "./layouts/AuthLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import NoLayout from "./layouts/NoLayout";
import Activity from "./pages/Activity";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Following from "./pages/Following";
import Ghost from "./pages/Ghost";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

const routes = [
  {
    layout: DefaultLayout,
    children: [
      { path: ROUTES.HOME, component: Home },
      { path: ROUTES.SEARCH, component: Search },
      { path: ROUTES.ACTIVITY, component: Activity },
      { path: ROUTES.FOLLOWING, component: Following },
      { path: ROUTES.GHOST, component: Ghost },
      { path: ROUTES.PROFILE, component: Profile },
      { path: ROUTES.POST_DETAIL, component: PostDetail },
    ],
  },
  {
    layout: AuthLayout,
    children: [
      { path: ROUTES.LOGIN, component: Login },
      { path: ROUTES.REGISTER, component: Register },
    ],
  },
  {
    layout: NoLayout,
    children: [{ path: ROUTES.NOTFOUND, component: NotFound }],
  },
];

export default routes;
