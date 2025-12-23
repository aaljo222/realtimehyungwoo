import React from "react";
// 1. JSON 데이터 임포트
import Scholarship from "../../json/academicSupport/scholarship.json";
// 2. 공통 텍스트 유틸리티 임포트
import {
  makeCommonTitle,
  makeCommonHeading,
} from "../../util/makeDivUtils/makeCommonText";

const ScholarshipsComponent = () => {
  return (
    <div className="space-y-12 font-sans">
      {/* 1. 페이지 타이틀 */}
      <div>{makeCommonTitle("장학금 안내", "학사지원")}</div>

      {/* 2. 장학금 개요 (Intro) */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
        <h3 className="text-xl font-bold text-blue-800 mb-3">
          {Scholarship.scholarship_intro.title}
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          {Scholarship.scholarship_intro.information}
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 bg-white p-4 rounded border border-blue-100">
          {Scholarship.scholarship_intro.details.map((detail, idx) => (
            <li key={idx} className="pl-2 -indent-2">
              {detail}
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right">
          <button className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-700 transition">
            장학금 공지사항 바로가기
          </button>
        </div>
      </div>

      {/* 3. 장학금 목록 테이블 */}
      <div className="border-t border-gray-300 pt-8">
        <div className="flex justify-between items-end mb-4">
          {makeCommonHeading(
            Scholarship.scholarship_table.title,
            2,
            "text-blue-800 font-bold"
          )}
          <span className="text-xs text-gray-500">
            {Scholarship.scholarship_table.comment[0]}
          </span>
        </div>

        <div className="overflow-x-auto border-t-2 border-blue-800">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                {Scholarship.scholarship_table.headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="py-3 px-4 border-b border-gray-300 font-bold text-center whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {Scholarship.scholarship_table.data.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  {/* 구분 (Rowspan 처리) */}
                  {item.division.rowspan > 0 && (
                    <td
                      rowSpan={item.division.rowspan}
                      className="py-4 px-4 border-r border-gray-200 text-center font-semibold bg-gray-50 align-top pt-6"
                    >
                      {item.division.value}
                    </td>
                  )}
                  {/* 장학금 명칭 */}
                  <td className="py-4 px-4 border-r border-gray-200 font-bold text-blue-900 align-top">
                    {item.name}
                  </td>
                  {/* 장학금액 및 조건 */}
                  <td className="py-4 px-4 border-r border-gray-200 align-top">
                    <ul className="list-disc list-inside space-y-1">
                      {item.amountCondition.map((line, i) => (
                        <li key={i} className="pl-2 -indent-2 leading-relaxed">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </td>
                  {/* 선발기준 */}
                  <td className="py-4 px-4 align-top">
                    <ul className="list-disc list-inside space-y-1">
                      {item.criteria.map((line, i) => (
                        <li key={i} className="pl-2 -indent-2 leading-relaxed">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. 학자금 대출 안내 */}
      <div className="border-t border-gray-300 pt-8">
        {makeCommonHeading(
          Scholarship.loan_table.title,
          2,
          "text-blue-800 font-bold mb-4"
        )}
        <div className="overflow-x-auto border-t-2 border-gray-400">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300 font-bold w-1/4">
                  대출명
                </th>
                <th className="py-3 px-4 border-b border-gray-300 font-bold w-1/4">
                  대출범위
                </th>
                <th className="py-3 px-4 border-b border-gray-300 font-bold w-1/2">
                  자격요건
                </th>
              </tr>
            </thead>
            <tbody>
              {Scholarship.loan_table.data.map((loan, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="py-4 px-4 font-bold text-gray-900 border-r border-gray-200 bg-gray-50">
                    {loan.loanName}
                  </td>
                  <td className="py-4 px-4 border-r border-gray-200">
                    {loan.range.map((r, i) => (
                      <div key={i}>{r}</div>
                    ))}
                  </td>
                  <td className="py-4 px-4">
                    <ul className="list-disc list-inside space-y-1">
                      {loan.criteria.map((c, i) => (
                        <li key={i} className="pl-2 -indent-2 leading-relaxed">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-2 text-right">
          ※ {Scholarship.loan_table.comment[0]}
        </p>
      </div>

      {/* 5. 하단 안내 (Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-300 pt-8 pb-10">
        {/* 국가장학금 신청 안내 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          {makeCommonHeading(
            Scholarship.national_scholarship_apply.title,
            3,
            "text-blue-800 font-bold mb-4"
          )}
          <ul className="space-y-3 text-sm text-gray-700">
            {Scholarship.national_scholarship_apply.information.map(
              (info, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-blue-500 mr-2 flex-shrink-0">✔</span>
                  <span className="leading-relaxed">{info}</span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* 이중지원 방지 제도 */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          {makeCommonHeading(
            Scholarship.double_support.title,
            3,
            "text-red-700 font-bold mb-4"
          )}
          <ul className="space-y-2 text-sm text-gray-700">
            {Scholarship.double_support.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-red-400 mr-2 flex-shrink-0">⚠</span>
                <span className="leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipsComponent;
