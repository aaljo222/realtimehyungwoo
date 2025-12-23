import { useState } from "react";
import GreenIcon from "../../json/aboutGreen/green_icon.json";
import { makeCommonHeading } from "../../util/makeDivUtils/makeCommonText";
import { makeCommonLabel } from "../../util/makeDivUtils/makeCommonMedia";

const UniversitySymbolsComponent = () => {
  const [mainContent] = useState(GreenIcon.page.mainContent);

  return (
    <div className="w-full">
      <div className="relative w-full min-h-[420px] overflow-hidden rounded-2xl">
        {/* background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mainContent.backgroundImage})` }}
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10" />

        {/* text content */}
        <div className="relative z-10 max-w-6xl px-12 py-20 text-white space-y-10">
          {makeCommonHeading(
            mainContent.textOverlay.title,
            2,
            "inline-block text-white text-2xl font-bold pb-2 border-b-2 border-white"
          )}

          <div className="space-y-6 max-w-2xl leading-relaxed">
            {mainContent.textOverlay.paragraphs.map((p, idx) => (
              <div key={idx}>{makeCommonLabel(p, "text-white/90")}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversitySymbolsComponent;
