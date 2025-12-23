import React, { useState } from "react";
// 1. JSON 데이터 임포트
import SupportAdmission from "../../json/admissionEducation/support_admission.json";
// 2. 공통 텍스트 유틸리티 임포트
import { makeCommonTitle } from "../../util/makeDivUtils/makeCommonText";

const AdmissionGuideComponent = () => {
  const [admission] = useState(SupportAdmission.admission);

  // 카드에 표시할 키 목록
  const cardKeys = ["sinchon", "miral"];

  return (
    <div className="font-sans text-[#333]">
      {/* 1. 페이지 타이틀 */}
      <div className="mb-8">{makeCommonTitle("입학안내", "입학·교육")}</div>

      {/* 2. 입학처 연락처 카드 (상단 2개 박스) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-12">
        {admission &&
          cardKeys.map((key) => {
            const contact = admission.campusContacts[key];
            return (
              <div
                key={key}
                className="bg-[#f8f9fa] border border-[#dcdcdc] rounded-sm p-6 flex flex-col justify-center hover:shadow-md transition-shadow"
              >
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-[#1f2937]">
                    {contact.title}
                  </h3>
                </div>
                <ul className="text-[15px] space-y-1.5 text-[#555]">
                  {/* 주소 */}
                  <li className="flex items-start">
                    {/* 아이콘이나 라벨 대신 텍스트 그대로 표현 */}
                    <span className="break-keep">{contact.address}</span>
                  </li>
                  {/* 이메일 */}
                  <li className="flex items-center">
                    <a
                      href={`mailto:${contact.email}`}
                      className="hover:underline text-[#444]"
                    >
                      {contact.email}
                    </a>
                  </li>
                  {/* 전화번호 & 근무시간 */}
                  <li className="flex flex-wrap items-center gap-2">
                    <span className="text-[#002c62] font-bold text-lg font-roboto">
                      {contact.phone}
                    </span>
                    <span className="text-sm text-[#666]">
                      {contact.workingHours}
                    </span>
                  </li>
                </ul>
              </div>
            );
          })}
      </div>

      {/* 3. 배너 섹션 (파란 배경 + 독수리 이미지 느낌 구현) */}
      {admission && (
        <div className="relative w-full h-[240px] rounded-sm overflow-hidden mb-12 bg-gradient-to-r from-[#003975] to-[#2b70c9]">
          {/* 배경 이미지 (우측 독수리 배치 시뮬레이션 - 실제 이미지가 있다면 교체 필요) */}
          <img
            src="https://www.yonsei.ac.kr/sites/sc/images/sub/iphak-banner.jpg"
            alt="입학 안내 배너"
            className="absolute top-0 right-0 w-full h-full object-cover mix-blend-overlay opacity-40 md:opacity-100 md:w-auto md:h-auto md:mix-blend-normal"
            style={{ objectPosition: "right center" }}
          />

          {/* 텍스트 컨텐츠 */}
          <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug drop-shadow-md">
              {/* 제목 데이터가 길 경우 줄바꿈 처리 */}
              <span
                dangerouslySetInnerHTML={{
                  __html: admission.intro.title.replace(" 갖춘", " 갖춘<br/>"),
                }}
              />
            </h2>
            <p className="text-white/90 text-sm md:text-[15px] leading-relaxed font-light drop-shadow-sm hidden md:block">
              {admission.intro.description}
            </p>
          </div>
        </div>
      )}

      {/* 4. 공지사항 및 전형안내 (2단 레이아웃) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 border-t border-gray-200 pt-10">
        {/* 4-1. 공지사항 (좌측) */}
        <div>
          <h3 className="text-xl font-bold text-[#222] mb-5 border-b-2 border-[#222] pb-3 flex justify-between items-end">
            공지사항
            <button className="text-xs font-normal text-[#666] hover:underline">
              더보기 +
            </button>
          </h3>
          <ul className="space-y-4">
            {admission.notice.items.map((notice, idx) => (
              <li
                key={idx}
                className="group cursor-pointer flex justify-between items-start gap-4"
              >
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2 mb-1">
                    {/* 카테고리 뱃지 */}
                    <span className="text-[13px] font-bold text-[#002c62]">
                      {notice.category}
                    </span>
                  </div>
                  {/* 제목 */}
                  <p className="text-[15px] text-[#333] group-hover:underline truncate w-full">
                    {notice.text}
                  </p>
                </div>
                {/* 날짜 */}
                <span className="text-sm text-[#888] font-roboto whitespace-nowrap mt-1">
                  {notice.date}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4-2. 전형안내 (우측 - Grid List 형태) */}
        <div className="bg-[#f7f7f7] p-6 rounded-sm">
          <h3 className="text-xl font-bold text-[#222] mb-5 border-b border-[#ddd] pb-3">
            전형안내
          </h3>
          <div className="grid grid-cols-2 gap-y-4 gap-x-8">
            {admission.guides.items.map((guide, idx) => (
              <a
                key={idx}
                href={guide.link}
                className="flex justify-between items-center py-2 border-b border-[#e5e5e5] hover:text-[#002c62] transition-colors group"
              >
                <span className="font-bold text-[15px] text-[#444] group-hover:text-[#002c62]">
                  {guide.label}
                </span>
                <span className="text-gray-400 group-hover:text-[#002c62]">
                  &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 5. 하단 바로가기 버튼 (3단 배너) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {admission.bottomButtons.map((btn, idx) => {
          // 아이콘 이미지 매핑 (예시) - 실제로는 json에 icon 경로가 있거나 별도 매핑 필요
          const iconSrc = idx === 0 ? "book" : idx === 1 ? "building" : "chat";

          return (
            <a
              key={idx}
              href={btn.link}
              className="flex items-center p-6 bg-[#363f4d] hover:bg-[#2b323d] transition-colors rounded-sm text-white group"
            >
              {/* 아이콘 영역 (Simulated) */}
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                {/* SVG Icon Placeholder */}
                <svg
                  className="w-6 h-6 text-white"
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
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">
                  {btn.label.split("\n").map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default AdmissionGuideComponent;
