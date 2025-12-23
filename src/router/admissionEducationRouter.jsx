import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom';
import BasicLayout from '../layouts/Basiclayout';

const Loading = <div>Loading......</div>;
const AdmissionGuide = lazy(() => import("../pages/admissionEducation/AdmissionGuidePage"));
const Colleges = lazy(() => import("../pages/admissionEducation/CollegesPage"));
const GraduateSchool = lazy(() => import("../pages/admissionEducation/GraduateSchoolPage"));
const NonDegreePrograms = lazy(() => import("../pages/admissionEducation/NonDegreeProgramsPage"));

const admissionEducationRouter = () => {
  return [
    {
        path:"",
        element:<Navigate replace to="admissionguide" />   
    }, 
    {
        path:"admissionguide",
        element:<Suspense fallback={Loading}><BasicLayout children={<AdmissionGuide />}/></Suspense>
    },
    {
        path:"colleges",
        element:<Suspense fallback={Loading}><BasicLayout children={<Colleges />}/></Suspense>
    },
    {
        path:"graduateschool",
        element:<Suspense fallback={Loading}><BasicLayout children={<GraduateSchool />}/></Suspense>
    },
    {
        path:"nondegreeprograms",
        element:<Suspense fallback={Loading}><BasicLayout children={<NonDegreePrograms />}/></Suspense>
    },
  ]
}

export default admissionEducationRouter
