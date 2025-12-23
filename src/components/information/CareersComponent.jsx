import React, { useState } from "react";
import Careers from "../../json/information/careers.json";
import { makeCommonTitle } from "../../util/makeDivUtils/makeCommonText";

const CareersComponent = () => {
  const [activeTab, setActiveTab] = useState("전체보기");
  const [searchType, setSearchType] = useState("sj");
  const [searchText, setSearchText] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSearchText("");
  };

  const filteredData = Careers.datas.filter((item) => {
    const isTabMatch = activeTab === "전체보기" || item.category === activeTab;

    let isSearchMatch = true;
    if (searchText) {
      if (searchType === "sj") {
        isSearchMatch = item.title.includes(searchText);
      } else {
        isSearchMatch =
          item.title.includes(searchText) || item.category.includes(searchText);
      }
    }
    return isTabMatch && isSearchMatch;
  });

  return (
    <div className="font-sans text-[#444]">
      <div className="mb-8">{makeCommonTitle("채용안내", "학교소식")}</div>
      <div className="mb-6">
        <ul className="flex flex-wrap border-b border-[#002c62]">
          {Careers.tabs.map((tab, idx) => {
            const isActive = activeTab === tab;
            return (
              <li key={idx}>
                <button
                  onClick={() => handleTabClick(tab)}
                  className={`px-5 py-3 text-[15px] font-medium transition-colors border-t border-l border-r rounded-t-sm mb-[-1px] ${
                    isActive
                      ? "bg-[#002c62] text-white border-[#002c62]"
                      : "bg-[#f5f5f5] text-[#666] border-[#ddd] hover:text-[#333]"
                  }`}
                >
                  {tab}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="bg-[#f8f9fa] border border-[#e5e5e5] p-4 flex flex-col md:flex-row justify-between items-center gap-4 mb-6 rounded-sm">
        <div className="text-sm text-[#666]">
          Total{" "}
          <strong className="text-[#002c62]">{filteredData.length}</strong> 건
        </div>

        <div className="flex gap-1 w-full md:w-auto">
          <select
            className="border border-[#ccc] h-9 px-2 text-sm text-[#444] focus:outline-none focus:border-[#002c62]"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="sj">제목</option>
            <option value="cn">내용</option>
          </select>
          <input
            type="text"
            className="border border-[#ccc] h-9 px-3 text-sm text-[#444] flex-1 md:w-64 focus:outline-none focus:border-[#002c62]"
            placeholder="검색어를 입력해 주세요."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="bg-[#444] text-white h-9 px-4 text-sm font-medium hover:bg-[#222] transition-colors shrink-0">
            검색
          </button>
        </div>
      </div>

      <div className="border-t border-[#002c62]">
        <div className="hidden md:flex bg-[#f5f5f5] border-b border-[#ddd] text-center text-[14px] font-bold text-[#333]">
          <div className="w-16 py-3">번호</div>
          <div className="flex-1 py-3">제목</div>
          <div className="w-28 py-3">구분</div>
          <div className="w-48 py-3">접수기간</div>
          <div className="w-16 py-3">첨부</div>
          <div className="w-20 py-3">조회</div>
          <div className="w-20 py-3">상태</div>
        </div>

        {filteredData.length > 0 ? (
          <ul className="divide-y divide-[#e5e5e5]">
            {filteredData.map((item) => (
              <li
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center hover:bg-[#f9f9f9] transition-colors py-4 md:py-0"
              >
                <div className="md:w-16 text-center text-[#666] text-sm md:py-4 hidden md:block">
                  {item.id}
                </div>

                <div className="flex-1 px-4 md:py-4 w-full">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="md:hidden flex items-center gap-2 mb-1">
                      <span
                        className={`text-[11px] px-1.5 py-0.5 rounded text-white ${
                          item.status === "진행" ? "bg-[#002c62]" : "bg-[#888]"
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="text-[#002c62] text-xs font-bold">
                        {item.category}
                      </span>
                    </div>

                    <span className="text-[15px] font-medium text-[#333] hover:text-[#002c62] hover:underline leading-snug">
                      {item.title}
                    </span>

                    <div className="md:hidden text-xs text-[#888] mt-2 flex gap-3">
                      <span>{item.period}</span>
                      <span>조회 {item.views}</span>
                    </div>
                  </a>
                </div>

                <div className="md:w-28 text-center text-[#666] text-sm md:py-4 hidden md:block border-l border-transparent">
                  {item.category}
                </div>

                <div className="md:w-48 text-center text-[#666] text-sm md:py-4 hidden md:block font-roboto">
                  {item.period}
                </div>

                <div className="md:w-16 text-center md:py-4 hidden md:flex justify-center items-center">
                  {item.attachment && (
                    <img
                      src={item.attachment}
                      alt="첨부파일"
                      className="w-4 h-4 opacity-60"
                    />
                  )}
                </div>

                <div className="md:w-20 text-center text-[#666] text-sm md:py-4 hidden md:block font-roboto">
                  {item.views}
                </div>

                <div className="md:w-20 text-center md:py-4 hidden md:flex justify-center items-center">
                  <span
                    className={`text-[12px] px-2 py-0.5 rounded-sm font-medium ${
                      item.status === "진행"
                        ? "text-[#002c62] border border-[#002c62] bg-white"
                        : "text-[#888] border border-[#ccc] bg-[#f5f5f5]"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-10 text-center text-[#666] border-b border-[#ddd]">
            등록된 채용 공고가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default CareersComponent;
