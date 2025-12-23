import React from "react";
// 1. JSON 데이터 임포트
import Sitemap from "../../json/information/sitemap.json";
// 2. 유틸리티 임포트
import { makeCommonTitle } from "../../util/makeDivUtils/makeCommonText";

/**
 * 사이트맵의 개별 섹션을 생성하는 함수 (요청하신 makeSitemap 로직 반영)
 * @param {Array} items - 하위 메뉴 리스트
 * @param {String} title - 섹션 제목
 */
const makeSitemap = (items = [], title = "title") => {
  return (
    <div className="flex flex-col h-full">
      {/* 제목 영역 (HTML의 stMp_Title 스타일 반영) */}
      <h2 className="text-[22px] font-bold text-[#222] border-b-2 border-[#002c62] pb-3 mb-4">
        <a
          href="#none"
          className="hover:text-[#002c62] transition-colors block"
        >
          {title}
        </a>
      </h2>

      {/* 아이템 리스트 영역 (HTML의 dep2-list 스타일 반영) */}
      <div className="flex-1">
        {/* 아이템이 많을 경우 2열로 보기 좋게 배치 (grid-cols-2) */}
        <ul className="grid grid-cols-2 gap-x-2 gap-y-2">
          {items.map((item, idx) => (
            <li key={idx}>
              <a
                href="#none"
                className="text-[15px] text-[#666] hover:text-[#002c62] hover:underline block py-1 transition-colors break-keep"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SitemapComponent = () => {
  // 화면에 표시할 카테고리 순서 정의
  const columns = [
    "aboutGreen",
    "admissionEducation",
    "campusLife",
    "academicSupport",
    "information",
    "extraServices",
  ];

  return (
    <div className="font-sans text-[#444]">
      {/* 1. 페이지 타이틀 */}
      <div className="mb-10">{makeCommonTitle("사이트맵", "기타안내")}</div>

      {/* 2. 사이트맵 그리드 레이아웃 */}
      {/* PC: 3열, 태블릿: 2열, 모바일: 1열 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {Sitemap &&
          columns.map((key, idx) => {
            const section = Sitemap[key];

            // 데이터가 없으면 렌더링 하지 않음
            if (!section) return null;

            // makeSitemap 함수를 사용하여 각 섹션 렌더링
            return (
              <div key={idx}>{makeSitemap(section.items, section.title)}</div>
            );
          })}
      </div>
    </div>
  );
};

export default SitemapComponent;
