# Quick Start Guide

## ✅ Project Status: Complete & Ready

The **Prompt Factory** is fully built and production-ready with all features implemented.

## 🚀 Run Locally (3 Steps)

```bash
# 1. Install dependencies (one-time)
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# → http://localhost:3000
```

**That's it!** ✨

## 📦 Build for Production

```bash
npm run build
npm run start
```

Or deploy directly to **Vercel** for free:
1. Push to GitHub
2. Connect repo to Vercel
3. Deploy (auto-deploys on push)

## ✨ Features Included

### Homepage (`/`)
- ✅ Search prompts by title, description, tags (real-time, debounced)
- ✅ Filter by category (Writing, Coding, Analysis, Brainstorm, Teaching)
- ✅ Filter by difficulty (Beginner, Intermediate, Advanced)
- ✅ Sort by recent, popular, or rating
- ✅ Reset filters link (appears when filters active)
- ✅ Display count: "Showing X of Y prompts"

### Prompt Details (`/prompts/[id]`)
- ✅ Full prompt content with code formatting
- ✅ Complete metadata (author, category, difficulty, created date)
- ✅ Usage stats (rating, usage count)
- ✅ Related prompts from same category (3 prompts)
- ✅ Shareable URLs for each prompt
- ✅ Back link to homepage

### Universal Features
- ✅ **Copy-to-clipboard** button with "Copied!" feedback (2 sec)
- ✅ **Dark mode toggle** (persists in localStorage)
- ✅ **Mobile responsive** (mobile, tablet, desktop)
- ✅ **Keyboard accessible** (Tab, Enter, Escape, Cmd+K)
- ✅ **Serif headings + system sans body** (no external fonts)
- ✅ **Minimal aesthetic** (generous whitespace, no clutter)

## 📁 Project Structure

```
prompt-factory/
├── app/
│   ├── page.tsx                 # Homepage (search + filter)
│   ├── layout.tsx              # Root layout with Header/Footer
│   ├── prompts/[id]/page.tsx   # Detail page
│   └── globals.css             # Global styles + Tailwind
├── components/                 # UI components (6 files)
│   ├── Header.tsx              # Nav + theme toggle
│   ├── SearchBar.tsx           # Debounced search
│   ├── FilterBar.tsx           # Category & difficulty
│   ├── PromptCard.tsx          # Prompt card component
│   ├── CopyButton.tsx          # Copy to clipboard
│   └── Footer.tsx              # Footer with links
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   └── prompts.ts              # Utility functions
├── public/data/
│   └── prompts.json            # 5 sample prompts (ready to expand)
└── [configs]
    ├── next.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    └── postcss.config.mjs
```

## 🎨 Design Highlights

- **Zero external APIs** — purely static JSON + client-side
- **No backend required** — ready to host anywhere
- **TypeScript strict mode** — fully typed, zero `any`
- **Dark mode native** — equally elegant light & dark
- **Accessible (WCAG AA)** — keyboard nav, color contrast
- **Responsive first** — mobile → tablet → desktop
- **Performance optimized** — ~99 KB First Load JS

## 📝 Customization

### Add New Prompts
Edit `/public/data/prompts.json` and add to the array:

```json
{
  "id": "my-prompt",
  "title": "My Custom Prompt",
  "description": "What this prompt does",
  "category": "Coding",
  "tags": ["tag1", "tag2"],
  "author": "Your Name",
  "content": "Full prompt text here...",
  "useCase": "When to use this",
  "difficulty": "Intermediate",
  "createdAt": "2026-09-30",
  "rating": 4.5,
  "usageCount": 100
}
```

### Change Colors
Edit `tailwind.config.js`:
- Light/dark color palettes
- Category colors
- Accent colors

### Modify Theme
Edit `tailwind.config.js` (colors, fonts) and `app/globals.css` (base styles):
- Font families (`tailwind.config.js`)
- Spacing values
- Typography scales

## 🔧 Tech Stack

- **Next.js 14** — React framework
- **React 18** — UI library
- **TypeScript** — Type safety
- **Tailwind CSS 3.4** — Utility styling

## 📊 Build Output

```
Route (app)                    Size     First Load JS
┌ ○ /                         3.2 kB   99.2 kB
├ ○ /_not-found               873 B    88.1 kB
└ ƒ /prompts/[id]             2.67 kB  98.7 kB
```

✅ Static homepage (prerendered)
✅ Dynamic detail pages (server-rendered)
✅ Fully optimized

## ✅ Quality Checklist

- ✅ TypeScript strict mode (zero errors)
- ✅ WCAG AA accessible
- ✅ Responsive mobile-first
- ✅ Dark mode support
- ✅ No console errors/warnings
- ✅ Semantic HTML
- ✅ Keyboard accessible
- ✅ Copy-to-clipboard working
- ✅ Theme persistence (localStorage)
- ✅ All images optimized (if any)

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow prompts)
vercel

# Or connect GitHub repo in Vercel dashboard
```

**That's it!** Your site is live with auto-deploys on every push.

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Build fails?**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Dark mode not working?**
Check browser console for errors. Clear localStorage:
```bash
localStorage.clear()
```

## 📚 Further Reading

- [README.md](./README.md) — Full documentation
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Next.js 14 Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Ready to ship!** 🚀

Push to GitHub → Deploy to Vercel → Share with the world.
