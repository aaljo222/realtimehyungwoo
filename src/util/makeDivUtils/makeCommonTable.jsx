// util/makeDivUtils/makeCommonTable.js

const renderTableHeader = (headers = [], colStyles = []) => {
  return (
    <tr className="bg-[#f8f9fa]">
      {headers.map((header, idx) => (
        <th
          key={idx}
          className={`px-4 py-3 text-sm font-semibold text-[#333] border-b border-[#e5e5e5] ${
            colStyles[idx] || "text-center"
          }`}
        >
          {header}
        </th>
      ))}
    </tr>
  );
};

const renderCell = (row, col, renderMap) => {
  if (renderMap && typeof renderMap[col] === "function") {
    return renderMap[col](row);
  }
  return row[col];
};

const renderTableBody = (
  rows = [],
  columns = [],
  colStyles = [],
  renderMap
) => {
  return rows.map((row, rowIdx) => (
    <tr key={rowIdx} className="hover:bg-[#f9f9f9]">
      {columns.map((col, colIdx) => (
        <td
          key={colIdx}
          className={`px-4 py-4 text-sm text-[#444] border-b border-[#e5e5e5] ${
            colStyles[colIdx] || "text-center"
          }`}
        >
          {renderCell(row, col, renderMap)}
        </td>
      ))}
    </tr>
  ));
};

const makeCommonTable = (
  headers = [],
  rows = [],
  columns = [],
  options = {}
) => {
  const {
    colStyles = [],
    renderMap = null,
    emptyText = "데이터가 없습니다.",
  } = options;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        {headers.length > 0 && (
          <thead>{renderTableHeader(headers, colStyles)}</thead>
        )}
        <tbody>
          {rows && rows.length > 0 ? (
            renderTableBody(rows, columns, colStyles, renderMap)
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-10 text-center text-[#666] border-b border-[#e5e5e5]"
              >
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { makeCommonTable };
