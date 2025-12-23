import React from 'react';

const AdminDeleteViewComponent = ({
  tableInfo,
  findReadOne,
  selectedColumn, // 키 배열
  columns, // 컬럼 객체
  createButton,
  typeEnum,
  changeViewMode,
  deleteOne,
  primaryKey
}) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-red-600">
        {tableInfo?.tableName} : {tableInfo?.tableEng} 삭제 모드
      </h3>
      
      {findReadOne && Object.keys(findReadOne).length > 0 ? (
        <>
          {/* 컬럼 헤더 */}
          <div className="flex font-semibold border-b pb-1 mb-2 bg-red-50">
            {selectedColumn &&
              selectedColumn.map((key) => (
                <div key={key} className="flex-1">
                  {key} : {columns?.[key]}
                </div>
              ))}
          </div>
          
          {/* 삭제 대상 데이터 행 */}
          <div className="flex border-b py-1 items-center bg-red-50">
            {selectedColumn &&
              selectedColumn.map((key) => (
                <div key={key} className="flex-1">
                  {findReadOne[key] || '-'}
                </div>
              ))}
          </div>
          
          {/* 경고 메시지 */}
          <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded">
            <p className="text-red-700 font-semibold">
              ⚠️ 경고: 이 작업은 되돌릴 수 없습니다!
            </p>
          </div>
          
          {/* 삭제 버튼 */}
          <div className="flex justify-center mt-6">
            {createButton({
              label: "진짜 삭제",
              style: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
              onClick: () => {
                if (window.confirm('정말로 삭제하시겠습니까?')) {
                  changeViewMode(typeEnum?.loading);
                  deleteOne(findReadOne[primaryKey]);
                }
              },
            })}
          </div>
        </>
      ) : (
        <div className="text-center p-4 text-gray-500">
          삭제할 데이터를 선택해주세요.
        </div>
      )}
    </div>
  );
};

export default AdminDeleteViewComponent;