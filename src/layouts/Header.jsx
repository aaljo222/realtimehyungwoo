import React, { useState } from "react";
import { useNavigationTest } from "../hook/useNavigationTest";
import { useSelector } from "react-redux";
import SignedLoginComponent from "../components/auth/SignedLoginComponent";
import UnSignedLoginComponent from "../components/auth/UnSignedLoginComponent";
import logo from "../images/1.png";
import Navbar from "./Navbar";
import FileAttachmentApi from "../api/FileAttachmentApi";

const Header = () => {
  const { Home } = useNavigationTest();
  const user = useSelector((s) => s.loginSlice);
  const loginState = useSelector((state) => state.loginSlice);

  // 🔹 Navbar 열림/닫힘 상태
  const [navOpen, setNavOpen] = useState(false);

  const handleLogoClick = () => {
    setNavOpen((prev) => !prev);
  };


  return (
    // 헤더 전체를 sticky로
    <div className="sticky top-0 z-[100] w-full">
      {/* 🔹 1줄차 상단 바: 로고 + 로그인 */}
      <div className="w-full bg-sky-300 text-white shadow-sm border-sky-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8">
          {/* 로고 */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center gap-2"
          >
            <img src={logo} alt="로고" className="h-10" />
          </button>

          <div><a href="http://localhost:3001">{user.role}</a></div>

          {/* 로그인 / 회원가입 */}
          <div className="flex items-center gap-4">
            {loginState.email ? (
              <SignedLoginComponent />
            ) : (
              <UnSignedLoginComponent />
            )}
          </div>
        </div>
      </div>
            
      {/* 🔹 2줄차 네비게이션(사이트맵 스타일) */}
      {user.role === "GUEST" ? (
        <div />
      ) : (
        <Navbar open={navOpen} setOpen={setNavOpen} />
      )}
    </div>
  );
};

export default Header;
