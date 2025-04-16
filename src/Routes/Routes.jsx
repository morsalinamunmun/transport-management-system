import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import AddCustomer from "../Pages/AddCustomer";
import CarList from "../Pages/CarList";
import AddCarForm from "../Pages/AddCarForm";
import DriverList from "../Pages/DriverList";
import AddDriverForm from "../Pages/AddDriverForm";
import TripList from "../Pages/TripList";
import AddTripForm from "../Pages/AddTripForm";
import Fuel from "../Pages/Fuel";
import FuelForm from "../Pages/FuelForm";
import Parts from "../Pages/Parts";
import Maintenance from "../Pages/Maintenance";
import MaintenanceForm from "../Pages/MaintenanceForm";
import DailyIncome from "../Pages/DailyIncome";
import DailyExpense from "../Pages/DailyExpense";
import AllUsers from "../Pages/AllUsers";
import AddUserForm from "../Pages/AddUserForm";

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
      {
        path: "CarList",
        element: <CarList />,
      },
      {
        path: "AddCarForm",
        element: <AddCarForm />,
      },
      {
        path: "DriverList",
        element: <DriverList />,
      },
      {
        path: "AddDriverForm",
        element: <AddDriverForm />,
      },
      {
        path: "TripList",
        element: <TripList />,
      },
      {
        path: "AddTripForm",
        element: <AddTripForm />,
      },
      {
        path: "Fuel",
        element: <Fuel />,
      },
      {
        path: "FuelForm",
        element: <FuelForm />,
      },
      {
        path: "Parts",
        element: <Parts />,
      },
      {
        path: "Maintenance",
        element: <Maintenance />,
      },
      {
        path: "MaintenanceForm",
        element: <MaintenanceForm />,
      },
      {
        path: "DailyIncome",
        element: <DailyIncome />,
      },
      {
        path: "DailyExpense",
        element: <DailyExpense />,
      },
      {
        path: "AllUsers",
        element: <AllUsers />,
      },
      {
        path: "AddUserForm",
        element: <AddUserForm />,
      },
    ],
  },
]);
