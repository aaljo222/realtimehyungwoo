import { makeDefaultLI } from "./makeCommonList";

// 라벨링, 여러개 묶어서 출력 (made by 김유라)
// const makePrivacyLabelItem = (image, label = "", contents = []) => {
//   return (
//     <>
//       {/* 이미지 */}
//       <div>{makeDefaultImageBox(image)}</div>

//       {/* 라벨 */}
//       <div>{makeDefaultLabelBox(label)}</div>

//       {/* 내용들 */}
//       <div>{makeDefaultLI(contents)}</div>
//     </>
//   );
// };

// 텍스트에 태그를 입힙니다.
const makeCommonTag = (text, style) => {
  return <span className={style}>{text}</span>;
};

const makeCommonLabel = (text, style) => {
  return <span className={style}>{text}</span>;
};

const makeCommonImage = (src, alt = "", style) => {
  return (
    <>
      <div className={style}>
        <img src={src} alt={alt} />
      </div>
    </>
  );
};

export { makeCommonTag, makeCommonLabel, makeCommonImage };
