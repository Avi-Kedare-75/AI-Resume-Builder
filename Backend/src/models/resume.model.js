import mongoose from "mongoose";
import educationSchema from "./education.model.js";

const resumeSchema = new mongoose.Schema(
  {
    // 🔹 BASIC INFO
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    title: { type: String, default: "" },
    email: { type: String, default: "" },
    jobTitle: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    summary: { type: String, default: "" },

    // 🔥 NEW FIELDS
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    photo: { type: String, default: "" }, // ⚠️ avoid saving large base64

    // 🔹 USER
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // 🔹 EXPERIENCE
    experience: [
      {
        title: String,
        companyName: String,
        city: String,
        state: String,
        startDate: String,
        endDate: String,
        currentlyWorking: { type: Boolean, default: false }, // ✅ fixed
        workSummary: String,
      },
    ],

    // 🔹 EDUCATION
    education: [educationSchema],

    // 🔹 SKILLS
    skills: [
      {
        name: String,
        rating: Number,
      },
    ],

    // 🔹 PROJECTS
    projects: [
      {
        projectName: String,
        techStack: String,
        projectSummary: String,
      },
    ],

    // 🔥 NEW SECTIONS
    internships: [
      {
        role: String,
        company: String,
        duration: String,
        description: String,
      },
    ],

    achievements: [
      {
        title: String,
        description: String,
      },
    ],

    certifications: [
      {
        name: String,
        issuer: String,
        year: String,
      },
    ],

    strengths: [String],
    improvements: [String],

    // 🔹 UI
    themeColor: { type: String, default: "#000000" },
  },
  {
    timestamps: true, // ✅ auto createdAt & updatedAt
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;