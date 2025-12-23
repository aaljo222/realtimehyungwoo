import { useState } from "react";
import GreenGuide from "../../json/aboutGreen/green_guide.json";
import {
  makeCommonHeading,
  makeCommonTitle,
} from "../../util/makeDivUtils/makeCommonText";
import { makeCommonLabel } from "../../util/makeDivUtils/makeCommonMedia";

const CampusGuideComponent = () => {
  const [mainContent] = useState(GreenGuide.mainContent);

  return (
    <div className="flex flex-col gap-24">
      {/* =========================
          Section 1 : Hero
      ========================= */}
      <section className="relative w-full min-h-[420px] rounded-2xl overflow-hidden">
        {/* background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mainContent.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />

        {/* text */}
        <div className="relative z-10 max-w-6xl px-12 py-24 text-white space-y-6">
          {makeCommonHeading(
            "Yonsei University :",
            2,
            "text-white text-3xl font-bold"
          )}
          {makeCommonHeading("Sinchon Campus", 3, "text-yellow-300 text-xl")}
        </div>
      </section>

      {/* introduction */}
      <section className="max-w-5xl mx-auto text-gray-700 leading-relaxed space-y-4">
        {mainContent.introduction.map((p, idx) => (
          <div key={idx}>{makeCommonLabel(p)}</div>
        ))}
      </section>

      {/* =========================
          Section 2 : Location
      ========================= */}
      <section className="max-w-6xl mx-auto space-y-8">
        {makeCommonTitle("지리적 배경")}

        <div className="flex flex-col md:flex-row gap-10 items-start">
          <img
            src={mainContent.sections[0].image}
            alt=""
            className="w-full md:w-1/2 rounded-xl object-cover"
          />

          <div className="space-y-4">
            {makeCommonHeading(
              mainContent.sections[0].locationInfo.title,
              3,
              "text-blue-700"
            )}
            {mainContent.sections[0].locationInfo.paragraphs.map((p, idx) => (
              <div key={idx}>{makeCommonLabel(p)}</div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          Section 3 : Historical Sites
      ========================= */}
      <section className="max-w-6xl mx-auto space-y-8">
        {makeCommonTitle("역사적 배경")}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {mainContent.sections[1].historicalSites.map((history, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <img
                src={history.image}
                alt={history.name}
                className="w-full h-[220px] object-cover"
              />

              <div className="p-6 space-y-3">
                {makeCommonHeading(history.name, 3, "text-blue-700")}
                {history.description.map((d, i) => (
                  <div key={i}>{makeCommonLabel(d)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CampusGuideComponent;
