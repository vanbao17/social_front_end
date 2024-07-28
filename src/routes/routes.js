import LayoutEmpty from "../components/layouts/LayoutEmpty/LayoutEmpty";
import configs from "../configs/configs";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login/Login";
const publicRoute = [
  {
    path: configs.Home,
    component: HomePage,
  },
  {
    path: configs.Login,
    component: Login,
    layout: LayoutEmpty,
  },
];
export default publicRoute;
