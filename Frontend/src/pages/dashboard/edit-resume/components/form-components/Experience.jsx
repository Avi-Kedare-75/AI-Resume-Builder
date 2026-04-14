import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Trash2 } from "lucide-react";
import RichTextEditor from "@/components/custom/RichTextEditor";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { updateThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";

const emptyExperience = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  workSummary: "",
};

function Experience({ resumeInfo, setEnabledNext, setEnabledPrev }) {
  const [experienceList, setExperienceList] = useState(
    resumeInfo?.experience || []
  );
  const [loading, setLoading] = useState(false);
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  // ✅ sync redux
  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, experience: experienceList }));
  }, [experienceList]);

  // ✅ add new
  const addExperience = () => {
    setExperienceList((prev) => [...prev, { ...emptyExperience }]); // clone object
  };

  // ✅ remove
  const removeExperience = (index) => {
    setExperienceList((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ input change
  const handleChange = (e, index) => {
    if (setEnabledNext) setEnabledNext(false);
    if (setEnabledPrev) setEnabledPrev(false);

    const { name, value } = e.target;

    setExperienceList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  // ✅ editor
  const handleRichTextEditor = (value, name, index) => {
    setExperienceList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  // ✅ save
  const onSave = async () => {
    setLoading(true);

    try {
      if (resume_id) {
        await updateThisResume(resume_id, {
          data: { experience: experienceList },
        });
        toast("Experience Updated");
      }
    } catch (error) {
      toast(error.message);
    } finally {
      if (setEnabledNext) setEnabledNext(true);
      if (setEnabledPrev) setEnabledPrev(true);
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Experience</h2>
      <p>Add Your Previous Job Experience</p>

      {experienceList.map((experience, index) => (
        <div key={index}>
          <div className="flex justify-between my-2">
            <h3 className="font-bold">Experience {index + 1}</h3>
            <Button
              variant="outline"
              className="text-red-500"
              onClick={() => removeExperience(index)}
            >
              <Trash2 />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 border p-3 rounded-lg">
            <Input
              name="title"
              placeholder="Position Title"
              value={experience.title || ""}
              onChange={(e) => handleChange(e, index)}
            />

            <Input
              name="companyName"
              placeholder="Company"
              value={experience.companyName || ""}
              onChange={(e) => handleChange(e, index)}
            />

            <Input
              name="city"
              placeholder="City"
              value={experience.city || ""}
              onChange={(e) => handleChange(e, index)}
            />

            <Input
              name="state"
              placeholder="State"
              value={experience.state || ""}
              onChange={(e) => handleChange(e, index)}
            />

            <Input
              type="date"
              name="startDate"
              value={experience.startDate || ""}
              onChange={(e) => handleChange(e, index)}
            />

            <Input
              type="date"
              name="endDate"
              value={experience.endDate || ""}
              onChange={(e) => handleChange(e, index)}
            />

            <div className="col-span-2">
              <RichTextEditor
                index={index}
                defaultValue={experience.workSummary}
                onRichTextEditorChange={(val) =>
                  handleRichTextEditor(val, "workSummary", index)
                }
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-3">
        <Button onClick={addExperience} variant="outline">
          + Add Experience
        </Button>

        <Button onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Experience;