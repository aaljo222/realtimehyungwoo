import React from "react";
import Logo2 from "../images/2.svg";
import "../style/tailwind.css";
import { TextRingComponent } from "../util/CommonComponents";

const LogoLayout = () => {
  return (
    <div className="w-full overflow-hidden h-screen grid place-items-center bg-white">
      <div className="relative w-[50%] aspect-square">
        <a href="http://localhost:3000">
        {/* 가운데 로고: 기존처럼 rotate */}
        <img
          src={Logo2}
          alt="그린로고"
          className="w-full h-full rounded-full object-cover block z-10 reveal-ccw"
        />
        </a>

        {/* 로고 주변 반대 방향으로 도는 텍스트 링 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <TextRingComponent />
        </div>
      </div>
      <img src="http://localhost:8080/uploads/b48bef17-bf62-49a7-9c2f-bb12fe307097.jpg"></img>
    </div>
  );
};

export default LogoLayout;
