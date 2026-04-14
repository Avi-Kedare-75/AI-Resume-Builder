import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import ResumePreview from "../../edit-resume/components/PreviewPage";
import { useDispatch } from "react-redux";
import { addResumeData, setTemplate } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";

function ViewResume() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchResumeInfo();
  }, []);

  const fetchResumeInfo = async () => {
    try {
      const response = await getResumeData(resume_id);
      dispatch(addResumeData(response.data));
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="flex flex-col justify-center items-center">

      {/* TOP SECTION (hidden in print) */}
      <div id="noPrint">
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your AI-generated Resume is ready!
          </h2>

          <p className="text-center text-gray-400">
            Download your resume or share it using the link below
          </p>

          {/* 🔥 ACTION BUTTONS */}
          <div className="flex flex-col items-center gap-4 my-10">

            {/* Template Buttons */}
            <div className="flex gap-4">
              <Button onClick={() => dispatch(setTemplate("template1"))}>
                Template 1
              </Button>

              <Button onClick={() => dispatch(setTemplate("template2"))}>
                Template 2
              </Button>

              <Button onClick={() => dispatch(setTemplate("template3"))}>
                Template 3
              </Button>
            </div>

            {/* Download + Share */}
            <div className="flex gap-4">
              <Button onClick={handleDownload}>Download</Button>

              <RWebShare
                data={{
                  text: "Check out my resume",
                  url:
                    import.meta.env.VITE_BASE_URL +
                    "/dashboard/view-resume/" +
                    resume_id,
                  title: "My Resume",
                }}
                onClick={() => toast("Resume Shared Successfully")}
              >
                <Button>Share</Button>
              </RWebShare>
            </div>
          </div>
        </div>
      </div>

      {/* 📄 RESUME AREA */}
      <div
        className="bg-white rounded-lg p-8 print-area"
        style={{ width: "210mm", minHeight: "297mm" }}   // ✅ fix height issue
      >
        <ResumePreview />
      </div>
    </div>
  );
}

export default ViewResume;