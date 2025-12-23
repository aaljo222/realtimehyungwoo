import React from "react";
import LegalNotice from "../../json/information/legalNotice.json";
import { makeCommonTitle } from "../../util/makeDivUtils/makeCommonText";

const LegalNoticeComponent = () => {
  return (
    <div className="font-sans text-[#444]">
      <div className="mb-10">{makeCommonTitle("법적고지", "기타안내")}</div>
      <div>
        {LegalNotice.map((notice, idx) => (
          <div key={idx} className={idx === 0 ? "" : "mt-12"}>
            <h3 className="text-[20px] font-bold text-[#222] mb-4 border-l-4 border-[#002c62] pl-3 leading-none">
              {notice.title}
            </h3>
            <div className="text-[15px] text-[#666] leading-relaxed break-keep">
              {notice.contents.map((content, cIdx) => (
                <p key={cIdx} className="mb-2 last:mb-0">
                  {content}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalNoticeComponent;
