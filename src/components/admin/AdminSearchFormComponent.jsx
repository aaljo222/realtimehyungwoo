import React from 'react'
import { typeEnum } from '../../api/commonApi';
import { createButton } from '../../util/button';

const AdminSearchFormComponent = ({
  onSearch,
  searchColumns,
  findSearchColumns,
  tableInfo,
  searchSelectDatas,
  selectKeyword,
  columns,
  selectedColumn,
  changeViewMode,
  changeSelectId,
  primaryKey
}) => {
  return (
    <div>
      <h1>search모드</h1>
      {findSearchColumns && (
        <form onSubmit={onSearch}>
          <h1 className="text-xl font-semibold">
            {tableInfo.tableName}:{tableInfo.tableEng}
          </h1>
          <select name="selectKeyword" className="p-2 border rounded" required>
            <option value="">선택해주세요</option>
            {findSearchColumns.map(column => (
              <option
                key={column}
                value={column}>
                {column}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="searchText"
            className="flex-grow p-2 border rounded"
            required
          />
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            제출
          </button>
        </form>
      )}
      {searchSelectDatas?.length > 0 && (
        <div className="mt-6">

          {/* 컬럼 헤더 */}
          <div className="flex font-semibold border-b pb-2 mb-2">
            {Object.keys(searchColumns[selectKeyword]).map(colKey => (
              <div key={colKey} className="flex-1">
                {colKey}:{searchColumns[selectKeyword][colKey]}
              </div>
            ))}
            <div className="w-24 text-center">조회</div>
          </div>

          {/* 데이터 렌더링 */}
          {searchSelectDatas.map((row, idx) => (
            <div key={idx} className="flex border-b py-2 items-center hover:bg-gray-50 transition">

              {Object.keys(searchColumns[selectKeyword]).map(colKey => (
                <div key={colKey} className="flex-1">
                  {row[colKey]}
                </div>
              ))}

              {/* 한건조회 버튼 */}
              {createButton({
                label: "한건조회",
                style: "bg-red-300 hover:bg-red-600 text-white text-sm px-2 py-1 rounded",
                size: "10%",
                onClick: () => {
                  changeViewMode(typeEnum.readOne);
                  changeSelectId(row[primaryKey]);
                  console.log("조회:", row[primaryKey]);
                },
              })}
            </div>
          ))}
        </div>
      )}


    </div>
  )
}

export default AdminSearchFormComponent