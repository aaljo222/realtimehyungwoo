import React from "react";
import StudentActivities from "../../json/campusLife/student_activities.json";
import { makeCommonTitle } from "../../util/makeDivUtils/makeCommonText";
import { makeCommonCard } from "../../util/makeDivUtils/makeCommonCard";
import { makeCommonLabel } from "../../util/makeDivUtils/makeCommonMedia";

const StudentActivitiesComponent = () => {
  if (!StudentActivities) return null;

  return (
    <div className="max-w-6xl w-full mx-auto space-y-12">
      {/* 자치활동 */}
      <section className="space-y-6">
        {makeCommonTitle("자치활동")}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {StudentActivities.map((activity, idx) =>
            makeCommonCard(
              activity.title,
              [
                makeCommonLabel(activity.location, "text-sm text-gray-600"),
                ...(activity.phone || []).map((p, i) =>
                  makeCommonLabel(p, "text-sm text-gray-600", i)
                ),
                <ul
                  key="items"
                  className="list-disc pl-5 text-sm text-gray-700"
                >
                  {activity.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>,
              ],
              {
                action: () => {
                  // 필요 시 링크 연결
                  // window.open(activity.link, "_blank");
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

export default StudentActivitiesComponent;
