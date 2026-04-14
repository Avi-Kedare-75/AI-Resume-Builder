import React, { useState, useEffect } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AIChatSession } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";

const prompt =
  "Job Title: {jobTitle}. Generate 3 resume summaries (Fresher, Mid Level, Senior). Return ONLY JSON array with keys: experience_level and summary.";

function Summary({ resumeInfo, setEnabledNext, setEnabledPrev }) {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

  // ✅ sync summary
  useEffect(() => {
    setSummary(resumeInfo?.summary || "");
  }, [resumeInfo]);

  // ✅ handle input
  const handleInputChange = (e) => {
    setEnabledNext(false);
    setEnabledPrev(false);

    const value = e.target.value;
    setSummary(value);

    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: value,
      })
    );
  };

  // ✅ save
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { data: { summary } };

    if (resume_id) {
      updateThisResume(resume_id, data)
        .then(() => toast("Resume Updated"))
        .catch((error) => toast(error.message))
        .finally(() => {
          setEnabledNext(true);
          setEnabledPrev(true);
          setLoading(false);
        });
    }
  };

  // ✅ apply suggestion
  const setSummery = (text) => {
    setSummary(text);

    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: text,
      })
    );
  };

  // ✅ AI generate
  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast("Please Add Job Title");
      return;
    }

    setLoading(true);

    try {
      const PROMPT = prompt.replace("{jobTitle}", resumeInfo.jobTitle);

      const result = await AIChatSession.sendMessage(PROMPT);
      let parsed = JSON.parse(result.response.text());

      // 🔥 FIX KEY ISSUE
      const fixed = parsed.map((item) => ({
        experience_level: item.experience_level,
        summary: item.summary || item.summery, // handle both
      }));

      setAiGenerateSummeryList(fixed);
      toast("Summary Generated");

    } catch (error) {
      console.log(error);
      toast("AI Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      {/* FORM */}
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={GenerateSummeryFromAI}
              className="flex gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Generate AI
            </Button>
          </div>

          <Textarea
            name="summary"
            className="mt-5"
            value={summary || ""}
            onChange={handleInputChange}
            required
          />

          <div className="mt-2 flex justify-end">
            <Button disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {/* SUGGESTIONS */}
      {aiGeneratedSummeryList?.length > 0 && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>

          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setEnabledNext(false);
                setEnabledPrev(false);
                setSummery(item.summary);
              }}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <h2 className="font-bold text-primary">
                Level: {item.experience_level}
              </h2>

              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Summary;