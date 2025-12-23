// h1 ~ h3 전용 타이틀 (div 고정, level별 기본 size + className 덮어쓰기)
const makeCommonHeading = (text, level, sizeClass) => {
  const baseClass = "text-gray-900";
  const sizeByLevel = {
    1: "text-2xl font-bold",
    2: "text-xl font-semibold",
    3: "text-lg font-medium",
  };
  const className = `${baseClass} ${sizeClass}`;

  const finalClassName = `${baseClass} ${
    sizeByLevel[level] || ""
  } ${className}`;

  return (
    <div data-level={level} className={finalClassName}>
      {text}
    </div>
  );
};

// 타이틀을 만듭니다.
const makeCommonTitle = (
  mainTitle,
  subTitle,
  mainStyle = "text-xl font-bold pb-2 border-b-2 border-blue-600 inline-block",
  subStyle = "text-sm text-gray-500 font-medium ml-1"
) => {
  return (
    <>
      <div className={mainStyle}>{mainTitle}</div>
      {subTitle && <div className={subStyle}> ({subTitle})</div>}
    </>
  );
};

// 코멘트를 생성하는 양식입니다.
const makeCommonComment = (comments = [], commentStyle = "") => {
  return (
    <>
      {comments.map((comment, idx) => (
        <div key={idx} className={commentStyle}>
          ※ {comment} ※
        </div>
      ))}
    </>
  );
};

export { makeCommonHeading, makeCommonTitle, makeCommonComment };
