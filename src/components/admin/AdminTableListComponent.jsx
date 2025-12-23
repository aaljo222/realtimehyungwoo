import React from "react";
import { typeEnum } from "../../api/commonApi";
import { createButton } from "../../util/button";

const AdminTableListComponent = ({
  tableInfo,
  columns,
  selectedColumn,
  readData,
  changeViewMode,
  changeSelectId,
  primaryKey,
}) => {
  // ✅ [추가] 시간표 리스트를 이쁜 문자열로 바꿔주는 함수
  const formatTimeTables = (timeTables) => {
    if (!Array.isArray(timeTables) || timeTables.length === 0)
      return "시간표 없음";

    // 요일 한글 변환 맵
    const dayMap = {
      MONDAY: "월",
      TUESDAY: "화",
      WEDNESDAY: "수",
      THURSDAY: "목",
      FRIDAY: "금",
      SATURDAY: "토",
      SUNDAY: "일",
    };

    return timeTables
      .map((t) => {
        const day = dayMap[t.dayOfWeek] || t.dayOfWeek;
        const time = t.startTime ? t.startTime.substring(0, 5) : ""; // 09:00:00 -> 09:00
        const room = t.classroomName || "강의실 미정";
        return `${day} ${time} (${room})`;
      })
      .join(", "); // 여러 개일 경우 쉼표로 연결
  };

  return (
    <div className="w-full">
      <h3 className="text-3xl font-bold mb-4 p-4 bg-blue-100 rounded-md shadow-md">
        {tableInfo.tableName}:{tableInfo.tableEng}
      </h3>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[1400px] w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              {selectedColumn.map((key) => (
                <th
                  key={key}
                  className="px-3 py-2 text-sm font-semibold text-left whitespace-nowrap overflow-hidden text-ellipsis"
                  title={`${key}: ${columns[key]}`}
                >
                  <span className="font-bold">{key}</span>
                  <span className="text-gray-500 ml-1">({columns[key]})</span>
                </th>
              ))}
              <th className="w-28 px-3 py-2"></th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(readData) &&
              readData.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                  {selectedColumn.map((key) => (
                    <td
                      key={key}
                      className="px-3 py-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                      title={
                        typeof row[key] === "object" && row[key] !== null
                          ? JSON.stringify(row[key])
                          : String(row[key] ?? "")
                      }
                    >
                      {/* ▼▼▼ [수정된 부분] timeTables일 때만 특별 대우 ▼▼▼ */}
                      {key === "timeTables" ? (
                        <span className="text-blue-600 font-medium">
                          {formatTimeTables(row[key])}
                        </span>
                      ) : // 기존 로직 (객체면 JSON 변환, 아니면 그냥 출력)
                      typeof row[key] === "object" && row[key] !== null ? (
                        JSON.stringify(row[key])
                      ) : (
                        row[key]
                      )}
                      {/* ▲▲▲ [수정 끝] ▲▲▲ */}
                    </td>
                  ))}
                  <td className="px-3 py-2">
                    {createButton({
                      label: "한건조회",
                      style: "bg-red-300 hover:bg-red-700",
                      size: "100%",
                      onClick: () => {
                        changeViewMode(typeEnum.readOne);
                        changeSelectId(row[primaryKey]);
                      },
                    })}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTableListComponent;
