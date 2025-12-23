import React from "react";
import Tuition from "../../json/academicSupport/tuition.json";
import { makeCommonTitle } from "../../util/makeDivUtils/makeCommonText";

const TuitionComponent = () => {
  return (
    <div className="space-y-10 font-sans">
      {/* 1. 페이지 타이틀 */}
      <div>{makeCommonTitle("등록일정", "학사지원")}</div>

      <div className="flex justify-center items-center gap-6 py-6 bg-gray-50 border-y border-gray-200 rounded-sm">
        <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition focus:outline-none">
          {/* Left Arrow Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <span className="text-2xl font-extrabold text-gray-800 tracking-tight">
          2025학년도
        </span>
        <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition focus:outline-none">
          {/* Right Arrow Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* 3. 월별 일정 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Tuition.months.map((info, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200 flex flex-col"
          >
            {/* 월 헤더 */}
            <div className="px-6 py-4 border-b border-gray-100 bg-blue-50/50 flex justify-between items-end">
              <span className="text-2xl font-bold text-blue-700">
                {info.month}
              </span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                {info.monthEng}
              </span>
            </div>

            {/* 일정 리스트 */}
            <div className="p-6 flex-1">
              {info.events.length > 0 ? (
                <ul className="space-y-4">
                  {info.events.map((event, eIdx) => (
                    <li key={eIdx} className="flex flex-col gap-1">
                      {/* 날짜 배지 */}
                      {event.date && (
                        <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded w-fit">
                          {event.date}
                        </span>
                      )}
                      {/* 일정 내용 */}
                      <span className="text-sm text-gray-800 font-medium leading-snug">
                        {event.title || "-"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="h-full flex items-center justify-center py-6">
                  <span className="text-sm text-gray-400">
                    일정이 없습니다.
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TuitionComponent;
