# Saint Roman — Fashion Portfolio Web Application

A responsive web application for the **Saint Roman** haute couture and intimate apparel portfolio, built with **React**, **Vite**, and **Tailwind CSS**.

---

## 🛠️ Step 1: Asset Extraction Utility

The extraction script [`scripts/extract_slides.py`](file:///home/mithil/Downloads/saint-roman/scripts/extract_slides.py) extracts the 5 high-resolution presentation pages from `Saint Roman web.pdf` and outputs them into [`src/assets/`](file:///home/mithil/Downloads/saint-roman/src/assets/):

```bash
# Run the extraction utility
python3 scripts/extract_slides.py
```

### Extracted Slide Mappings:
| PDF Page | Extracted File | Route | Collection Category |
|:---:|:---|:---|:---|
| **Page 1** | `src/assets/slide-1.png` | `/everyday-basics` | Everyday ergonomic T-shirt bra & seamless brief set |
| **Page 2** | `src/assets/slide-2.png` | `/activewear` | High-impact activewear |
| **Page 3** | `src/assets/slide-3.png` | `/loungewear` | Luxury lounge & nightwear |
| **Page 4** | `src/assets/slide-4.png` | `/full-coverage` | Full-coverage & support bra (engineered for larger bust size) |
| **Page 5** | `src/assets/slide-5.png` | `/multiway-styling` | Multiway solution for modern outerwear styling |

---

## 🧭 Step 2: Routing & Structure

Configured with **React Router v7** and a modern sticky navigation bar linking directly to all 5 category routes:

- [`/everyday-basics`](http://localhost:5173/everyday-basics) — Everyday ergonomic T-shirt bra & seamless brief set (Map to Page 1 / `slide-1.png`)
- [`/activewear`](http://localhost:5173/activewear) — High-impact activewear (Map to Page 2 / `slide-2.png`)
- [`/loungewear`](http://localhost:5173/loungewear) — Luxury lounge & nightwear (Map to Page 3 / `slide-3.png`)
- [`/full-coverage`](http://localhost:5173/full-coverage) — Full-coverage & support bra (Map to Page 4 / `slide-4.png`)
- [`/multiway-styling`](http://localhost:5173/multiway-styling) — Multiway solution for modern outerwear styling (Map to Page 5 / `slide-5.png`)

Visiting `/` automatically defaults and redirects to `/everyday-basics`.

---

## 💎 Step 3: UI & Design Aesthetics

- **Prominent Slide Display**: The primary image container applies `w-full h-auto max-w-5xl mx-auto shadow-lg`, ensuring slides are responsive, legible, and scale smoothly across mobile, tablet, and desktop views.
- **Interactive Lightbox & Zoom**: Fullscreen mode allowing 75% to 250% zoom inspection for technical callouts, seam numbers, and fabric GSM specifications.
- **Color Palette & Specs Drawer**: Interactive color swatches with hex tooltips, fabric details, and design philosophy notes on each page.
- **Sticky Navigation**: Glassmorphic header with active pill indicators and mobile-responsive drawer.
- **Luxury Fashion Typography**: Google Fonts (*Cormorant Garamond*, *Cinzel*, and *Plus Jakarta Sans*) with warm cream and deep burgundy accents.

---

## 🚀 Running the App

```bash
# 1. Start development server
npm run dev

# 2. Build for production
npm run build
```

Dev server is running live at: [http://localhost:5173/](http://localhost:5173/)
