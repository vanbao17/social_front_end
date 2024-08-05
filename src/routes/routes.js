import LayoutEmpty from "../components/layouts/LayoutEmpty/LayoutEmpty";
import configs from "../configs/configs";
import FriendPage from "../pages/FriendPage/FriendPage";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login/Login";
import Messenger from "../pages/Messenger/Messenger";
import PersonalPage from "../pages/PersonalPage/PersonalPage";
import Search from "../pages/Search/Search";
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
  {
    path: configs.PersonalPage,
    component: PersonalPage,
  },
  {
    path: configs.Friends,
    component: FriendPage,
  },
  {
    path: configs.Messenger,
    component: Messenger,
  },
  {
    path: configs.Search,
    component: Search,
  },
];
export default publicRoute;
