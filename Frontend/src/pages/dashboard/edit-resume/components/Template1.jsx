import React from "react";
import SummeryPreview from "./preview-components/SummaryPreview";
import ExperiencePreview from "./preview-components/ExperiencePreview";
import EducationalPreview from "./preview-components/EducationalPreview";
import SkillsPreview from "./preview-components/SkillsPreview";
import ProjectPreview from "./preview-components/ProjectPreview";

function Template1({ resumeData }) {
  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{
        borderColor: resumeData?.themeColor || "#000000",
      }}
    >

      {/* 🔥 CUSTOM HEADER (REPLACES PersonalDeatailPreview) */}
      <div className="flex items-center gap-6 mb-4">

        {/* LEFT → PHOTO */}
        {resumeData?.photo && (
          <img
            src={resumeData.photo}
            alt="profile"
            className="w-24 h-24 object-cover rounded border"
          />
        )}

        {/* CENTER → NAME + DETAILS */}
        <div className="flex-1 text-center">

          <h2
            className="text-2xl font-bold"
            style={{ color: resumeData?.themeColor }}
          >
            {resumeData?.firstName} {resumeData?.lastName}
          </h2>

          <p className="text-sm">{resumeData?.jobTitle}</p>
          <p className="text-xs">{resumeData?.address}</p>

          <div className="flex justify-center gap-3 text-xs mt-1">
            {resumeData?.phone && <span>{resumeData.phone}</span>}
            {resumeData?.email && <span>{resumeData.email}</span>}
          </div>

          <div className="flex justify-center gap-3 text-xs mt-1">
            {resumeData?.github && <span>GitHub</span>}
            {resumeData?.linkedin && <span>LinkedIn</span>}
          </div>

        </div>
      </div>

      {/* LINE */}
      <hr
        className="border-[1.5px] my-3"
        style={{ borderColor: resumeData?.themeColor }}
      />

      {/* 🔽 REST SECTIONS */}
      <SummeryPreview resumeInfo={resumeData} />

      {resumeData?.experience?.length > 0 && (
        <ExperiencePreview resumeInfo={resumeData} />
      )}

      {resumeData?.projects?.length > 0 && (
        <ProjectPreview resumeInfo={resumeData} />
      )}

      {resumeData?.education?.length > 0 && (
        <EducationalPreview resumeInfo={resumeData} />
      )}

      {resumeData?.skills?.length > 0 && (
        <SkillsPreview resumeInfo={resumeData} />
      )}

    </div>
  );
}

export default Template1;