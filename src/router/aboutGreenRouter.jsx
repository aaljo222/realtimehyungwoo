import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import BasicLayout from "../layouts/Basiclayout";

const Loading = <div>Loading......</div>;
const CampusGuide = lazy(() => import("../pages/aboutGreen/CampusGuidePage"));
const GreenVision = lazy(() => import("../pages/aboutGreen/GreenVisionPage"));
const HistoryOfGreen = lazy(() =>
  import("../pages/aboutGreen/HistoryOfGreenPage")
);
const President = lazy(() => import("../pages/aboutGreen/PresidentPage"));
const UniversityOverview = lazy(() =>
  import("../pages/aboutGreen/UniversityOverviewPage")
);
const UniversitySymbols = lazy(() =>
  import("../pages/aboutGreen/UniversitySymbolsPage")
);

const aboutGreenRouter = () => {
  return [
    {
      path: "",
      element: <Navigate replace to="campusguide" />,
    },
    {
      path: "campusguide",
      element: (
        <Suspense fallback={Loading}>
          <BasicLayout children={<CampusGuide />} />
        </Suspense>
      ),
    },
    {
      path: "greenvision",
      element: (
        <Suspense fallback={Loading}>
          <BasicLayout children={<GreenVision />} />
        </Suspense>
      ),
    },
    {
      path: "historyofgreen",
      element: (
        <Suspense fallback={Loading}>
          <BasicLayout children={<HistoryOfGreen />} />
        </Suspense>
      ),
    },
    {
      path: "president",
      element: (
        <Suspense fallback={Loading}>
          <BasicLayout children={<President />} />
        </Suspense>
      ),
    },

    {
      path: "universityoverview",
      element: (
        <Suspense fallback={Loading}>
          <BasicLayout children={<UniversityOverview />} />
        </Suspense>
      ),
    },
    {
      path: "universitysymbols",
      element: (
        <Suspense fallback={Loading}>
          <BasicLayout children={<UniversitySymbols />} />
        </Suspense>
      ),
    },
  ];
};

export default aboutGreenRouter;
