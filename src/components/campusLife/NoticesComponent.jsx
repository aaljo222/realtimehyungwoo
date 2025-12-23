import { useState } from "react";
import Notice from "../../json/campusLife/notice.json";
import { makeCommonTitle } from "../../util/makeDivUtils/makeCommonText";
import { makeCommonTable } from "../../util/makeDivUtils/makeCommonTable";
import { makeCommonSearchBar } from "../../util/makeDivUtils/makeCommonForm";

const NoticesComponent = () => {
  const headers = ["번호", "제목", "날짜", "부서", "첨부"];
  const columns = ["id", "title", "date", "team", "attachment"];
  const tabs = ["전체보기", "학사", "장학", "모집", "일반"];

  const [activeTab, setActiveTab] = useState("전체보기");
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("title");

  const filteredNotices = Notice.공지사항.filter((item) => {
    const matchTab = activeTab === "전체보기" || item.category === activeTab;
    const matchKeyword = keyword === "" || item[searchType]?.includes(keyword);
    return matchTab && matchKeyword;
  });

  const colStyles = [
    "w-20 text-center",
    "text-left",
    "w-32 text-center",
    "w-56 text-center",
    "w-20 text-center",
  ];

  const renderMap = {
    attachment: (row) =>
      row.attachment ? (
        <button
          type="button"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200"
          title="첨부파일 있음"
        >
          ⬇️
        </button>
      ) : (
        <span className="text-gray-300">-</span>
      ),
  };

  return (
    <div className="w-full mx-auto space-y-6">
      {makeCommonTitle("공지사항")}

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

      {/* 검색 */}
      {makeCommonSearchBar({
        options: [
          { label: "제목", value: "title" },
          { label: "부서", value: "team" },
        ],
        onSelectChange: (e) => setSearchType(e.target.value),
        onInputChange: (e) => setKeyword(e.target.value),
        onSearch: () => {},
      })}

      {/* 테이블 */}
      <div className="w-full bg-white">
        {makeCommonTable(headers, filteredNotices, columns, {
          colStyles,
          renderMap,
        })}
      </div>
    </div>
  );
};

export default NoticesComponent;
