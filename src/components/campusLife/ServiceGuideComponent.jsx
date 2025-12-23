import React from "react";
import Welfare from "../../json/campusLife/welfare.json";
import { makeCommonTitle } from "../../util/makeDivUtils/makeCommonText";
import { makeCommonCard } from "../../util/makeDivUtils/makeCommonCard";
import { makeCommonLabel } from "../../util/makeDivUtils/makeCommonMedia";

const ServiceGuideComponent = () => {
  if (!Welfare) return null;

  return (
    <div className="max-w-6xl w-full mx-auto space-y-12">
      {/* 신촌 복지·체육시설 */}
      <section className="space-y-6">
        {makeCommonTitle("신촌 복지·체육시설")}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Welfare.map((welfare, idx) =>
            makeCommonCard(
              welfare.title,
              [
                makeCommonLabel(welfare.location, "text-sm text-gray-600"),
                ...(welfare.phone || []).map((p, i) =>
                  makeCommonLabel(p, "text-sm text-gray-600", i)
                ),
                <ul
                  key="items"
                  className="list-disc pl-5 text-sm text-gray-700"
                >
                  {welfare.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>,
              ],
              {
                action: () => {
                  // 필요 시 링크 연결
                  // window.open(welfare.link, "_blank");
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

export default ServiceGuideComponent;
