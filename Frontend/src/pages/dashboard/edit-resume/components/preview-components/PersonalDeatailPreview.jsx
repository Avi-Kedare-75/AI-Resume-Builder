import React from "react";

function PersonalDeatailPreview({ resumeInfo }) {
  return (
    <div>

      {/* HEADER */}
      <div className="flex items-center gap-4">

        {/* 📸 PHOTO */}
        {resumeInfo?.photo && (
          <img
            src={resumeInfo.photo}
            alt="profile"
            className="w-20 h-20 object-cover rounded border"
          />
        )}

        {/* TEXT INFO */}
        <div className="flex-1">

          {/* NAME */}
          <h2
            className="font-bold text-xl"
            style={{ color: resumeInfo?.themeColor || "#000" }}
          >
            {resumeInfo?.firstName || ""} {resumeInfo?.lastName || ""}
          </h2>

          {/* JOB */}
          {resumeInfo?.jobTitle && (
            <p className="text-sm font-medium">
              {resumeInfo.jobTitle}
            </p>
          )}

          {/* ADDRESS */}
          {resumeInfo?.address && (
            <p
              className="text-xs"
              style={{ color: resumeInfo?.themeColor || "#000" }}
            >
              {resumeInfo.address}
            </p>
          )}

          {/* CONTACT */}
          <div className="flex flex-wrap gap-3 text-xs mt-1">
            {resumeInfo?.phone && <span>{resumeInfo.phone}</span>}
            {resumeInfo?.email && <span>{resumeInfo.email}</span>}
          </div>

          {/* 🔥 LINKS */}
          <div className="flex gap-4 text-xs mt-1">
            {resumeInfo?.github && (
              <a
                href={resumeInfo.github}
                target="_blank"
                rel="noopener noreferrer"   // ✅ FIX (important)
                className="underline"
                style={{ color: resumeInfo?.themeColor || "#000" }}
              >
                GitHub
              </a>
            )}

            {resumeInfo?.linkedin && (
              <a
                href={resumeInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"   // ✅ FIX
                className="underline"
                style={{ color: resumeInfo?.themeColor || "#000" }}
              >
                LinkedIn
              </a>
            )}
          </div>

        </div>
      </div>

      {/* LINE */}
      <hr
        className="border-[1.5px] my-3"
        style={{ borderColor: resumeInfo?.themeColor || "#000" }}
      />
    </div>
  );
}

export default PersonalDeatailPreview;