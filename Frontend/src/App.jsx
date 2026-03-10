import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import StudentForm from "./components/StudentForm";
import { Toaster } from "react-hot-toast";
import EditStudent from "./components/EditStudent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-student",
    element: <StudentForm />,
  },
  {
    path: "/edit-student/:id",
    element: <EditStudent />,
  },
]);

export default function App() {
  return (
    <>
      <Toaster position="top-right" />

      <RouterProvider router={router} />
    </>
  );
}