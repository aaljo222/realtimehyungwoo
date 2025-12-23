import AcademicInformation from "../../json/academicSupport/academicInformation.json";
import {
  makeCommonHeading,
  makeCommonTitle,
} from "../../util/makeDivUtils/makeCommonText";

const AcademicInformationComponent = () => {
  return (
    <div className="space-y-8">
      <div>{makeCommonTitle("학사일정", "2025학년도")}</div>

      <div className="border-t border-gray-300">
        {AcademicInformation &&
          AcademicInformation.map((info, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row border-b border-gray-300"
            >
              <div className="w-full md:w-48 shrink-0 bg-gray-50 md:bg-transparent md:border-r border-gray-300 px-6 py-6 flex flex-row md:flex-col items-baseline md:items-start gap-2">
                {makeCommonHeading(info.month, 2, "text-blue-700 font-bold")}
                <span className="text-sm text-gray-500 font-medium tracking-wider">
                  {info.monthEng}
                </span>
              </div>

              <div className="flex-1 px-6 py-6">
                <ul className="space-y-3">
                  {info.events.map((event, eventIdx) => (
                    <li
                      key={eventIdx}
                      className="flex flex-col sm:flex-row sm:gap-6"
                    >
                      <span className="text-gray-900 font-semibold w-36 shrink-0">
                        {event.date}
                      </span>
                      <span className="text-gray-700">{event.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AcademicInformationComponent;
