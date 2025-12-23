import React from "react";

const AdminDetailViewComponent = ({
  tableInfo,
  readOne,
  findReadOne,
  selectedColumn, // 키 배열
  columns, // 컬럼 객체
  createButton,
  typeEnum,
  changeViewMode,
  primaryKey, // ✅ 추가
  setForm,
}) => {
  // ✅ 데이터 검증
  const hasData = findReadOne && Object.keys(findReadOne).length > 0;
  const hasColumns = selectedColumn && selectedColumn.length > 0;

  return (
    <div>
      {/* 테이블 제목 */}
      <h3 className="text-3xl font-bold mb-4 p-4 bg-blue-100 rounded-md shadow-md">
        {tableInfo?.tableName}:{tableInfo?.tableEng}
      </h3>

      {hasData && hasColumns ? (
        <div>
          {/* 컬럼 헤더 */}
          <div className="flex font-semibold border-b-2 pb-2 mb-2 bg-gray-50">
            {selectedColumn.map((key) => (
              <div key={key} className="flex-1 px-2">
                <div className="font-bold text-gray-700">
                  {columns?.[key] || key}
                </div>
                <div className="text-xs text-gray-400">({key})</div>
              </div>
            ))}
            <div className="w-48 text-center">작업</div>
          </div>

          {/* 내용 및 액션 버튼 */}
          <div className="flex border-b py-3 items-center hover:bg-gray-50">
            {/* 데이터 표시 */}
            {selectedColumn.map((key) => {
              const value = findReadOne[key];
              return (
                <div key={key} className="flex-1 px-2">
                  {typeof value === "object" ? (
                    <pre className="text-xs overflow-x-auto">
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  ) : value !== null && value !== undefined ? (
                    String(value)
                  ) : (
                    "-"
                  )}
                </div>
              );
            })}

            {/* 수정/삭제 버튼 그룹 */}
            <div className="flex gap-2 w-48 justify-center">
              {/* 수정 버튼 */}
              {createButton({
                label: "✏️ 수정",
                style:
                  "bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded font-semibold shadow-sm hover:shadow-md transition",
                onClick: () => {
                  console.log("수정 모드 진입:", findReadOne);
                  changeViewMode(typeEnum?.update);
                  setForm(findReadOne);
                },
              })}
              {/* 삭제 버튼 */}
              {createButton({
                label: "🗑️ 삭제",
                style:
                  "bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded font-semibold shadow-sm hover:shadow-md transition",
                onClick: () => {
                  if (
                    window.confirm(
                      `정말로 이 데이터를 삭제하시겠습니까?\n\nID: ${findReadOne[primaryKey]}`
                    )
                  ) {
                    console.log("삭제 모드 진입:", findReadOne);
                    changeViewMode(typeEnum?.delete);
                  }
                },
              })}
            </div>
          </div>

          {/* 추가 정보 표시 (선택사항) */}
          <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
            <span className="font-semibold">Primary Key:</span> {primaryKey} ={" "}
            {findReadOne[primaryKey]}
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-500 text-lg">
            {!hasColumns
              ? "컬럼 정보를 불러오는 중..."
              : "선택된 데이터가 없습니다. 목록에서 항목을 선택해주세요."}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminDetailViewComponent;
