# 🚀 AI Resume Builder

An intelligent, full-stack web application designed to help users create ATS-friendly, professional resumes effortlessly. Powered by cutting-edge AI, this platform automates the generation of rich work experience and project summaries, giving job seekers a competitive edge.

![AI Resume Builder Dashboard](Frontend/src/assets/heroSnapshot.png)

## ✨ Key Features

- **🤖 AI-Powered Content Generation:** Enter your job title or tech stack, and the app automatically generates compelling, ATS-optimized bullet points for your experience and projects.
- **🔄 Smart AI Fallback:** Utilizes the **Gemini 3 Flash Preview** model for primary generation. If Gemini is unavailable, the system automatically falls back to a locally hosted **Ollama (Phi-3)** model to ensure zero downtime.
- **🎨 Multiple Beautiful Templates:** Choose from various professional resume templates that fit different industries and personal styles.
- **✍️ Rich Text Editing:** Seamlessly edit your summaries with a built-in WYSIWYG rich text editor.
- **📱 Fully Responsive Design:** Built with Tailwind CSS, ensuring a flawless experience across all devices (Desktop, Tablet, and Mobile).
- **🔒 Secure Authentication:** Safe and reliable user sign-up and sign-in flows.
- **📄 Real-Time Preview:** Watch your resume update in real-time as you fill out your information.

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite) - Fast and modern UI library
- **Tailwind CSS** - Utility-first styling and responsive design
- **Redux Toolkit** - Predictable state management
- **React Router DOM** - Client-side routing
- **Lucide React & React Icons** - Beautiful SVG icons
- **React Simple WYSIWYG** - Rich text editor for customizing summaries

### Backend & AI
- **Node.js & Express.js** - Robust backend server and API
- **MongoDB** - Flexible NoSQL database for storing user profiles and resumes
- **Google Gemini API** - Advanced Large Language Model for generating resume content
- **Ollama (Phi-3)** - Local LLM used as a reliable fallback mechanism

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
- Node.js (v16 or higher)
- MongoDB installed locally or a MongoDB Atlas URI
- Google Gemini API Key
- [Ollama](https://ollama.com/) installed locally (optional, but required for the AI fallback feature)

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/Avi-Kedare-75/AI-Resume-Builder.git
cd AI-Resume-Builder
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd Backend
npm install
\`\`\`
Create a `.env` file in the `Backend` directory and configure your database and authentication secrets:
\`\`\`env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
\`\`\`
Start the backend server:
\`\`\`bash
npm start
\`\`\`

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
\`\`\`bash
cd Frontend
npm install
\`\`\`
Create a `.env` file in the `Frontend` directory and add your Gemini API Key:
\`\`\`env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_BASE_URL=http://localhost:5000
\`\`\`
Start the Vite development server:
\`\`\`bash
npm run dev
\`\`\`

### 4. Running Ollama (For AI Fallback)
If you want the offline AI fallback feature to work, ensure Ollama is running in the background with the `phi3` model:
\`\`\`bash
ollama run phi3
\`\`\`

## 💡 How It Works (AI Generation)

When a user clicks **"Generate from AI"** in the Experience or Project sections:
1. The app sends a structured prompt to the **Google Gemini API**.
2. If Gemini successfully returns the bullet points, they are populated into the Rich Text Editor.
3. If the Gemini API limits are reached or an error occurs, the `generateWithFallback` function automatically reroutes the prompt to the local **Ollama Phi-3** server via `http://localhost:11434/api/generate`, ensuring the user always gets their generated summary without interruption.

## 👨‍💻 Developed By

**Avi Kedare**
- GitHub: [@Avi-Kedare-75](https://github.com/Avi-Kedare-75)

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
