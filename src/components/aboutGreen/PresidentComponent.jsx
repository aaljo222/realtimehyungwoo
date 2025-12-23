import React, { useEffect, useState } from "react";
// jsonData 경로는 실제 프로젝트 구조에 맞게 확인해 주세요.
import jsonData from "../../json/aboutGreen/president_profile.json";

const PresidentComponent = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    setProfileData(jsonData);
  }, []);

  if (!profileData) {
    return <div className="p-8 text-center">데이터를 불러오는 중입니다...</div>;
  }

  return (
    <main className="wrap-sub-contents" id="skip-con">
      <article id="_contentBuilder" className="_contentBuilder">
        <div className="max-w-7xl mx-auto p-4 md:p-12 font-sans">
          {/* 페이지 제목 */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 pb-4 border-b-2 border-gray-200">
            {profileData.pageTitle}
          </h1>

          {/* === 1. 상단 '인사말' 박스 (이전과 동일) === */}
          <section className="flex flex-col lg:flex-row gap-12 mb-16 p-6 md:p-10 border border-gray-200 rounded-lg shadow-lg bg-white">
            {/* 좌측: 총장 사진 및 이름 */}
            <div className="lg:w-1/3 flex-shrink-0 text-center lg:text-left">
              <img
                src={profileData.presidentInfo.imageUrl}
                alt={profileData.presidentInfo.name}
                className="w-full max-w-sm mx-auto rounded-lg shadow-xl object-cover"
              />
              <div className="mt-6">
                <p className="text-xl text-gray-600 mt-2">
                  {profileData.presidentInfo.title}
                </p>
                <h2 className="text-3xl font-bold text-gray-900">
                  {profileData.presidentInfo.name}
                </h2>
              </div>
            </div>

            {/* 우측: 인사말 본문 */}
            <div className="lg:w-2/3">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                {profileData.greeting.title}
              </h3>
              <div className="space-y-6 text-gray-700 leading-relaxed text-base">
                {profileData.greeting.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <p className="text-right mt-10 text-xl font-semibold text-gray-800">
                {profileData.greeting.signature}
              </p>
            </div>
          </section>

          {/* === 2. 하단 '총장 약력' (카테고리별 박스 적용) === */}
          {/* [변경점] 
            이전의 큰 흰색 박스(<section ... bg-white>)를 제거하고
            각 항목(section)이 제목(h3)과 별도의 내용 박스(div.bg-gray-50)를 갖도록
            map 루프 내부 구조를 수정했습니다.
          */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 pb-4 border-b-2 border-gray-200">
              {profileData.profile.title}
            </h2>

            {/* 각 카테고리(학력, 주요경력 등)를 반복 */}
            <div className="space-y-12">
              {profileData.profile.sections.map((section) => (
                <div key={section.category}>
                  {/* 1. 카테고리 제목 (예: 학력) */}
                  <h3 className="text-2xl font-bold text-blue-700 mb-6 border-l-4 border-blue-700 pl-4">
                    {section.category}
                  </h3>

                  {/* 2. 해당 카테고리의 내용 박스 */}
                  {/* 이 div가 이미지에서 본 옅은 배경의 박스입니다.
                    - mt-6: 제목과의 간격
                    - bg-gray-50: 옅은 회색 배경 (이미지와 유사)
                    - p-6 md:p-8: 박스 내부 여백
                    - rounded-lg: 둥근 모서리
                    - border: 옅은 테두리
                  */}
                  <div className="mt-6 bg-gray-50 p-6 md:p-8 rounded-lg border border-gray-200">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      {section.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-row text-base md:text-lg"
                        >
                          <span className="w-32 flex-shrink-0 font-medium text-gray-600">
                            {item.date || item.dateRange}
                          </span>
                          <span className="text-gray-800">
                            {item.description}
                          </span>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
};

export default PresidentComponent;
