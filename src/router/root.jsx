import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import Basiclayout from "../layouts/Basiclayout";
import aboutGreenRouter from "./aboutGreenRouter";
import academicSupportRouter from "./academicSupportRouter";
import admissionEducationRouter from "./admissionEducationRouter";
import campusLifeRouter from "./campusLifeRouter";
import informationRouter from "./informationRouter";
import accountRouter from "./accountRouter";
import adminRouter from "./adminRouter";
import RealTimeSensor from "../components/RealTimeSensor";

const Loading = <div>Loading......</div>;

const Main = lazy(() => import("../pages/MainPage"));

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={Loading}>
        <Basiclayout>
          <Main />
        </Basiclayout>
      </Suspense>
    ),
  },
  {
    path: "aboutgreen",
    children: aboutGreenRouter(),
  },
  {
    path: "academicsupport",
    children: academicSupportRouter(),
  },
  {
    path: "admissioneducation",
    children: admissionEducationRouter(),
  },
  {
    path: "campuslife",
    children: campusLifeRouter(),
  },
  {
    path: "information",
    children: informationRouter(),
  },
  {
    path: "account",
    children: accountRouter(),
  },
  {
    path: "admin",
    children: adminRouter(),
  },
  {
    path: "v",
    element: <RealTimeSensor />,
  },
]);

export default root;
