# AWS SAA-C03 Cert Prep

Ứng dụng học và luyện thi chứng chỉ **AWS Solutions Architect Associate (SAA-C03)** — chạy hoàn toàn trên trình duyệt, không cần backend.

**Live:** https://minhthuy98nbk.github.io/saa-study/

---

## Tính năng

- Bài học tiếng Anh, bấm **Song ngữ** để hiện bản dịch tiếng Việt
- Click vào từ bất kỳ để dịch sang tiếng Việt (MyMemory API)
- Bài tập trắc nghiệm theo từng bài, xem lại kết quả lần làm gần nhất
- Nộp bài sớm — câu chưa trả lời tính là sai
- Chapter Test (20 câu) và SAA Mock Exam (65 câu)
- Lưu tiến độ vào `localStorage`, không mất khi reload

---

## Chạy local

**Yêu cầu:** Node.js 18+

```bash
git clone https://github.com/minhthuy98nbk/saa-study.git
cd saa-study
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

---

## Deploy lên GitHub Pages

Mỗi lần push lên nhánh `main`, GitHub Actions tự động build và deploy.

**Cấu hình lần đầu** (chỉ làm 1 lần):

1. Vào **Settings → Pages**
2. Source → **Deploy from a branch**
3. Branch → **`gh-pages`** → folder **`/ (root)`** → Save

Sau khoảng 1–2 phút, web live tại `https://minhthuy98nbk.github.io/saa-study/`

---

## Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS v3
- React Router v6 (HashRouter)
- Lucide React
