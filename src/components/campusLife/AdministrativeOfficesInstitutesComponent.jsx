import React from "react";
import Organ from "../../json/campusLife/organ.json";
import { makeCommonTitle } from "../../util/makeDivUtils/makeCommonText";
import { makeCommonCard } from "../../util/makeDivUtils/makeCommonCard";
import { makeCommonLabel } from "../../util/makeDivUtils/makeCommonMedia";

const AdministrativeOfficesInstitutesComponent = () => {
  return (
    <div className="max-w-6xl w-full mx-auto space-y-12">
      {/* 신촌캠퍼스 */}
      <section className="space-y-6">
        {makeCommonTitle("신촌캠퍼스")}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Organ.신촌캠퍼스.map((organ, idx) =>
            makeCommonCard(
              organ.title,
              [
                makeCommonLabel(organ.location, "text-sm text-gray-600"),
                ...organ.phone.map((p, i) =>
                  makeCommonLabel(p, "text-sm text-gray-600", i)
                ),
                <ul
                  key="items"
                  className="list-disc pl-5 text-sm text-gray-700"
                >
                  {organ.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>,
              ],
              {
                action: () => {
                  // 필요 시 링크 연결
                  // window.open(organ.link, "_blank");
                },
                actionBtn: "더보기",
              }
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default AdministrativeOfficesInstitutesComponent;
