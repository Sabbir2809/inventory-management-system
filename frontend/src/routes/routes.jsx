import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Signup from "../pages/Signup";
import { routeGenerator } from "../utils/routesGenerator";
import { userPaths } from "./user.routes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
