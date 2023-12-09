import "./App.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProvider from "./features/UserProvider";
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
import UsersProvider from "./pages/Users/UsersProvider";
import CategoriesProvider from "./pages/Categories/CategoriesProvider";
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
      {
        path: "/users",
        element: (
          <UsersProvider>
            <Users />
          </UsersProvider>
        ),
      },
      { path: "/recipes", element: <Recipes /> },
      {
        path: "/categories",
        element: (
          <CategoriesProvider>
            <Categories />
          </CategoriesProvider>
        ),
      },
      // { path: "/change-password", element: <ChangePassword /> },
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
      <Toaster position="top right" />
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App;
