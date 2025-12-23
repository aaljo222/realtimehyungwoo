import { useState } from "react";
import LostFoundBoard from "../../json/campusLife/lost_found_board.json";
import { makeCommonTitle } from "../../util/makeDivUtils/makeCommonText";
import { makeCommonTable } from "../../util/makeDivUtils/makeCommonTable";
import { makeCommonSearchBar } from "../../util/makeDivUtils/makeCommonForm";

const LostFoundBoardComponent = () => {
  const headers = ["번호", "제목", "날짜", "댓글", "장소"];
  const columns = ["id", "title", "date", "commentCount", "location"];
  const tabs = ["전체보기", "분실", "습득"];

  const [activeTab, setActiveTab] = useState("전체보기");
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("title");

  const filteredRows = LostFoundBoard.filter((item) => {
    const matchTab = activeTab === "전체보기" || item.category === activeTab;
    const matchKeyword = keyword === "" || item[searchType]?.includes(keyword);
    return matchTab && matchKeyword;
  });

  const colStyles = [
    "w-20 text-center",
    "text-left",
    "w-32 text-center",
    "w-20 text-center",
    "w-40 text-center",
  ];

  return (
    <div className="w-full mx-auto space-y-6 font-sans text-[#444]">
      {makeCommonTitle("분실물 게시판")}

      {/* 탭 */}
      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 검색 (FAQ 스타일 공통) */}
      {makeCommonSearchBar({
        options: [
          { label: "제목", value: "title" },
          { label: "장소", value: "location" },
        ],
        onSelectChange: (e) => setSearchType(e.target.value),
        onInputChange: (e) => setKeyword(e.target.value),
        onSearch: () => {},
      })}

      {/* 테이블 */}
      <div className="w-full bg-white">
        {makeCommonTable(headers, filteredRows, columns, {
          colStyles,
        })}
      </div>
    </div>
  );
};

export default LostFoundBoardComponent;
