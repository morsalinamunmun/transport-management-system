import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import AddCustomer from "../Pages/AddCustomer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "AddCustomer",
        element: <AddCustomer />,
      },
    ],
  },
]);
