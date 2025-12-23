import React, { useState } from "react";
// 1. JSON 데이터 임포트
import SuppportColleges from "../../json/admissionEducation/support_colleges.json";
// 2. 유틸리티 임포트
import { makeCommonTitle } from "../../util/makeDivUtils/makeCommonText";

const CollegesComponent = () => {
  const colleges = SuppportColleges.colleges;

  // 전체 펼치기/접기 및 개별 토글 상태 관리
  // 초기값: 모든 대학의 학과 목록은 닫혀있음 (false)
  const [expandedItems, setExpandedItems] = useState({});

  // 개별 토글 함수
  const toggleItem = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // 전체 펼치기
  const expandAll = () => {
    const allOpen = {};
    colleges.forEach((_, index) => {
      allOpen[index] = true;
    });
    setExpandedItems(allOpen);
  };

  // 전체 접기
  const collapseAll = () => {
    setExpandedItems({});
  };

  return (
    <div className="font-sans text-[#444]">
      {/* 1. 페이지 타이틀 (makeCommonText 활용) */}
      <div className="mb-10">{makeCommonTitle("대학", "대학·대학원")}</div>

      {/* 2. 컨트롤 박스 (전체 펼치기/접기) */}
      <div className="flex justify-end items-center mb-4 gap-3 text-sm">
        <button
          onClick={expandAll}
          className="flex items-center gap-1 text-[#444] hover:text-[#002c62] font-medium transition-colors"
        >
          <span className="w-3 h-3 border border-[#444] flex items-center justify-center text-[10px] leading-none">
            +
          </span>
          전체 펼치기
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={collapseAll}
          className="flex items-center gap-1 text-[#444] hover:text-[#002c62] font-medium transition-colors"
        >
          <span className="w-3 h-3 border border-[#444] flex items-center justify-center text-[10px] leading-none">
            -
          </span>
          전체 접기
        </button>
      </div>

      {/* 3. 대학 목록 리스트 */}
      <div className="space-y-10">
        {colleges.map((college, idx) => {
          const isExpanded = expandedItems[idx];
          const hasDepts =
            college.departments && college.departments.length > 0;

          return (
            <div
              key={idx}
              className="border border-[#d9d9d9] flex flex-col lg:flex-row bg-white"
            >
              {/* Left: 대학 이미지 */}
              <div className="lg:w-[320px] h-[220px] lg:h-auto shrink-0 relative overflow-hidden bg-gray-100 border-b lg:border-b-0 lg:border-r border-[#d9d9d9]">
                <img
                  src={college.image}
                  alt={`${college.name} 이미지`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Right: 대학 정보 및 학과 리스트 */}
              <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                {/* Header: 대학 이름 및 링크 */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#e5e5e5] pb-4 mb-5">
                  <h2 className="text-2xl font-bold text-[#222]">
                    {college.name}
                  </h2>
                  <div className="flex gap-3 mt-2 sm:mt-0 text-sm">
                    <a
                      href="#none"
                      className="text-[#666] hover:text-[#002c62] flex items-center gap-1 transition-colors"
                    >
                      교수진
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                    <a
                      href="#none"
                      className="text-[#666] hover:text-[#002c62] flex items-center gap-1 transition-colors"
                    >
                      홈페이지
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Body: 설명 */}
                <p className="text-[15px] leading-relaxed text-[#555] mb-6 font-light">
                  {college.description}
                </p>

                {/* Footer: 위치/전화번호 + 토글 버튼 */}
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="flex flex-col sm:flex-row gap-y-2 gap-x-8 text-[14px]">
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-[#222] shrink-0">
                        교내위치
                      </span>
                      <span className="text-[#666] flex items-center gap-1">
                        {college.location}
                        <button className="text-[11px] text-[#002c62] border border-[#d1d1d1] bg-[#f9f9f9] px-1.5 py-0.5 rounded-sm hover:bg-white transition-colors">
                          위치보기
                        </button>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#222] shrink-0">
                        전화번호
                      </span>
                      <span className="text-[#666] font-roboto">
                        {college.phone}
                      </span>
                    </div>
                  </div>

                  {/* 학과 목록 토글 버튼 */}
                  {hasDepts && (
                    <button
                      onClick={() => toggleItem(idx)}
                      className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold border transition-all duration-200 ${
                        isExpanded
                          ? "bg-[#444] text-white border-[#444]"
                          : "bg-white text-[#444] border-[#ccc] hover:border-[#888]"
                      }`}
                    >
                      {isExpanded ? "닫기" : "열기"}
                      <span
                        className={`transform transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                  )}
                </div>

                {/* Departments List (Collapsible Area) */}
                {hasDepts && isExpanded && (
                  <div className="mt-6 border-t-2 border-[#555] bg-[#f8f9fa]">
                    <ul className="divide-y divide-[#e5e5e5]">
                      {college.departments.map((dept, dIdx) => (
                        <li
                          key={dIdx}
                          className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                        >
                          {/* 학과 정보 (좌측) */}
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-[#222] mb-2 flex items-center gap-2">
                              {dept.name}
                            </h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-[#666]">
                              <span className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-[#ccc] rounded-full"></span>
                                {dept.officeLocation || "위치 정보 없음"}
                              </span>
                              {dept.phone && (
                                <span className="flex items-center gap-1 font-roboto">
                                  <span className="w-1 h-1 bg-[#ccc] rounded-full"></span>
                                  {dept.phone}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* 학과 링크 (우측) */}
                          <div className="flex gap-2 shrink-0">
                            <a
                              href="#none"
                              className="px-3 py-1.5 text-xs border border-[#d1d1d1] bg-white text-[#555] hover:text-[#002c62] hover:border-[#002c62] transition-colors rounded-sm"
                            >
                              교수소개
                            </a>
                            {dept.homepage && (
                              <a
                                href={dept.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 text-xs border border-[#d1d1d1] bg-[#002c62] text-white hover:bg-[#003975] transition-colors rounded-sm"
                              >
                                홈페이지
                              </a>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollegesComponent;
