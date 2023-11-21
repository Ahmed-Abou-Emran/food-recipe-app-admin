import "./App.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  Register,
  ChangePassword,
  ForgetPassword,
  NotFound,
  Home,
  Users,
  Recipes,
  Categories,
} from "./pages";
import ProtectedRoute from "./ui/ProtectedRoute";
import { AppLayout, AuthLayout } from "./ui";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/users", element: <Users /> },
      { path: "/recipes", element: <Recipes /> },
      { path: "/categories", element: <Categories /> },
    ],
  },
  {
    path: "/",

    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/change-password", element: <ChangePassword /> },
      { path: "/forget-password", element: <ForgetPassword /> },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
