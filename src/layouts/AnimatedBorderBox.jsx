import React, { useEffect, useRef, useState } from "react";

const AnimatedBorderBox = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // 화면 안으로 들어오면 true, 나가면 false
          setVisible(e.isIntersecting);
        });
      },
      {
        threshold: 0.3, // 박스의 30%가 보일 때 상태 전환
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-[80vw] h-[30vh] items-left justify-left"
      hover="scale:1.5"
    >
      {/* 위 라인 (왼→오) */}
      <div
        className={`absolute top-0 left-0 h-[2px] w-full bg-black transform origin-left transition-transform duration-700 ease-out
        ${visible ? "scale-x-100" : "scale-x-0"}`}
      />

      {/* 아래 라인 (오→왼) */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] w-full bg-black transform origin-right transition-transform duration-700 ease-out delay-150
        ${visible ? "scale-x-100" : "scale-x-0"}`}
      />

      {/* 왼쪽 라인 (위→아래) */}
      <div
        className={`absolute top-0 left-0 w-[2px] h-full bg-black transform origin-top transition-transform duration-700 ease-out delay-300
        ${visible ? "scale-y-100" : "scale-y-0"}`}
      />

      {/* 오른쪽 라인 (아래→위) */}
      <div
        className={`absolute top-0 right-0 w-[2px] h-full bg-black transform origin-bottom transition-transform duration-700 ease-out delay-500
        ${visible ? "scale-y-100" : "scale-y-0"}`}
      />

      {/* 안쪽 내용 */}
      <div className="text-black text-xl">

      </div>
    </div>
  );
};

export default AnimatedBorderBox;
