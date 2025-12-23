import React, { useState } from "react";
// 1. JSON 데이터 임포트
import UndergraduateCurriculum from "../../json/academicSupport/undergraduateCurriculum.json";
// 2. 공통 텍스트 유틸리티 임포트
import {
  makeCommonTitle,
  makeCommonHeading,
  makeCommonComment,
} from "../../util/makeDivUtils/makeCommonText";

const UndergraduateCurriculumComponent = () => {
  // useState로 데이터 관리
  const [graduationRequirements] = useState(
    UndergraduateCurriculum.graduationRequirements
  );
  const [courseClassification] = useState(
    UndergraduateCurriculum.courseClassification
  );
  const [overview] = useState(UndergraduateCurriculum.overview);

  return (
    <div className="space-y-12 font-sans">
      {/* 1. 페이지 타이틀 */}
      <div>{makeCommonTitle("학과이수과정", "학사지원")}</div>

      {/* 2. 개요 섹션 */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
        {makeCommonHeading(overview.title, 2, "text-blue-800 font-bold mb-4")}
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 leading-relaxed">
          {overview.description.map((desc, idx) => (
            <li key={idx} className="pl-2 -indent-2">
              {desc}
            </li>
          ))}
        </ul>
      </div>

      {/* 3. 교과목 구분 테이블 (복잡한 Colspan 처리) */}
      <div className="border-t border-gray-300 pt-8">
        {makeCommonHeading(
          courseClassification.title,
          2,
          "text-blue-800 font-bold mb-6"
        )}

        <div className="overflow-x-auto border-t-2 border-blue-800">
          <table className="w-full border-collapse text-sm text-center">
            <thead className="bg-gray-100 text-gray-700">
              {/* 메인 헤더 */}
              <tr>
                {courseClassification.table.headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="py-3 px-4 border-b border-gray-300 font-bold whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {courseClassification.table.rows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  {/* 구분 (type) */}
                  <td className="py-4 px-4 border-r border-gray-200 font-semibold bg-gray-50">
                    {row.type}
                  </td>

                  {/* 2010~2018학번 데이터 처리 */}
                  {/* 데이터가 객체이고 colspan이 있으면 colSpan 적용 */}
                  {typeof row.year_2010_2018 === "object" ? (
                    <td
                      colSpan={row.year_2010_2018.colspan}
                      className="py-4 px-4 border-r border-gray-200"
                    >
                      {row.year_2010_2018.value}
                    </td>
                  ) : (
                    <td className="py-4 px-4 border-r border-gray-200">
                      {row.year_2010_2018}
                    </td>
                  )}

                  {/* 2019학번 이후 데이터 처리 */}
                  {/* colspan이 0이면 렌더링하지 않음 (앞에서 합쳐짐) */}
                  {typeof row.year_2019_after === "object" ? (
                    row.year_2019_after.colspan > 0 && (
                      <td
                        colSpan={row.year_2019_after.colspan}
                        className="py-4 px-4"
                      >
                        {row.year_2019_after.value}
                      </td>
                    )
                  ) : (
                    <td className="py-4 px-4">{row.year_2019_after}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. 졸업 이수 요건 섹션 */}
      <div className="border-t border-gray-300 pt-8 pb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          {makeCommonHeading(
            graduationRequirements.title,
            2,
            "text-blue-800 font-bold"
          )}

          {/* 대학요람 바로가기 버튼 */}
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 bg-white border border-blue-600 text-blue-600 text-sm font-semibold rounded hover:bg-blue-50 transition shadow-sm"
          >
            {graduationRequirements.label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>

        {/* 설명 (코멘트 스타일 활용) */}
        <div className="mb-6">
          {makeCommonComment(
            graduationRequirements.description,
            "text-sm text-gray-600 mb-1"
          )}
        </div>

        {/* 이수 학점 테이블 */}
        <div className="overflow-x-auto border-t-2 border-gray-400">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                {graduationRequirements.table.headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="py-3 px-6 border-b border-gray-300 font-bold w-1/4 last:w-3/4"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {graduationRequirements.table.rows.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="py-4 px-6 border-r border-gray-200 font-semibold bg-gray-50">
                    {row.year}
                  </td>
                  <td className="py-4 px-6 leading-relaxed">
                    {row.requiredCredits}
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

export default UndergraduateCurriculumComponent;
