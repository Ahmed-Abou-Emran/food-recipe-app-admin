import "./App.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  Register,
  ForgetPassword,
  NotFound,
  Home,
  Users,
  Recipes,
  Favorites,
  Categories,
} from "./pages";
import UsersProvider from "./pages/Users/UsersProvider";
import CategoriesProvider from "./pages/Categories/CategoriesProvider";
import ProtectedRoute from "./ui/ProtectedRoute";
import { AppLayout, AuthLayout } from "./ui";
import RecipesProvider from "./pages/Recipes/RecipesProvider";
import FavoriteRecipesProvider from "./pages/Favorites/FavoritesProvider";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./react-query/queryClient";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        {/* <UsersProvider> */}
        <RecipesProvider>
          <FavoriteRecipesProvider>
            <CategoriesProvider>
              <AppLayout />
            </CategoriesProvider>
          </FavoriteRecipesProvider>
        </RecipesProvider>
        {/* </UsersProvider> */}
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/home", element: <Home /> },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/categories",
        element: <Categories />,
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
      { path: "/forget-password", element: <ForgetPassword /> },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Toaster position="top right" />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
