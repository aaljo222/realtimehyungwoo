import React from "react";
import GreenSpirit from "../../json/aboutGreen/green_spirit.json";
import {
  makeCommonHeading,
  makeCommonTitle,
} from "../../util/makeDivUtils/makeCommonText";

const GreenVisionComponent = () => {
  return (
    <div className="space-y-8">
      {/* title */}
      <div>{makeCommonTitle("건학정신, 연세이념")}</div>

      {/* section */}
      <div className="border-t border-gray-300">
        {GreenSpirit &&
          GreenSpirit.sections.map((section, idx) => (
            <div key={idx} className="flex border-b border-gray-300">
              {/* 좌측 타이틀 */}
              <div className="w-48 shrink-0 border-r border-gray-300 px-6 py-6">
                {makeCommonHeading(section.title, {
                  level: 2,
                  className: "text-blue-700 font-semibold",
                })}
              </div>

              {/* 우측 내용 */}
              <div className="flex-1 px-6 py-6 leading-relaxed text-gray-800">
                {section.description}
              </div>
            </div>
          ))}
      </div>

      {/* 이미지 */}
      <div className="pt-6 w-full max-w-md">
        <img
          src="https://www.yonsei.ac.kr/sites/sc/images/sub/truth-icon.png"
          alt="진리 아이콘"
        />
        <img
          src="https://www.yonsei.ac.kr/sites/sc/images/sub/freedom-icon.png"
          alt="자유 아이콘"
        />
      </div>
    </div>
  );
};

export default GreenVisionComponent;
