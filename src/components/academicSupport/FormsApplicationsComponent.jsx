import React from "react";
// 1. JSON 데이터 임포트
import FormApplications from "../../json/academicSupport/formApplications.json";
// 2. 공통 텍스트 유틸리티 임포트
import {
  makeCommonTitle,
  makeCommonHeading,
} from "../../util/makeDivUtils/makeCommonText";

const FormsApplicationsComponent = () => {
  return (
    <div className="space-y-10 font-sans">
      {/* 1. 페이지 타이틀 */}
      <div>{makeCommonTitle("각종 신청서 양식 모음", "교무/학사")}</div>

      {/* 2. 신청서 양식 리스트 (테이블 형태) */}
      <div className="border-t border-gray-300 pt-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="py-3 px-4 font-semibold text-gray-700 text-center w-16">
                  번호
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 w-1/2">
                  제목
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 text-center w-32 hidden md:table-cell">
                  작성일
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 text-center w-40 hidden sm:table-cell">
                  담당부서
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 text-center w-24">
                  첨부
                </th>
              </tr>
            </thead>
            <tbody>
              {FormApplications.map((form, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-4 text-center text-gray-500">
                    {form.id}
                  </td>
                  <td className="py-4 px-4 text-gray-900 font-medium">
                    {form.title}
                    {/* 카테고리 태그 추가 (예: 서식) */}
                    <span className="ml-2 inline-block px-2 py-0.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded border border-blue-100">
                      {form.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-500 text-sm hidden md:table-cell">
                    {form.date}
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600 text-sm hidden sm:table-cell">
                    {form.location}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {form.attachment ? (
                      <a
                        href="#"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
                        title="다운로드"
                      >
                        {/* 다운로드 아이콘 (SVG) */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 9.75l-4.5 4.5m0 0l-4.5-4.5m4.5 4.5V3"
                          />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormsApplicationsComponent;
