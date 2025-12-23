import Header from "./Header";
import Footer from "./Footer";
import LogoLayout from "./LogoLayout";
import Navbar from "./Navbar";
import Logo from "../images/university.jpg";

const BasicLayout = ({ children }) => {
  const datas = {
    aboutGreen: {
      campusguide: "aboutgreen/campusguide",
      greenvision: "aboutgreen/greenvision",
      historyofgreen: "aboutgreen/historyofgreen",
      president: "aboutgreen/president",
      universityoverview: "aboutgreen/universityoverview",
      universitysymbols: "aboutgreen/universitysymbols",
    },
    academicsupport: {
      academicinformation: "academicsupport/academicinformation",
      certificatesissuance: "academicsupport/certificatesissuance",
      formsapplications: "academicsupport/formsapplications",
      scholarships: "academicsupport/scholarships",
      tuition: "academicsupport/tuition",
      undergraduatecurriculum: "academicsupport/undergraduatecurriculum",
    },
    admissioneducation: {
      admissionguide: "admissioneducation/admissionguide",
      colleges: "admissioneducation/colleges",
      graduateschool: "admissioneducation/graduateschool",
      nondegreeprograms: "admissioneducation/nondegreeprograms",
    },
    campuslife: {
      administrativeofficesinstitutes:
        "campuslife/administrativeofficesinstitutes",
      events: "campuslife/events",
      lostfoundboard: "campuslife/lostfoundboard",
      notices: "campuslife/notices",
      serviceguide: "campuslife/serviceguide",
      studentactivities: "campuslife/studentactivities",
    },
    extraservices: {
      chatbot: "extraservices/chatbot",
      donate: "extraservices/donate",
    },
    information: {
      careers: "information/careers",
      faq: "information/faq",
      legalnotice: "information/legalnotice",
      privacypolicy: "information/privacypolicy",
      sitemap: "information/sitemap",
    },
    account: {
      login: "account/login",
      logout: "account/logout",
    },
  };
  return (
    <div className="w-full overflowx--hidden h-screen flex flex-col">
      <div className="h-20 shrink-0 bg-sky-300">
        <Header />
      </div>
      <div className="w-full h-screen">{children}</div>
      <div></div>
    </div>
  );
};

export default BasicLayout;
