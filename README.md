# AWS SAA-C03 Cert Prep

A browser-based study app for the **AWS Solutions Architect Associate (SAA-C03)** exam — no backend required.

**Live:** https://minhthuy98nbk.github.io/saa-study/

---

## Features

- Lessons in English with a **bilingual toggle** to show Vietnamese translations
- Click any word to translate it to Vietnamese (MyMemory API)
- Per-lesson quizzes with last attempt history
- Submit early — unanswered questions count as wrong
- Chapter Test (20 questions) and SAA Mock Exam (65 questions)
- Progress saved to `localStorage`

---

## Local setup

**Requires:** Node.js 18+

```bash
git clone https://github.com/minhthuy98nbk/saa-study.git
cd saa-study
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS v3
- React Router v6 (HashRouter)
- Lucide React
