# Saint Roman — Fashion Portfolio Web Application

A responsive web application for the **Saint Roman** haute couture and intimate apparel portfolio, built with **React**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Application Architecture

The application is structured into two complementary portfolio presentations:

### 1. **Part B — 10-Page Continuous Portfolio** (`/part-b`)
A seamless, vertically scrollable single-column presentation of 10 collection pages (filtered from `slide-14.png` through `slide-23.png`, re-indexed as Page 1 through Page 10).
- **Sequential Array-Map**: Slides re-indexed as Page 1 to 10 rendered top to bottom with responsive Tailwind styling (`max-w-5xl mx-auto py-10`).
- **High-Performance Lazy Loading**: Every image uses `loading="lazy"` and `decoding="async"` for fast initial page load and smooth scrolling.
- **Navigation Utilities**: Live scroll progress bar, direct "Jump to Slide" selector (1–10), and floating "Back to Top" button.

### 2. **Part A — 5 Technical Collections** (Dedicated Routed Pages)
1. **`/everyday-basics`** — Everyday ergonomic T-shirt bra & seamless brief set *(Maps to Page 1 / `slide-1.png`)*
2. **`/activewear`** — High-impact activewear *(Maps to Page 2 / `slide-2.png`)*
3. **`/loungewear`** — Luxury lounge & nightwear *(Maps to Page 3 / `slide-3.png`)*
4. **`/full-coverage`** — Full-coverage & support bra (engineered for larger bust size) *(Maps to Page 4 / `slide-4.png`)*
5. **`/multiway-styling`** — Multiway solution for modern outerwear styling *(Maps to Page 5 / `slide-5.png`)*

---

## 🛠️ Extraction Utility Scripts

Both extraction scripts run automatically and produce high-resolution assets:

```bash
# Extract Part A 5 slides from 'Saint Roman web.pdf' -> src/assets/slide-1.png to slide-5.png
python3 scripts/extract_slides.py

# Extract Part B 23 slides from 'part b.pdf' -> src/assets/part-b/slide-1.png to slide-23.png
python3 scripts/extract_part_b.py
```

### Assets Directory Layout:
```
src/assets/
├── part-b/                         # 23 Continuous Slides for Part B
│   ├── slide-1.png ... slide-23.png
│
├── slide-1.png ... slide-5.png    # 5 Extracted Slides for Part A
└── [category-folders]/             # Sliced category assets
```

---

## 🧭 Sticky Navigation Bar

The main navigation bar features:
- **Top Micro-Bar**: Segmented toggle to switch between **Part A (5 Sets)** and **Part B (23 Slides)**.
- **Main Nav Bar**:
  - Direct links to the 5 Part A sub-categories: `Everyday Basics`, `Activewear`, `Loungewear`, `Full-Coverage`, `Multiway Styling`.
  - A prominent, top-level link for **Part B** with indicator badges.
- **Mobile Responsive Drawer**: Touch-friendly drawer with prominent Part B button and sub-categories.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Production build validation
npm run build
```

Dev server is running live at: [http://localhost:5173/](http://localhost:5173/)
- Continuous Part B Scroll: [http://localhost:5173/part-b](http://localhost:5173/part-b)
- Everyday Basics: [http://localhost:5173/everyday-basics](http://localhost:5173/everyday-basics)
