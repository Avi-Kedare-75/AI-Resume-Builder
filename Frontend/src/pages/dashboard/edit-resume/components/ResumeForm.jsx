import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import PersonalDetails from "./form-components/PersonalDetails";
import Summary from "./form-components/Summary";
import Experience from "./form-components/Experience";
import Education from "./form-components/Education";
import Skills from "./form-components/Skills";
import Project from "./form-components/Project";
import { ArrowLeft, ArrowRight, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import { setTemplate } from "@/features/resume/resumeFeatures";

function ResumeForm() {
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [enabledNext, setEnabledNext] = useState(true);
  const [enabledPrev, setEnabledPrev] = useState(true);

  const resumeInfo = useSelector((state) => state.editResume.resumeData);

  // ✅ FIX TEMPLATE ISSUE
  useEffect(() => {
    dispatch(setTemplate("template1"));
  }, []);

  // ✅ Navigation logic
  useEffect(() => {
    setEnabledPrev(currentIndex > 0);
    setEnabledNext(currentIndex < 5);
  }, [currentIndex]);

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Link to="/dashboard">
            <Button>
              <HomeIcon />
            </Button>
          </Link>
          <ThemeColor resumeInfo={resumeInfo} />
        </div>

        <div className="flex items-center gap-3">
          {currentIndex > 0 && (
            <Button
              size="sm"
              disabled={!enabledPrev}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
            >
              <ArrowLeft /> Prev
            </Button>
          )}

          {currentIndex < 5 && (
            <Button
              size="sm"
              disabled={!enabledNext}
              onClick={() => setCurrentIndex((prev) => prev + 1)}
            >
              Next <ArrowRight />
            </Button>
          )}
        </div>
      </div>

      {/* STEPS */}

      {currentIndex === 0 && (
        <PersonalDetails
          resumeInfo={resumeInfo}
          setEnabledNext={setEnabledNext}
        />
      )}

      {currentIndex === 1 && (
        <Summary
          resumeInfo={resumeInfo}
          setEnabledNext={setEnabledNext}
          setEnabledPrev={setEnabledPrev}
        />
      )}

      {currentIndex === 2 && (
        <Experience
          resumeInfo={resumeInfo}
          setEnabledNext={setEnabledNext}
          setEnabledPrev={setEnabledPrev}
        />
      )}

      {currentIndex === 3 && (
        <Project
          resumeInfo={resumeInfo}
          setEnabledNext={setEnabledNext}
          setEnabledPrev={setEnabledPrev}
        />
      )}

      {currentIndex === 4 && (
        <Education
          resumeInfo={resumeInfo}
          setEnabledNext={setEnabledNext}
          setEnabledPrev={setEnabledPrev}
        />
      )}

      {currentIndex === 5 && (
        <Skills
          resumeInfo={resumeInfo}
          setEnabledNext={setEnabledNext}
          setEnabledPrev={setEnabledPrev}
        />
      )}
    </div>
  );
}

export default ResumeForm;