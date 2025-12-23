// util/makeDivUtils/makeCommonCard.js

const renderCardHeader = (
  title,
  action,
  actionBtn = "더보기",
  headerStyle = ""
) => {
  return (
    <div className={`flex justify-between items-start ${headerStyle}`}>
      <strong className="text-[17px] font-bold break-keep leading-tight">
        {title}
      </strong>

      {action && (
        <button
          onClick={action}
          className="text-[11px] text-[#888] border px-2 py-1 rounded-sm hover:text-[#002c62]"
        >
          {actionBtn}
        </button>
      )}
    </div>
  );
};

const renderCardContents = (contents = [], layout = "column", columns) => {
  const layoutClassMap = {
    column: "flex flex-col gap-1 text-sm text-[#666]",
    row: "flex flex-row gap-4",
    grid: `grid grid-cols-${columns} gap-4`,
  };

  return (
    <div className={layoutClassMap[layout] || layoutClassMap.column}>
      {contents.map((content, idx) => (
        <div key={idx}>{content}</div>
      ))}
    </div>
  );
};

const makeCommonCard = (title, contents = [], options = {}) => {
  const {
    action = null,
    actionBtn,
    layout = "column",
    columns = 2,
    variant = "default", // ⭐ 추가
  } = options;

  const variantStyleMap = {
    default: "border rounded-lg p-4 bg-white",
    program:
      "bg-white border border-[#dcdcdc] rounded-sm p-6 hover:shadow-md transition-shadow",
  };

  return (
    <div className={variantStyleMap[variant] || variantStyleMap.default}>
      {renderCardHeader(title, action, actionBtn, "mb-3 pb-3 border-b")}
      {renderCardContents(contents, layout, columns)}
    </div>
  );
};

const makeCommonStepBox = (step = 1, mainDescription, subDescriptions = []) => {
  return (
    <div className="space-y-1">
      <div className="font-bold">STEP {step}</div>
      <div>{mainDescription}</div>
      <div className="space-y-1">
        {subDescriptions.map((sub, idx) => (
          <div key={idx}>{sub}</div>
        ))}
      </div>
    </div>
  );
};

export { makeCommonCard, makeCommonStepBox };
