import React from "react";

function Template3({ resumeData }) {
  return (
    <div className="text-sm p-6 leading-6">

      {/* HEADER */}
      <div className="flex justify-between items-start border-b pb-3 mb-3">

        {/* LEFT → PHOTO */}
        <div>
          {resumeData?.photo ? (
            <img
              src={resumeData.photo}
              alt="profile"
              className="w-24 h-24 object-cover border"
            />
          ) : (
            <div className="border w-24 h-24 flex items-center justify-center text-xs">
              Photo
            </div>
          )}
        </div>

        {/* CENTER → CONTACT */}
        <div className="text-center text-xs">
          <p>{resumeData?.address}</p>
          <p>{resumeData?.phone}</p>
          <p>{resumeData?.email}</p>

          <div className="flex gap-2 justify-center">
            {resumeData?.github && <span>GitHub</span>}
            {resumeData?.linkedin && <span>| LinkedIn</span>}
          </div>
        </div>

        {/* RIGHT → NAME */}
        <div className="text-right">
          <p className="text-lg font-bold">
            {resumeData?.firstName} {resumeData?.lastName}
          </p>
          <p className="text-xs">{resumeData?.jobTitle}</p>
        </div>

      </div>

      {/* SUMMARY */}
      <Section title="Career Objective">
        {resumeData?.summary}
      </Section>

      {/* EDUCATION */}
      <Section title="Academic Record">
        <ul className="list-disc ml-5">
          {resumeData?.education?.map((edu, i) => (
            <li key={i}>
              {edu.degree} - {edu.institute}
            </li>
          ))}
        </ul>
      </Section>

      {/* SKILLS */}
      <Section title="Technical Skills">
        {resumeData?.skills?.map((skill, i) => (
          <span key={i}>
            {skill.name}
            {i !== resumeData.skills.length - 1 && ", "}
          </span>
        ))}
      </Section>

      {/* EXPERIENCE */}
      <Section title="Internship / Experience">
        {resumeData?.experience?.map((exp, i) => (
          <div key={i}>
            <p>
              <b>{exp.title}</b> - {exp.companyName}
            </p>
            <p>{exp.startDate} - {exp.endDate}</p>
            <p>{exp.workSummary}</p>
          </div>
        ))}
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">
        {resumeData?.projects?.map((proj, i) => (
          <div key={i}>
            <p>
              <b>{proj.projectName}</b>
            </p>
            <p>{proj.projectSummary}</p>
          </div>
        ))}
      </Section>

      {/* PERSONAL DETAILS */}
      <Section title="Personal Details">
        <p>DOB: {resumeData?.dob || "-"}</p>
        <p>Nationality: {resumeData?.nationality || "-"}</p>
      </Section>

      {/* DECLARATION */}
      <Section title="Declaration">
        I hereby declare that the information furnished above is true.
      </Section>

      {/* FOOTER */}
      <div className="flex justify-between mt-6">
        <p>Place: {resumeData?.place || "-"}</p>
        <p>Sign</p>
      </div>

    </div>
  );
}

const Section = ({ title, children }) => (
  <div className="mb-3">
    <p className="font-bold">{title}:</p>
    {children}
  </div>
);

export default Template3;