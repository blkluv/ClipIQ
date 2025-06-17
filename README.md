# 🎥 ClipIQ

> **AI-powered screen recording, collaboration, and video management platform.**

ClipIQ is a **modern SaaS platform** that streamlines video capture, real-time sharing, and AI-enhanced content creation for individuals and teams. It combines a **Next.js web app**, an **Electron.js desktop recorder**, and an **Express.js media processing server** to provide a seamless recording-to-publishing workflow.

---

## 🧠 Key Highlights

- 🖥️ Record screen + audio + camera (Electron desktop app)
- ☁️ Instant upload & sync to cloud
- 🪄 AI-generated **transcriptions**, **titles**, and **descriptions** (Pro only)
- 🗂️ Intuitive **folder** & **workspace** system
- 💬 Comment threads and replies per video (public link enabled)
- 🔄 Real-time updates via WebSockets

---

## 🧩 Tech Stack

| Layer         | Technology              | Description                            |
|---------------|--------------------------|----------------------------------------|
| Web Frontend  | **Next.js 14+ (App Router)** | Dynamic routing, server components, interactive UI |
| Desktop App   | **Electron.js + React + Vite** | Cross-platform screen/audio recorder   |
| Backend API   | **Express.js + Cloudinary** | Handles video uploads & processing     |
| Realtime Sync | **WebSockets** (socket.io)     | Live video chunk upload & feed updates |
| AI Features   | **Assembly AI and GEMINI AI** | Transcript, title, description (Pro)   |
| Database      | **PostgreSQL (via Prisma)**    | Users, videos, folders, workspaces     |
| Storage       | **Cloudinary**                | Global CDN for fast video playback     |

---

## 📦 Features Breakdown

### 🌐 Web App (Next.js)

- ✅ **Workspace Management**  
  - Create private/public workspaces  
  - Invite collaborators (Pro only for public)

- ✅ **Folder Management**  
  - Organize videos into folders  
  - Rename via double-click  
  - Drag-and-drop video movement

- ✅ **Video Dashboard**  
  - Real-time preview & upload  
  - Smart filters and search  
  - Share via public link

- ✅ **Comment System**  
  - Viewers can reply on videos without login  
  - Threads for focused discussion

- ✅ **AI Tools (Pro)**  
  - Auto-generate transcript  
  - Suggest video title & description  
  - Enable discoverability with keyword tags

---

### 🖥️ Desktop App (Electron.js)

- 🎥 **Screen Recorder**  
  - Choose display + audio input + webcam  
  - HD or SD quality (based on plan)  
  - Pause/resume recording  
  - Auto-upload chunks to web

- ⚙️ **Settings Panel**  
  - Select mic, camera, and screen  
  - Save default preferences to user profile

---

### 🧪 Express.js Server

- 🛠️ Receives video chunks  
- 🧹 Processes and optimizes videos  
- 📡 Updates database and syncs with frontend  
- 🔁 Handles retries, failures, or disconnections

---

## 💳 Pricing Plan in App

| Plan     | Monthly Price | Recording Limit     | AI Features                      | Sharing              |
|----------|----------------|----------------------|----------------------------------|-----------------------|
| Free     | ₹ 0            | 5 minutes/video      | ✖️ AI tools disabled              | Private workspaces only |
| Pro      | ₹ 999/month    | Unlimited recording  | ✅ AI transcript, title & description | Public + Invite workspaces |

---

