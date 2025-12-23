import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom';
import BasicLayout from '../layouts/Basiclayout';

const Loading = <div>Loading......</div>;
const Careers = lazy(() => import("../pages/information/CareersPage"));
const FAQ = lazy(() => import("../pages/information/FAQPage"));
const LegalNotice = lazy(() => import("../pages/information/LegalNoticePage"));
const PrivacyPolicy = lazy(() => import("../pages/information/PrivacyPolicyPage"));
const Sitemap = lazy(() => import("../pages/information/SitemapPage"));


const informationRouter = () => {
  return [
    {
        path:"",
        element:<Navigate replace to="campusGuidePage" />   
    }, 
    {
        path:"careers",
        element:<Suspense fallback={Loading}><BasicLayout children={<Careers />}/></Suspense>
    },
        {
        path:"faq",
        element:<Suspense fallback={Loading}><BasicLayout children={<FAQ />}/></Suspense>
    },
        {
        path:"legalnotice",
        element:<Suspense fallback={Loading}><BasicLayout children={<LegalNotice />}/></Suspense>
    },
        {
        path:"privacypolicy",
        element:<Suspense fallback={Loading}><BasicLayout children={<PrivacyPolicy />}/></Suspense>
    },
        {
        path:"sitemap",
        element:<Suspense fallback={Loading}><BasicLayout children={<Sitemap />}/></Suspense>
    },
  ]
}

export default informationRouter;
