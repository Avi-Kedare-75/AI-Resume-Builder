import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

function PersonalDetails({ resumeInfo, setEnabledNext }) {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
    github: "",
    linkedin: "",
    photo: "",
  });

  // ✅ Sync formData when resumeInfo changes
  useEffect(() => {
    if (resumeInfo) {
      setFormData({
        firstName: resumeInfo?.firstName || "",
        lastName: resumeInfo?.lastName || "",
        jobTitle: resumeInfo?.jobTitle || "",
        address: resumeInfo?.address || "",
        phone: resumeInfo?.phone || "",
        email: resumeInfo?.email || "",
        github: resumeInfo?.github || "",
        linkedin: resumeInfo?.linkedin || "",
        photo: resumeInfo?.photo || "",
      });
    }
  }, [resumeInfo]);

  // ✅ Handle input change (SAFE)
  const handleInputChange = (e) => {
    if (setEnabledNext) setEnabledNext(false);

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    dispatch(
      addResumeData({
        ...resumeInfo,
        [name]: value,
      })
    );
  };

  // ✅ Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const updatedData = {
        ...formData,
        photo: reader.result,
      };

      setFormData(updatedData);

      dispatch(
        addResumeData({
          ...resumeInfo,
          ...updatedData,
        })
      );
    };

    reader.readAsDataURL(file);
  };

  // ✅ Save to backend
  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (resume_id) {
        await updateThisResume(resume_id, { data: formData });
        toast("Resume Updated Successfully");
      }
    } catch (error) {
      console.error(error);
      toast("Error updating resume");
    } finally {
      if (setEnabledNext) setEnabledNext(true);
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with your basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">

          {/* First Name */}
          <div>
            <label>First Name</label>
            <Input
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label>Last Name</label>
            <Input
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Job Title */}
          <div className="col-span-2">
            <label>Job Title</label>
            <Input
              name="jobTitle"
              value={formData.jobTitle || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label>Address</label>
            <Input
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label>Phone</label>
            <Input
              name="phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label>Email</label>
            <Input
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* GitHub */}
          <div>
            <label>GitHub</label>
            <Input
              name="github"
              value={formData.github || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label>LinkedIn</label>
            <Input
              name="linkedin"
              value={formData.linkedin || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* Photo Upload */}
          <div className="col-span-2">
            <label>Upload Photo</label>
            <Input type="file" onChange={handlePhotoUpload} />
          </div>

        </div>

        {/* Save Button */}
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;