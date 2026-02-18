import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import ProtectedRoute from "../features/auth/ProtectedRoute/ProtectedRoute";
import PrivateLayout from "../layouts/PrivateLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Projects from "../pages/Projects/Projects";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <PrivateLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> }, // "/"
      { path: "/projects", element: <Projects /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
