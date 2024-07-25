import * as React from "react";
import { createBrowserRouter } from 'react-router-dom';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AddCar from "./pages/AddCar";
import ViewBookings from "./pages/ViewBookings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/add-car",
        element: <AddCar />
      },
      {
        path: "/Bookings",
        element: <ViewBookings />
      }

    ]
  }
]);

export { router }