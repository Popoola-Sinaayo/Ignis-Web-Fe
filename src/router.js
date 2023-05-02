import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Events from "./components/Events";
import AddEvents from "./components/AddEvents";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/events/add",
    element: <AddEvents />,
  },
]);

export default router