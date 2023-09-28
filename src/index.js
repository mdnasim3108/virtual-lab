import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ContextProvider from "./contextStore/contextProvider";
import Auth from "./components/authentication/auth";
import Dashboard from "./components/pageContents/Dashboard";
import Classmates from "./components/pageContents/Classmates";
import Courses from "./components/pageContents/Courses";
import Experiments from "./components/pageContents/Experiments";
import Profile from "./components/pageContents/Profile";
import Submissions from "./components/pageContents/Submissions";
import Teachers from "./components/pageContents/Teachers";
import Grades from "./components/pageContents/grades";
import Header from "./components/dashboard/header";
import { Space } from "antd";
import SideMenu from "./components/dashboard/menu";
import HomeLayout from "./components/layout/homeLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: (
      <HomeLayout>
        <Dashboard />
      </HomeLayout>
    ),
  },
  {
    path: "/classmates",
    element: (
      <HomeLayout>
        <Classmates />
      </HomeLayout>
    ),
  },
  {
    path: "/courses",
    element: (
      <HomeLayout>
        <Courses />
      </HomeLayout>
    ),
  },
  {
    path: "/experiments",
    element: (
      <HomeLayout>
        <Experiments />
      </HomeLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <HomeLayout>
        <Profile />
      </HomeLayout>
    ),
  },
  {
    path: "/submissions",
    element: (
      <HomeLayout>
        <Submissions />
      </HomeLayout>
    ),
  },
  {
    path: "/teachers",
    element: (
      <HomeLayout>
        <Teachers />
      </HomeLayout>
    ),
  },
  {
    path: "/grades",
    element: (
      <HomeLayout>
        <Grades />
      </HomeLayout>
    ),
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
