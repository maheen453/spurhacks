# 🧠 Brainrot Translator

A chaotic AI-powered React app that converts plain text into Gen Z slang using the Gemini API. It features a humorous, over-the-top translation model built with FastAPI on the backend and a responsive frontend using React and Tailwind CSS.

---

## ✨ Features

- 🔄 Translate boring text into Gen Z chaos using AI
- 🧑‍💻 Backend powered by FastAPI + Gemini
- 🎨 Sleek and responsive UI with Tailwind
- ⚡ Translate with Ctrl + Enter
- 🖼️ Gemini image description endpoint (optional)
- 🔥 Uses absurd, meme-fueled slang instructions

---

## 🧰 Technologies Used

### Frontend:
- React (Vite)
- Tailwind CSS
- React Icons

### Backend:
- Python
- FastAPI
- Uvicorn
- Gemini API (Google Generative Language API)
- `requests`, `dotenv`, `pydantic`, `base64`

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/brainrot-translator.git
cd brainrot-translator
```

### 2. Set up and run the React app
```bash
cd frontend
npm install
npm run dev

```
Make sure your React app runs on http://localhost:5173

### 3. Set up and run the Python backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Create a .env file in the backend folder with your Gemini API key:
```
GEMINI_API_KEY=your_google_gemini_api_key_here
```
### 5. Run the Server
``` bash
python main.py
```
Backend will run at http://localhost:8000

# 🎉 You're ready to go!
Open your browser to the React app

Type your boring text into the input box

Hit Ctrl + Enter or click the ➡️ button

Laugh at the Gen Zified translation 🤪
