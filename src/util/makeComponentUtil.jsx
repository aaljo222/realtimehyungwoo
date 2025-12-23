// utils/makeComponentUtils.js
import React from "react";

export const jsonToDiv = (data, indent = 0) => {
  const pad = { marginLeft: indent * 20 + "px" };

  // null, undefined, 기본값
  if (data === null || data === undefined) {
    return <div style={pad}>null</div>;
  }

  // 원시값이면 단순 표시
  if (typeof data !== "object") {
    return <div style={pad}>{String(data)}</div>;
  }

  // 배열이면 요소 반복
  if (Array.isArray(data)) {
    return (
      <div style={pad}>
        {data.map((item, idx) => (
          <div key={idx}>{jsonToDiv(item, indent + 1)}</div>
        ))}
      </div>
    );
  }

  // 객체 처리
  return (
    <div style={pad}>
      {Object.entries(data).map(([key, value], idx) => (
        <div key={idx} style={{ marginBottom: "4px" }}>
          {/* Key 출력 */}
          <div style={{ fontWeight: "bold" }}>{key}</div>

          {/* Value 출력 */}
          <div>{jsonToDiv(value, indent + 1)}</div>
        </div>
      ))}
    </div>
  );
};

export const makeDiv = (data) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
      {data?.map((da, idx) => (
        <div
          key={idx}
          className="p-2 mb-2 bg-white rounded hover:bg-gray-100 shadow-sm"
        >
          {da}
        </div>
      ))}
    </div>
  );
};

// 배경색 배열 (depth마다 순환)
const bgColors = ["bg-gray-100", "bg-gray-200", "bg-gray-300", "bg-gray-400"];

// 1️⃣ 단일 노드 렌더링
const renderNode = (key, value, indent = 0) => {
  const padClass = `ml-${indent * 4}`;
  const bgClass = bgColors[indent % bgColors.length] + " p-1 rounded-md mb-1";

  if (!key) return <div className={`${padClass} ${bgClass}`}>{value}</div>;

  if (typeof value === "object" && value !== null) {
    return (
      <div className={`${padClass} ${bgClass} font-semibold`}>{key} =&gt;</div>
    );
  }

  return (
    <div className={`${padClass} ${bgClass}`}>
      <span className="font-bold text-blue-600">{key}</span> :{" "}
      <span className="text-gray-700">{value}</span>
    </div>
  );
};

// 2️⃣ 객체 재귀 처리
const renderObject = (obj, indent = 0) => {
  return Object.entries(obj).map(([key, value]) => (
    <React.Fragment key={key}>
      {renderNode(key, value, indent)}
      {typeof value === "object" && value !== null
        ? recursiveRender(value, indent + 1)
        : null}
    </React.Fragment>
  ));
};

// 3️⃣ 배열 재귀 처리
const renderArray = (arr, indent = 0) => {
  return arr.map((item, idx) => recursiveRender(item, indent));
};

// 4️⃣ 재귀 통합
export const recursiveRender = (data, indent = 0) => {
  if (data === null || data === undefined) return null;
  if (Array.isArray(data)) return renderArray(data, indent);
  if (typeof data === "object") return renderObject(data, indent);
  return renderNode(null, data, indent);
};
