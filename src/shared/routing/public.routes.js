import { Navigate } from "react-router-dom";
import DefaultLayout from "../../Layouts/Default.layout";
import Login from "../../Views/Auth/Login";
import Home from "../../Views/Home/Home";

const publicRoutes = [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    element: () => Navigate({ to: "/home", replace: true }),
  },
  {
    path: "/login",
    exact: true,
    layout: DefaultLayout,
    element: Login,
  },
  {
    path: "/home",
    exact: true,
    layout: DefaultLayout,
    element: Home,
  },
];

export default publicRoutes;