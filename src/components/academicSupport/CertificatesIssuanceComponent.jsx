import React from "react";
import CertificatesIssuance from "../../json/academicSupport/certificatesIssuance.json";
import {
  makeCommonHeading,
  makeCommonTitle,
} from "../../util/makeDivUtils/makeCommonText";

const CertificatesIssuanceComponent = () => {
  return (
    <div className="space-y-10 font-sans">
      <div>{makeCommonTitle("증명서 발급", "인터넷/우편")}</div>

      <div className="flex flex-wrap gap-2">
        {CertificatesIssuance.tabs.map((tab, idx) => (
          <span
            key={idx}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200"
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="border-t border-gray-300 pt-6">
        {makeCommonHeading(
          CertificatesIssuance.certificate_overview.title,
          2,
          "text-blue-800 mb-6 font-bold"
        )}
        <div className="space-y-0 border-t border-gray-200">
          {CertificatesIssuance.certificate_overview.items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row border-b border-gray-200"
            >
              <div className="w-full md:w-48 shrink-0 bg-gray-50 md:bg-transparent px-4 py-4 font-semibold text-gray-800 flex items-center">
                {item.title}
              </div>
              <div className="flex-1 px-4 py-4 text-gray-700">
                {item.content.map((line, i) => (
                  <div key={i} className="leading-relaxed">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-300 pt-8">
        {makeCommonHeading(
          CertificatesIssuance.certificate_methods.title,
          2,
          "text-blue-800 mb-6 font-bold"
        )}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-lg font-bold text-gray-800">
            {CertificatesIssuance.certificate_methods.internet_issue.title}
          </span>
          <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition shadow-md whitespace-nowrap">
            {CertificatesIssuance.certificate_methods.internet_issue.content[0]}
          </button>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-8">
        {makeCommonHeading(
          CertificatesIssuance.instant_issue_steps.title,
          2,
          "text-blue-800 mb-6 font-bold"
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CertificatesIssuance.instant_issue_steps.steps.map((step, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition flex flex-col"
            >
              <div className="text-blue-600 font-bold mb-2 text-sm">
                {step.step}
              </div>
              <div className="text-gray-900 font-bold mb-2 text-lg leading-tight">
                {step.mainDescription}
              </div>
              <div className="mt-auto pt-2">
                {step.subDescription.map((sub, i) => (
                  <div key={i} className="text-sm text-gray-500">
                    {sub}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-300 pt-8">
        {makeCommonHeading(
          CertificatesIssuance.post_issue_steps.title,
          2,
          "text-blue-800 mb-6 font-bold"
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {CertificatesIssuance.post_issue_steps.steps.map((step, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition flex flex-col"
            >
              <div className="text-blue-600 font-bold mb-2 text-sm">
                {step.step}
              </div>
              <div className="text-gray-900 font-bold mb-2 text-lg leading-tight">
                {step.mainDescription}
              </div>
              <div className="mt-auto pt-2">
                {step.subDescription.map((sub, i) => (
                  <div key={i} className="text-sm text-gray-500">
                    {sub}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded border border-gray-200">
          <h4 className="font-bold text-gray-800 mb-3 text-lg">
            {CertificatesIssuance.certificate_post_info.title}
          </h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            {CertificatesIssuance.certificate_post_info.items.map(
              (item, idx) => (
                <li key={idx} className="pl-2 -indent-2">
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-8 pb-8">
        {makeCommonHeading(
          CertificatesIssuance.certificate_error_contact.title,
          2,
          "text-blue-800 mb-4 font-bold"
        )}
        <div className="flex flex-wrap gap-3">
          {CertificatesIssuance.certificate_error_contact.phones.map(
            (phone, idx) => (
              <span
                key={idx}
                className="px-4 py-2 border border-gray-300 bg-white rounded text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                📞 {phone}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificatesIssuanceComponent;
