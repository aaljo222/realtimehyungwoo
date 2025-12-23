import React from "react";

const AdminFormComponent = ({
  formColumn,
  form,
  formData,
  selectData,
  extrahButtonList,
  setForm,
  setSelectData,
  changeHandler,
  updateSelectForm,
  onSubmit,
  setModalOpen,
  setTargetColumn,
  title,
  showResetButton,
  readOnlyFirstField,
  readOnlyList,
  fileList,
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* 기본 폼 필드 */}
        {formColumn &&
          formColumn.map((key, index) => {
            const isFirstField = index === 0;
            // const shouldBeReadOnly = readOnlyFirstField && isFirstField;
            const shouldBeReadOnly =
              readOnlyList?.includes(key) ||
              (readOnlyFirstField && isFirstField);

            return (
              <div key={key} className="flex flex-col">
                <label className="font-semibold mb-1">
                  {key}: {formData[key]}
                </label>
                {fileList.includes(key) ? (
                  <input
                    type="file"
                    name={key}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [key]: e.target.files[0] || null,
                      }))
                    }
                    readOnly={shouldBeReadOnly}
                    className={`p-2 border rounded ${
                      shouldBeReadOnly ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={form[key] || ""}
                    onChange={changeHandler}
                    readOnly={shouldBeReadOnly}
                    className={`p-2 border rounded ${
                      shouldBeReadOnly ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                )}
              </div>
            );
          })}

        {/* 모달 버튼들 */}
        {extrahButtonList && extrahButtonList.length > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm text-gray-600 font-semibold">
              🔗 관련 데이터 선택
            </p>
            {extrahButtonList.map((btnData, index) => (
              <button
                key={index}
                type="button"
                className={`w-full p-2 rounded ${
                  btnData.style || "bg-gray-500 hover:bg-gray-600"
                } text-white font-semibold`}
                onClick={() => {
                  setModalOpen(true);
                  setTargetColumn(btnData.tableName);
                }}
              >
                {btnData.label}
              </button>
            ))}
          </div>
        )}

        {/* ✅ selectData 표시 섹션 */}
        {selectData && Object.keys(selectData).length > 0 && (
          <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-blue-800">
                📋 모달에서 선택된 데이터
              </h3>
              <button
                type="button"
                onClick={() => setSelectData({})}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                ✕ 선택 취소
              </button>
            </div>

            <div className="space-y-3">
              {Object.entries(selectData).map(([key, value]) => {
                // ✅ extrahButtonList에서 해당 테이블의 컬럼 정보 찾기
                const relatedButton = extrahButtonList?.find(
                  (btn) =>
                    btn.tableName &&
                    Object.keys(selectData).some(
                      (k) => btn.allColumns?.responseColumns?.[k]
                    )
                );

                const label = key;

                return (
                  <div
                    key={key}
                    className="bg-white p-3 rounded border border-blue-200"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {label}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={selectData[key] || ""}
                      onChange={(e) => {
                        updateSelectForm(e);
                        console.log(e.target.value);
                      }}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="text-xs text-gray-400 mt-1">
                      필드명: {key}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold"
        >
          ✓ 제출
        </button>

        {/* 리셋 버튼 */}
        {showResetButton && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("입력한 내용을 모두 초기화하시겠습니까?")) {
                setForm({});
                setSelectData({});
              }
            }}
            className="w-full mt-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded font-semibold"
          >
            ↺ 초기화
          </button>
        )}
      </form>
    </div>
  );
};

export default AdminFormComponent;
