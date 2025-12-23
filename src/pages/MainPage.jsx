import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LogoLayout from "../layouts/LogoLayout";
import AnimatedBorderBox from "../layouts/AnimatedBorderBox";

const MainPage = () => {
  const user = useSelector((s) => s.loginSlice);
  console.log("user정보:", user);

  return (
    <div>
      <div>
        <a href="http://localhost:3000"><LogoLayout /></a>
      </div>
      <div className="h-[20%] flex items-start justify-start pl-10">
        <AnimatedBorderBox />
      </div>
      <div className="h-[600px] flex items-end justify-end">
        <AnimatedBorderBox />
      </div>
      <div className="h-[1200px] flex items-center justify-center pr-10">
        <AnimatedBorderBox />
      </div>
    </div>
  );
};

export default MainPage;
