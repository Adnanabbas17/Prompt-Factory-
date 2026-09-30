# Prompt Factory

> Zero-cost, community-driven prompt marketplace — built with Next.js 14, React, TypeScript, and Tailwind CSS

**Live Demo**: Ready for Vercel deployment
**Status**: ✅ Complete and fully functional

## Features

✨ **Minimal, Aesthetic Design**
- Clean, distraction-free UI with generous whitespace
- Anthropic Sans font throughout
- No clutter, gradients, or heavy shadows
- Sharp modern cards (no rounded corners)

🔍 **Search & Discovery**
- Real-time search across title, description, and tags
- Debounced search (300ms)
- Filter by category (multi-select)
- Filter by difficulty level (single-select)
- Sort by recent, popular, or rating

🌙 **Dark Mode Support**
- Native dark mode with class-based toggle
- Equally elegant in both light and dark themes
- Persistent theme preference (localStorage)

📱 **Fully Responsive**
- Mobile-first design
- Breakpoints: mobile (0–640px), tablet (641–1024px), desktop (1025px+)
- No horizontal scroll

⚡ **Copy-to-Clipboard**
- Copy prompt text with one click
- Visual feedback ("Copied!" state)
- Works on both homepage and detail pages

🏠 **Individual Prompt Pages**
- Full prompt content with proper formatting
- Metadata display (author, category, difficulty, date)
- Usage statistics (rating, usage count)
- Related prompts from same category
- Shareable URLs for each prompt

✅ **Quality & Performance**
- TypeScript strict mode enabled (zero `any` types)
- WCAG AA accessibility standards
- No external API dependencies (purely static)
- Optimized bundle size (~99 KB First Load JS)
- Semantic HTML with ARIA labels

## Getting Started

### Prerequisites
- Node.js 18+ (recommended 20+)
- npm 10+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start

# Or deploy to Vercel (one-click)
```

## Project Structure

```
prompt-factory/
├── app/
│   ├── layout.tsx              # Root layout with Header & Footer
│   ├── page.tsx                # Homepage (search + filter)
│   ├── prompts/
│   │   └── [id]/page.tsx       # Prompt detail page
│   └── globals.css             # Global Tailwind + custom styles
├── components/
│   ├── Header.tsx              # Navigation & theme toggle
│   ├── Footer.tsx              # Links and attribution
│   ├── SearchBar.tsx           # Debounced search input
│   ├── FilterBar.tsx           # Category & difficulty filters
│   ├── PromptCard.tsx          # Individual prompt card
│   └── CopyButton.tsx          # Copy-to-clipboard button
├── lib/
│   ├── prompts.ts             # Utility functions (load, search, filter)
│   └── types.ts               # TypeScript interfaces
├── public/
│   └── data/
│       └── prompts.json       # Prompt database (static JSON)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── .eslintrc.js
```

## Key Technologies

| Tech | Purpose | Version |
|------|---------|---------|
| **Next.js 14** | React framework with App Router | 14.2+ |
| **React 18** | UI library | 18.3+ |
| **TypeScript** | Type safety | 5.4+ |
| **Tailwind CSS** | Utility-first styling | 3.4+ |
| **Anthropic Sans** | Brand font (CDN) | Latest |

## Data Schema

Prompts are stored in `/public/data/prompts.json`:

```json
{
  "prompts": [
    {
      "id": "unique-slug",
      "title": "Prompt Title",
      "description": "Short description",
      "category": "Writing|Coding|Analysis|Brainstorm|Teaching",
      "tags": ["tag1", "tag2"],
      "author": "Author Name",
      "content": "Full prompt text",
      "useCase": "Specific use case",
      "difficulty": "Beginner|Intermediate|Advanced",
      "createdAt": "2026-09-30",
      "rating": 4.5,
      "usageCount": 150
    }
  ]
}
```

## Design Specifications

### Color Palette

**Light Mode:**
- Background: `#FFFFFF`
- Surface: `#F9FAFB`
- Text Primary: `#111827`
- Text Secondary: `#6B7280`
- Accent: `#3B82F6`

**Dark Mode:**
- Background: `#0F172A`
- Surface: `#1E293B`
- Text Primary: `#F1F5F9`
- Text Secondary: `#94A3B8`
- Accent: `#60A5FA`

**Category Colors** (static):
- Writing: `#A78BFA` (Purple)
- Coding: `#34D399` (Green)
- Analysis: `#F97316` (Orange)
- Brainstorm: `#EC4899` (Pink)
- Teaching: `#06B6D4` (Teal)

