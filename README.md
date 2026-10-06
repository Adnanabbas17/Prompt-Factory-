# Prompt Factory

> Zero-cost, community-driven prompt marketplace — built with Next.js 14, React, TypeScript, and Tailwind CSS

**Live Demo**: Ready for Vercel deployment
**Status**: ✅ Complete and fully functional

## Features

✨ **Minimal, Aesthetic Design**
- Clean, distraction-free UI with generous whitespace
- Serif headings (Georgia/Garamond) with a Segoe UI body, no external fonts
- No clutter or gradients, only soft shadows
- Sharp modern cards (no rounded corners)

🔍 **Search & Discovery**
- Real-time search across title, description, tags, and prompt text
- Debounced search (300ms)
- Filter by category (multi-select)
- Filter by difficulty level (single-select)
- Prompts are listed in library order

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
- Metadata display (source, category, difficulty, date)
- Source, license, and a link to the source repository
- Prompt text shown exactly as written (never rendered as markdown)
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
│   ├── licenses/page.tsx       # Sources and license texts
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
│   ├── constants.ts           # Categories (single source of truth) and colors
│   └── types.ts               # TypeScript interfaces
├── scripts/
│   ├── build-prompts.py       # .docx -> public/data/prompts.json
│   ├── validate-prompts.py    # Checks the JSON against the .docx
│   └── prompt-metadata.json   # description, useCase, tags per prompt id
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

## Data Schema

Prompts are stored in `/public/data/prompts.json` (154 curated prompts, generated from the curated `.docx`, see [Updating the Prompt Library](#updating-the-prompt-library)):

```json
{
  "prompts": [
    {
      "id": "unique-slug",
      "title": "Prompt Title",
      "description": "Short description (max 140 chars)",
      "category": "One of the 11 names in lib/constants.ts",
      "tags": ["tag1", "tag2"],
      "author": "Source name",
      "source": "Source name",
      "license": "CC0-1.0|MIT",
      "sourceUrl": "https://github.com/...",
      "content": "Full prompt text, verbatim",
      "useCase": "When to use it (max 80 chars)",
      "difficulty": "Beginner|Intermediate|Advanced",
      "variables": ["name"],
      "createdAt": "2026-10-06"
    }
  ]
}
```

`rating` and `usageCount` are optional and not present in the curated library. The UI hides them when absent.

## Design Specifications

### Color Palette

**Light Mode:**
- Background: `#FFFAF5`
- Surface: `#F9F5F0`
- Text Primary: `#3D3D3D`
- Text Secondary: `#6B6B5F`
- Accent (borders, icons): `#C4956F`
- Link / button (WCAG AA text): `#8F613C`

**Dark Mode:**
- Background: `#1A1815`
- Surface: `#2A2520`
- Text Primary: `#F5F0EB`
- Text Secondary: `#A89F94`
- Accent: `#D4A574`

**Category colors** live in `lib/constants.ts` (darker shades in light mode for contrast).

### Typography

- **Headings**: Georgia / Garamond serif, light weight, +0.5px letter-spacing
- **Body**: Segoe UI / system sans, 16px, 1.6 line-height
- **Sizes**: H1 48-60px, H2 36px, H3 24px, Body 16px

### Spacing & Layout

- **Container Max-Width**: 1280px (`max-w-7xl`), detail page 896px
- **Padding**: 24px mobile, 40px desktop
- **Header Height**: 64px
- **Section Gaps**: generous (48-96px)

### Interactive States

- **Hover**: subtle opacity change, copy button revealed on hover, focus, and always on touch
- **Focus**: 1px gold outline (`:focus-visible`)
- **Transitions**: 200ms ease-in-out, disabled for `prefers-reduced-motion`

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
- Search across: title, description, tags, prompt text
- Priority ranking (title > description > tags)

### FilterBar
- Multi-select categories (underline on selected)
- Single-select difficulty dropdown
- "Reset filters" link (appears when active)
- Live updates (no apply button)

### PromptCard
- Title, description, metadata
- Hover effects (opacity + scale)
- Copy button on hover
- Click-through to detail page
- Fully keyboard accessible

### Detail Page
- Full prompt content, whitespace preserved, shown exactly as written
- Complete metadata display, including source, license, and a link to the source repository
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

## Updating the Prompt Library

The library is generated from `Curated-Prompt-Library.docx` (not stored in this repo). Python 3 only, no packages to install.

```bash
python3 scripts/build-prompts.py path/to/Curated-Prompt-Library.docx
python3 scripts/validate-prompts.py path/to/Curated-Prompt-Library.docx
```

- Prompt text is extracted as raw paragraph text, never converted through markdown, so literal `#`, `**`, backticks and backslashes stay as written.
- `description`, `useCase` and `tags` are kept in `scripts/prompt-metadata.json`, keyed by prompt `id`. The build stops if a prompt has no entry or an entry has no prompt.
- `difficulty` is rule-based: Advanced if content is over 2000 characters or there are 3+ variables; Beginner if there are no variables and content is under 600 characters; otherwise Intermediate.
- Categories live in `lib/constants.ts`. The validator checks that list against the data.
- `validate-prompts.py` expects the current library (154 prompts, 11 categories; the docx has 157 and `EXCLUDE` in `build-prompts.py` leaves out 3). If the library changes on purpose, update the expected numbers at the top of that script.

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
