
# Chatbot App 🤖

This is a chatbot web app built with **React** (frontend) and **.NET API** (backend). It allows users to send messages, receive responses from AI models, and use voice input.

---

## 🚀 Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: .NET Core Web API
- **AI API**: [OpenRouter](https://openrouter.ai)

---

## 📦 How to Run the App

### 1. Clone the repository

```bash
git clone https://github.com/Bina28/ChatBot.git
cd your-rep
```
### 2. Set up your API Key and Model (Required!)
Go to https://openrouter.ai/settings/key


Create your own API key.

Choose a model, for example deepseek-r1:free.

Open the appsettings.json file in the backend project and set:

```
{
  "ApiKey": "YOUR_API_KEY_HERE",
  "Model": "deepseek/deepseek-r1:free"
}
```
#### ⚠️ Note about free version:

The free models (like deepseek-r1:free) can sometimes be slow to respond. You may have to wait longer for replies.

In some cases, if you wait too long for a response, the API might return an error (timeout or failed request). This is normal for free-tier usage.

Consider trying at different times or using a paid key for faster and more stable responses.

### 3. Change localhost URLs (Frontend & Backend)
Make sure to adjust the URLs in both frontend and backend so they match your local setup:

In frontend code, find the API fetch URL in Chat.jsx file and update:

```
await fetch("https://localhost:7251/api/chat")
```
In backend (launchSettings.json), check that your API is running on the correct port (e.g., https://localhost:7251).

### 4. Run the Backend (.NET API)
```
cd backend-folder
dotnet run
```
### 5. Run the Frontend (React)
```bash
cd frontend-folder
npm install
npm start
```

## ✅ Features
Send and receive AI messages

Voice input with Speech Recognition

Text-to-speech bot responses

Smooth scrolling chat window

## 🌐 Note
This app uses OpenRouter API — you must provide your own API key.

Make sure both frontend and backend run on matching localhost ports.

## 💡 Future Improvements
Authentication

Persistent chat history

More models support