import DefaultLayout from "../../Layouts/Default.layout";
import Home from "../../Views/Home/Home";


const protectedRoutes = [
  {
    path: "/dashboard",
    exact: true,
    layout: DefaultLayout,
    roles: ["admin", "user"],
    element: Home,
  },
];

export default protectedRoutes;