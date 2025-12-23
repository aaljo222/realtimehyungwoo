import Event from "../../json/campusLife/event.json";
import { makeCommonCard } from "../../util/makeDivUtils/makeCommonCard";
import { makeCommonTitle } from "../../util/makeDivUtils/makeCommonText";

const EventsComponent = () => {
  const renderedPeriods = new Set();

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {Event.map((event, idx) => {
        const isNewPeriod = !renderedPeriods.has(event.period);
        if (isNewPeriod) renderedPeriods.add(event.period);

        return (
          <div key={idx} className="space-y-4">
            {/* 기간 타이틀 */}
            {isNewPeriod && <div>{makeCommonTitle(event.period)}</div>}

            {/* 이벤트 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {makeCommonCard(
                event.title,
                [
                  <img
                    src={event.image}
                    alt=""
                    className="w-full h-48 object-cover rounded"
                  />,
                  <div className="text-sm text-gray-500">{event.period}</div>,
                  <div className="font-semibold">{event.location}</div>,
                  <div className="text-sm">{event.department}</div>,
                  <div className="flex flex-wrap gap-2">
                    {event.category?.map((c, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                      >
                        {c}
                      </span>
                    ))}
                    {event.format?.map((f, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {f}
                      </span>
                    ))}
                  </div>,
                ],
                {
                  headerRight: (
                    <span className="text-xs font-semibold text-green-600">
                      {event.status}
                    </span>
                  ),
                }
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventsComponent;
