import React, { useState } from "react";
import GreenHistory from "../../json/aboutGreen/green_history.json";
// 2. makeForced 유틸리티 임포트
import {
  makeMainSection,
  makeTimeLine,
} from "../../util/makeDivUtils/makeForced";
import { makeCommonTitle } from "../../util/makeDivUtils/makeCommonText";

const HistoryOfGreenComponent = () => {
  const [mainSection] = useState(GreenHistory.mainSection);

  return (
    <div className="space-y-16">
      {/* page title */}
      <div>{makeCommonTitle(GreenHistory.pageTitle)}</div>

      {/* main section */}
      {mainSection &&
        makeMainSection(
          mainSection.title,
          mainSection.description,
          mainSection.imageUrl
        )}

      {/* timeline */}
      {makeTimeLine(
        GreenHistory.timeline.leftColumn,
        GreenHistory.timeline.rightColumn
      )}
    </div>
  );
};

export default HistoryOfGreenComponent;
