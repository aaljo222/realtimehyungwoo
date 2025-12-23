import React from "react";
// 1. JSON 데이터 임포트
import SupportNonDegreeProgram from "../../json/admissionEducation/support_nonDegreeProgram.json";
// 2. 유틸리티 임포트
import { makeCommonTitle } from "../../util/makeDivUtils/makeCommonText";

const NonDegreeProgramsComponent = () => {
  const programs = SupportNonDegreeProgram.data;

  return (
    <div className="font-sans text-[#444]">
      {/* 1. 페이지 타이틀 */}
      <div className="mb-8">{makeCommonTitle("비학위과정", "입학·교육")}</div>

      {/* 2. 비학위과정 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {programs.map((program, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#dcdcdc] rounded-sm p-6 relative hover:shadow-md transition-shadow duration-200 group flex flex-col min-h-[160px]"
          >
            {/* Header: 타이틀 & 더보기 버튼 */}
            <div className="flex justify-between items-start mb-4 pb-3 border-b border-[#f0f0f0]">
              <strong className="text-[17px] font-bold text-[#222] group-hover:text-[#002c62] transition-colors pr-2 break-keep leading-tight">
                {program.title}
              </strong>

              {/* 더보기 버튼 (링크는 예시로 '#' 처리, 실제 데이터에 링크가 있다면 연결 가능) */}
              <a
                href="#none"
                className="flex items-center gap-1 text-[11px] text-[#888] hover:text-[#002c62] border border-[#e0e0e0] px-2 py-1 rounded-sm bg-white shrink-0 transition-all hover:border-[#002c62]"
                title="더보기(새창열림)"
                target="_blank"
                rel="noopener noreferrer"
              >
                더보기
                <svg
                  className="w-2.5 h-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>

            {/* Content: 교육 과정 목록 */}
            <div className="flex-1">
              <div className="text-[14px] text-[#666] leading-relaxed">
                {program.courses.map((course, cIdx) => (
                  <div key={cIdx} className="mb-1 last:mb-0">
                    <span className="inline-block relative pl-2 before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-[3px] before:h-[3px] before:bg-[#999] before:rounded-full">
                      {/* HTML 원본의 <i> 태그 느낌을 살리기 위해 이탤릭체 대신 일반 텍스트 사용하되 구분을 명확히 함 */}
                      {course}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NonDegreeProgramsComponent;
