import { createBrowserRouter } from "react-router";
import Home from "../components/homepage/Home";
import Login from "../components/shared/Login";
import Registration from "../components/shared/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
path:"/register",
Component: Registration
  },
]);

export default router;
