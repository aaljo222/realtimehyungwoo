import React from 'react';

const AdminModalComponent = ({
  isModalOpen,
  selectId,
  findData,
  findColumns,
  tableInfo,
  extrahButtonList,
  targetColumn,
  setModalOpen,
  setFindData,
  setFindColumns,
  selectCheckbox,
  changeSelectId,
  createButton,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={() => setModalOpen(false)}
      ></div>

      <div className="relative bg-white rounded-xl p-6 shadow-xl z-50 w-[90%] max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mt-4">
          <h2 className="text-xl font-bold text-center flex-1">
            모달창 - {targetColumn}
          </h2>
        </div>

        {/* 상단 액션 버튼들 */}
        <div className="flex gap-2 justify-center my-4">
          <button
            className="w-[10%] p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              selectCheckbox(selectId);
              setModalOpen(false);
            }}
          >
            선택하기
          </button>
          <button
            className="w-[10%] p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              setFindData([]);
              setFindColumns({});
            }}
          >
            리셋
          </button>
          <button
            className="w-[10%] p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setModalOpen(false)}
          >
            닫기
          </button>
        </div>

        {/* 동적 버튼 리스트 */}
        <div className="flex flex-wrap gap-2 mb-4 justify-end">
          {extrahButtonList
            .filter((btnData) => btnData.tableName === targetColumn)
            .map((btnData, index) => (
              <div key={index} className="flex-1">
                {createButton({
                  label: btnData.label,
                  style: btnData.style,
                  onClick: () => {
                    if (btnData.action) {
                      console.log('버튼 데이터:', btnData);
                      btnData.action().then((result) => {
                        console.log('API 결과:', result);

                        // ✅ createColumns 사용
                        const createColumns = btnData.allColumns?.createColumns || {};
                        const columnKeys = Object.keys(createColumns);

                        console.log('사용할 컬럼:', createColumns);

                        // ✅ responseColumns 사용
                        const responseColumns = btnData.allColumns?.responseColumns || {};
                        const responseColumKeys = Object.keys(responseColumns);

                        console.log('사용할 컬럼:', responseColumns);

                        const data = result.map((d) => {
                          const temp = {};
                          columnKeys.forEach((key) => {
                            if (d[key] !== null) {
                              temp[key] = d[key];
                            }
                          });
                          responseColumKeys.forEach((key) => {
                            if (d[key] !== null) {
                              temp[key] = d[key];
                            }
                          });
                          return temp;
                        }).filter((item) => Object.keys(item).length > 0);

                        console.log('가공된 데이터:', data);

                        // ✅ createColumns 객체 설정
                        setFindColumns(createColumns);
                        setFindData(data);
                      });
                    }
                  },
                })}
              </div>
            ))}
        </div>

        {/* 데이터 테이블 */}
        {findData && findData.length > 0 && findColumns && Object.keys(findColumns).length > 0 ? (
          <div>
            {/* 테이블 제목 */}
            <h3 className="text-3xl font-bold mb-4 p-4 bg-blue-100 rounded-md shadow-md">
              {tableInfo?.tableName}:{tableInfo?.tableEng}
            </h3>

            {/* 컬럼 헤더 */}
            <div className="flex font-semibold border-b pb-1 mb-2 bg-gray-50">
              <div className="flex-none px-2 w-16">선택</div>
              {Object.keys(findColumns).map((key) => (
                <div key={key} className="flex-1 px-2">
                  <div className="font-bold">{findColumns[key]}</div>
                  <div className="text-xs text-gray-500">({key})</div>
                </div>
              ))}
            </div>

            {/* 데이터 행 */}
            {findData.map((data, index) => (
              <div key={index} className="flex border-b py-2 items-center hover:bg-gray-50">
                <div className="flex-none px-2 w-16">
                  <input
                    type="radio"
                    name="modalSelection"
                    onChange={() => changeSelectId(index)}
                    checked={selectId === index}
                  />
                </div>
                {Object.keys(findColumns).map((key) => (
                  <div key={key} className="flex-1 px-2">
                    {typeof data[key] === 'object'
                      ? JSON.stringify(data[key])
                      : (data[key] || '-')}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-gray-500">
            버튼을 클릭하여 데이터를 불러오세요
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminModalComponent;