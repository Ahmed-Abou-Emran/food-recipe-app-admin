import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  Register,
  ChangePassword,
  NotFound,
  Home,
  Users,
  Recipes,
  Categories,
} from "./pages";
import { AppLayout, AuthLayout } from "./ui";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/change-password", element: <ChangePassword /> },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/app/home", element: <Home /> },
      { path: "/app/users", element: <Users /> },
      { path: "/app/recipes", element: <Recipes /> },
      { path: "/app/categories", element: <Categories /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
