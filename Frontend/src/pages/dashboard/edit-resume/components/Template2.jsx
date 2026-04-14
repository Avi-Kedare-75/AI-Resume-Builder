import React from "react";
import PersonalDeatailPreview from "./preview-components/PersonalDeatailPreview";
import SkillsPreview from "./preview-components/SkillsPreview";
import ExperiencePreview from "./preview-components/ExperiencePreview";

function Template2({ resumeData }) {
  return (
    <div className="shadow-lg h-full p-10 flex gap-6">
      
      {/* LEFT SIDE */}
      <div className="w-1/3 bg-gray-100 p-4">
        <SkillsPreview resumeInfo={resumeData} />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-2/3">
        <PersonalDeatailPreview resumeInfo={resumeData} />
        {resumeData?.experience && <ExperiencePreview resumeInfo={resumeData} />}
      </div>

    </div>
  );
}

export default Template2;