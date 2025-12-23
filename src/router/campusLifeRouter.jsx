import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom';
import BasicLayout from '../layouts/Basiclayout';

const Loading = <div>Loading......</div>;
const AdministrativeOfficesInstitutes = lazy(() => import("../pages/campusLife/AdministrativeOfficesInstitutesPage"));
const Events = lazy(() => import("../pages/campusLife/EventsPage"));
const LostFoundBoard = lazy(() => import("../pages/campusLife/LostFoundBoardPage"));
const Notices = lazy(() => import("../pages/campusLife/NoticesPage"));
const ServiceGuide = lazy(() => import("../pages/campusLife/ServiceGuidePage"));
const StudentActivities = lazy(() => import("../pages/campusLife/StudentActivitiesPage"));

const campusLifeRouter = () => {
  return [
    {
        path:"",
        element:<Navigate replace to="administrativeofficesinstitutes" />   
    }, 
    {
        path:"administrativeofficesinstitutes",
        element:<Suspense fallback={Loading}><BasicLayout children={<AdministrativeOfficesInstitutes />}/></Suspense>
    },
        {
        path:"events",
        element:<Suspense fallback={Loading}><BasicLayout children={<Events />}/></Suspense>
    },
        {
        path:"lostfoundboard",
        element:<Suspense fallback={Loading}><BasicLayout children={<LostFoundBoard />}/></Suspense>
    },
        {
        path:"notices",
        element:<Suspense fallback={Loading}><BasicLayout children={<Notices />}/></Suspense>
    },
        {
        path:"serviceguide",
        element:<Suspense fallback={Loading}><BasicLayout children={<ServiceGuide />}/></Suspense>
    },
        {
        path:"studentactivities",
        element:<Suspense fallback={Loading}><BasicLayout children={<StudentActivities />}/></Suspense>
    },
  ]
}

export default campusLifeRouter
