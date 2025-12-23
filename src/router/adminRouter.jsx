import React, { lazy, Suspense } from 'react'
import BasicLayout from '../layouts/Basiclayout';

const Loading = <div>Loading......</div>;
const AdminOne = lazy(() => import("../pages/admin/AdminOnePage"));

const adminRouter = () => {
  return [
    // {
    //     path:"",
    //     element:<Navigate replace to="campusguide" />   
    // }, 
    {
        path:"one",
        element:<Suspense fallback={Loading}><BasicLayout children={<AdminOne />}/></Suspense>
    },
  ]
}

export default adminRouter;