### Typography

- **Font Family**: Anthropic Sans (CDN) + system fallback
- **Headings**: 500 weight, +0.3px letter-spacing
- **Body**: 15px, 1.5 line-height, 400 weight
- **Sizes**: H1 (32px), H2 (24px), H3 (20px), Body (15px)

### Spacing & Layout

- **Gap**: 20px mobile, 32px desktop
- **Container Max-Width**: 1120px
- **Padding**: 20px mobile, 40px desktop
- **Header Height**: 60px
- **Section Gaps**: 60px vertical

### Interactive States

- **Hover**: 10% opacity change + 1% scale (subtle)
- **Focus**: 2px outline ring (blue accent)
- **Transitions**: 150ms ease-in-out (smooth)
- **Animations**: Fade-in on hover (smooth)

## Component Features

### Header
- Logo and navigation links
- Dark mode toggle (icon-based)
- Sticky positioning
- Responsive hamburger on mobile
- Links to GitHub

### SearchBar
- Real-time search with 300ms debounce
- Keyboard shortcut: `Cmd/Ctrl + K` to focus
- Search across: title, description, tags
- Priority ranking (title > description > tags)

### FilterBar
- Multi-select categories (underline on selected)
- Single-select difficulty dropdown
- Sort options: recent, popular, rating
- "Reset filters" link (appears when active)
- Live updates (no apply button)

### PromptCard
- Title, description, metadata
- Hover effects (opacity + scale)
- Copy button on hover
- Click-through to detail page
- Fully keyboard accessible

### Detail Page
- Full prompt content with code formatting
- Complete metadata display
- Usage statistics (rating, usage count)
- Related prompts from same category
- Shareable URLs (`/prompts/[id]`)

## TypeScript & Strictness

✅ **TypeScript Strict Mode Enabled**
- No implicit `any` types
- Strict null checks
- All components fully typed
- No untyped imports

```bash
# Verify no type errors
npx tsc --noEmit
```

## Accessibility (WCAG AA)

✅ **Semantic HTML**
- Proper heading hierarchy
- `<nav>`, `<main>`, `<section>`, `<article>` tags
- Form labels and descriptions

✅ **Keyboard Navigation**
- Tab through all interactive elements
- Focus indicators visible (2px ring)
- Escape to close/deselect
- Enter/Space to activate

✅ **Color Contrast**
- WCAG AA compliant (4.5:1 min)
- Dark mode equally accessible
- No color-only information

✅ **ARIA Labels**
- Buttons: `aria-label` for icons
- Form inputs: `<label>` associations
- Skip links (if needed)

## Performance

📊 **Build Metrics**
- First Load JS: ~99 KB (gzipped)
- Route sizes: ~3 KB (app pages)
- No external API calls (fully static)
- Build time: ~15 seconds
- SEO-friendly (meta tags, semantic HTML)

🚀 **Optimizations**
- Next.js Image optimization (if images added)
- Automatic code splitting per route
- CSS minification + tree-shaking
- Lazy loading for dynamic routes
- Theme persistence (localStorage)

## Adding New Prompts

1. Edit `/public/data/prompts.json`
2. Add new object to `prompts` array with required fields
3. Restart dev server (if running)
4. New prompts appear immediately

**Required Fields:**
- `id` (unique slug, URL-safe)
- `title`, `description`, `category`
- `content`, `useCase`
- `author`, `difficulty`
- `tags`, `createdAt`, `rating`, `usageCount`

## Deployment

### Vercel (Recommended)

```bash
# Deploy directly from GitHub
vercel deploy
```

**Features:**
- One-click deployment from GitHub
- Auto-deploys on push to `main`
- Automatic SSL/HTTPS
- Global CDN
- Free tier available

### Manual Build

```bash
npm run build
npm run start
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Contributing

The project is ready for community contributions:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/new-feature`
3. Make changes and test locally
4. Commit with clear messages
5. Push to branch and create PR

**Guidelines:**
- Add TypeScript types for all code
- Follow existing code style (Prettier-ready)
- Test responsive design (mobile, tablet, desktop)
- Ensure dark mode works
- Keep components minimal and focused
- No external dependencies without discussion

## License

MIT License — feel free to fork, modify, and use.

## Support

For issues, suggestions, or questions:
- GitHub Issues: [Prompt Factory Issues](https://github.com/adnanabbas17/prompt-factory-)
- GitHub Discussions (when enabled)

---

**Built with ❤️ using Next.js 14, React, and Tailwind CSS**

Last updated: 2026-09-30
