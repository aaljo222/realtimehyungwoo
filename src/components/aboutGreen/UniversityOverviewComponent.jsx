import React from "react";
import GreenStauts from "../../json/aboutGreen/green_status.json";
import {
  makeCampusTableA,
  makeCampusTableB,
} from "../../util/makeDivUtils/makeForced";
import {
  makeCommonComment,
  makeCommonTitle,
} from "../../util/makeDivUtils/makeCommonText";

/** 공통 섹션 헤더 (타이틀 + 우측 comment) */
const SectionHeader = (title, comment) => (
  <div className="flex justify-between items-end border-b pb-2">
    {makeCommonTitle(title)}
    {comment && (
      <div className="text-xs text-gray-500 text-right">
        {makeCommonComment(comment)}
      </div>
    )}
  </div>
);

const UniversityOverviewComponent = () => {
  if (!GreenStauts) return null;

  return (
    <div className="bg-gray-50">
      <div className="max-w-full mx-auto px-4 py-12 flex flex-col gap-20">
        {/* 1. 대학구성 */}
        <section className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {SectionHeader("대학구성", GreenStauts.대학구성.comment)}
          <div className="overflow-x-auto">
            {makeCampusTableA(
              GreenStauts.대학구성.headers,
              GreenStauts.대학구성.data,
              GreenStauts.대학구성.columns
            )}
          </div>
        </section>

        {/* 2. 재학생 수 */}
        <section className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {SectionHeader(
            "재학생 수 (외국인 재학생수)",
            GreenStauts.재학생수.comment
          )}
          <div className="overflow-x-auto">
            {makeCampusTableB(
              GreenStauts.재학생수.data,
              GreenStauts.재학생수.columns,
              GreenStauts.재학생수.resultData,
              3
            )}
          </div>
        </section>

        {/* 3. 국제교류현황 */}
        <section className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {SectionHeader("국제교류현황", GreenStauts.국제교류현황.comment)}
          <div className="overflow-x-auto">
            {makeCampusTableA(
              GreenStauts.국제교류현황.headers,
              GreenStauts.국제교류현황.data,
              GreenStauts.국제교류현황.columns
            )}
          </div>
        </section>

        {/* 4. 교원현황 */}
        <section className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {SectionHeader(
            "교원현황 (외국인 교원수)",
            GreenStauts.교원현황.comment
          )}
          <div className="overflow-x-auto">
            {makeCampusTableB(
              GreenStauts.교원현황.data,
              GreenStauts.교원현황.columns,
              GreenStauts.교원현황.resultData,
              6
            )}
          </div>
        </section>

        {/* 5. 직원현황 */}
        <section className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {SectionHeader("직원현황", GreenStauts.직원현황.comment)}
          <div className="overflow-x-auto">
            {makeCampusTableA(
              GreenStauts.직원현황.headers,
              GreenStauts.직원현황.data,
              GreenStauts.직원현황.columns
            )}
          </div>
        </section>

        {/* 6. 부설연구기관 현황 */}
        <section className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {SectionHeader(
            "부설연구기관 현황",
            GreenStauts.부설연구기관현황.comment
          )}
          <div className="overflow-x-auto">
            {makeCampusTableB(
              GreenStauts.부설연구기관현황.data,
              GreenStauts.부설연구기관현황.columns,
              GreenStauts.부설연구기관현황.resultData,
              3
            )}
          </div>
        </section>

        {/* 7. 장학금현황 */}
        <section className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {SectionHeader("장학금현황", GreenStauts.장학금현황.comment)}
          <div className="overflow-x-auto">
            {makeCampusTableA(
              GreenStauts.장학금현황.headers,
              GreenStauts.장학금현황.data,
              GreenStauts.장학금현황.columns
            )}
          </div>
        </section>

        {/* 8. 개설 강좌수 */}
        <section className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {SectionHeader("개설 강좌수 (2025-1학기, 정규과목)")}
          <div className="overflow-x-auto">
            {makeCampusTableB(
              GreenStauts.개설강좌수.data,
              GreenStauts.개설강좌수.columns,
              [],
              999
            )}
          </div>
        </section>

        {/* 9. 기숙사 현황 */}
        <section className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {SectionHeader("기숙사 현황", GreenStauts.기숙사현황.comment)}
          <div className="overflow-x-auto">
            {makeCampusTableB(
              GreenStauts.기숙사현황.data,
              GreenStauts.기숙사현황.columns,
              [],
              3
            )}
          </div>
        </section>

        {/* 10. 학위수여자수 */}
        <section className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {SectionHeader("학위수여자수", GreenStauts.학위수여자수.comment)}
          <div className="overflow-x-auto">
            {makeCampusTableB(
              GreenStauts.학위수여자수.data,
              GreenStauts.학위수여자수.columns,
              GreenStauts.학위수여자수.resultData,
              5
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UniversityOverviewComponent;
