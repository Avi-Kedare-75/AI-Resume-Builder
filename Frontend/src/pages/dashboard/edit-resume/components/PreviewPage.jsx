import React from "react";
import { useSelector } from "react-redux";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";


function PreviewPage() {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  const selectedTemplate = useSelector((state) => state.editResume.template);

  switch (selectedTemplate) {
    case "template2":
      return <Template2 resumeData={resumeData} />;
    case "template3":
    return <Template3 resumeData={resumeData} />;
    default:
      return <Template1 resumeData={resumeData} />;
  }
}

export default PreviewPage;