# 🌐 AI Assistant Web App (Next.js + Tailwind CSS)

A modern and responsive web-based AI Assistant built with **Next.js** and **Tailwind CSS**, allowing users to:

- Chat with a powerful AI model
- Generate AI images from text prompts

This web app uses the **same backend** and AI models as the Flutter app version, ensuring consistency across platforms.

---

## 🧠 Features

- 🗨️ Real-time chat with an AI assistant
- 🧠 AI-powered image generation
- 🧾 Easy-to-use UI with tabbed layout (Chat & Image)
- ⚡ Smooth animations and responsive design
- 🧩 Clean separation of UI and API logic

---

## 🧬 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) (React Framework)
- [Tailwind CSS](https://tailwindcss.com/) for UI styling

### Backend
- **Node.js + Express.js**
- **Hugging Face Inference API** (external model endpoints)

---

## 🤖 AI Models Used

1. **Chat Model**  
   - Model: [`mistralai/Mixtral-8x7B-Instruct-v0.1`](https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1)  
   - Hosted via: Hugging Face Inference Endpoint  
   - Usage: Handles all `/chat` interactions

2. **Image Generation Model**  
   - Model: [`stabilityai/stable-diffusion-2`](https://huggingface.co/stabilityai/stable-diffusion-2)  
   - Hosted via: Hugging Face Inference Endpoint  
   - Usage: Used for `/generate-image` requests

---
