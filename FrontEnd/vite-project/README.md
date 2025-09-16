## Persona AI Chatbot (React + Vite)

A responsive, mobile-friendly chatbot UI with multiple tech mentor personas, built with React and Vite.

### Features
- **Multiple personas**: Switch between mentors (Hitesh Choudhary, Piyush Garg)
- **Responsive UI**: Mobile-first layout, safe-area insets, dynamic viewport units
- **Smooth chat UX**: Auto-scroll, typing indicator, message bubbles, avatars
- **Accessible**: Keyboard send (Enter), ARIA labels, readable contrast
- **Modern stack**: React 19, Vite 7, `lucide-react` icons

### Tech Stack
- React 19, React DOM 19
- Vite 7 + `@vitejs/plugin-react`
- ESLint 9

### Prerequisites
- Node.js 18+ (Recommended: 20+)
- npm 9+

### Getting Started
1) Install dependencies
```bash
npm install
```
2) Run the dev server
```bash
npm run dev
```
3) Open the app (default)
```
http://localhost:5173
```

### Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build to `dist/`
- `npm run preview` – preview the built app locally
- `npm run lint` – run ESLint

### Build & Deploy
1) Build
```bash
npm run build
```
2) Deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, etc.).

### Configuration
- The chat endpoint is currently hard-coded in `src/Component/PersonaChatbot.jsx`:
```js
fetch("https://persona-ai-chattingbot.onrender.com/api/chat", { ... })
```
If you need a different backend, update that URL accordingly.

### Project Structure (key files)
```
src/
  Component/
    PersonaChatbot.jsx       # Main chat UI
    PersonaChatbot.css       # Styles (responsive/mobile tweaks included)
    TypingDots.jsx           # Typing indicator
    TypingDots.css
  main.jsx, App.jsx
index.html                   # Meta viewport with viewport-fit
```

### Usage Notes
- Press Enter to send, Shift+Enter for a new line.
- On mobile, the sidebar opens via the menu button; it slides over content.
- Textarea font-size is set to 16px to avoid iOS zoom on focus.

### Troubleshooting
- **API/CORS errors**: Ensure `https://persona-ai-chattingbot.onrender.com` is reachable. If using another API, verify CORS is enabled server-side.
- **Port in use**: Change Vite port, e.g. `npm run dev -- --port 5174`.
- **Blank screen**: Check console for errors; run `npm install` again and restart the dev server.

### License
This project is for educational/demo purposes. Add your preferred license if distributing.
