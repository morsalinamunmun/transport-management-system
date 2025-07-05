import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
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
import Login from "../components/Form/Login";
import ResetPass from "../components/Form/ResetPass";
import PrivateRoute from "./PrivateRoute";
import UpdateCarForm from "../Pages/updateForm/UpdateCarForm";
import UpdateTripForm from "../Pages/updateForm/UpdateTripForm";
import UpdateFuelForm from "../Pages/updateForm/UpdateFuelForm";
import UpdatePartsForm from "../Pages/updateForm/UpdatePartsForm";
import UpdateUsersForm from "../Pages/updateForm/UpdateUsersForm";
import UpdateMaintenanceForm from "../Pages/updateForm/UpdateMaintenanceForm";
import UpdateDriverForm from "../Pages/updateForm/UpdateDriverForm";
import UpdateDailyIncomeForm from "../Pages/updateForm/UpdateDailyIncomeForm";
import UpdateExpenseForm from "../Pages/updateForm/UpdateExpenseForm";
import AdminRoute from "./AdminRoute";
import MonthlyStatement from "../Pages/MonthlyStatement";
import DailyTripExpense from "../Pages/DailyTripExpense";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/car-list",
        element: (
          <PrivateRoute>
            <CarList />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-carForm",
        element: (
          <PrivateRoute>
            <AddCarForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-CarForm/:id",
        element: (
          <PrivateRoute>
            <UpdateCarForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/vehicle/${params.id}`),
      },
      {
        path: "/driver-list",
        element: (
          <PrivateRoute>
            <DriverList />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-driverForm",
        element: (
          <PrivateRoute>
            <AddDriverForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-driverForm/:id",
        element: (
          <PrivateRoute>
            <UpdateDriverForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/driver/${params.id}`),
      },
      {
        path: "/trip-list",
        element: (
          <PrivateRoute>
            <TripList />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-tripForm",
        element: (
          <PrivateRoute>
            <AddTripForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-tripForm/:id",
        element: (
          <PrivateRoute>
            <UpdateTripForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/trip/${params.id}`),
      },
      {
        path: "/fuel",
        element: (
          <PrivateRoute>
            <Fuel />
          </PrivateRoute>
        ),
      },
      {
        path: "/fuel-form",
        element: (
          <PrivateRoute>
            <FuelForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-fuelForm/:id",
        element: (
          <PrivateRoute>
            <UpdateFuelForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/fuel/${params.id}`),
      },
      {
        path: "/Parts",
        element: (
          <PrivateRoute>
            <Parts />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-partsForm/:id",
        element: (
          <PrivateRoute>
            <UpdatePartsForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/parts/${params.id}`),
      },
      {
        path: "/maintenance",
        element: (
          <PrivateRoute>
            <Maintenance />
          </PrivateRoute>
        ),
      },
      {
        path: "/maintenanceForm",
        element: (
          <PrivateRoute>
            <MaintenanceForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-maintenanceForm/:id",
        element: (
          <PrivateRoute>
            <UpdateMaintenanceForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/maintenance/${params.id}`),
      },
      {
        path: "/daily-income",
        element: (
          <AdminRoute>
            <DailyIncome />
          </AdminRoute>
        ),
      },
      {
        path: "/daily-trip-expense",
        element: (
          <PrivateRoute>
            <DailyTripExpense />
          </PrivateRoute>
        ),
      },
      {
        path: "/daily-expense",
        element: (
          <PrivateRoute>
            <DailyExpense />
          </PrivateRoute>
        ),
      },
      {
        path: "/monthly-statement",
        element: (
          <PrivateRoute>
            <MonthlyStatement/>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/add-userForm",
        element: (
          <AdminRoute>
            <AddUserForm />
          </AdminRoute>
        ),
      },
      {
        path: "/update-usersForm/:id",
        element: (
          <PrivateRoute>
            <UpdateUsersForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/users/${params.id}`),
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/ResetPass",
        element: <ResetPass />,
      },
      {
        path: "/update-DailyIncomeForm/:id",
        element: (
          <AdminRoute>
            <UpdateDailyIncomeForm />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/trip/${params.id}`),
      },
      {
        path: "/Update-ExpenseForm/:id",
        element: (
          <PrivateRoute>
            <UpdateExpenseForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/trip/${params.id}`),
      },
    ],
  },
]);
