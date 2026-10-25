# BookNest 📚✨
### Independent Editorial Digital Bookstore

> **"Your next favorite story starts here."**

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Hosted%20Demo-black?logo=vercel)](https://booknest-bookstore.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20TypeScript%20%7C%20Vite%20%7C%20Tailwind-C9785B)](#-tech-stack)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

---

## 📖 Overview

**BookNest** is a complete, modern digital bookstore application built with React, TypeScript, and Tailwind CSS. 

Moving deliberately away from generic e-commerce templates, BookNest establishes an independent, tactile editorial brand inspired by boutique literary shops and fine book jacket design. It features a curated catalog of public-domain literary classics and foundational Philippine literature (*Noli Me Tángere*, *Florante at Laura*, *El Filibusterismo*, and more), complete with real-time multi-facet filtering, persistent cart and wishlist state, bounded inventory limits, and an interactive simulated checkout workflow.

---

## 🎨 Design Philosophy & Aesthetic Palette

BookNest is designed under the **Universal Frontend Design Constitution** with strict anti-slop rules, zero-pill metadata discipline, and display serif typography:

| Color Tone | Hex Code | Role in Interface |
| :--- | :--- | :--- |
| **Cream** | `#FFF9F1` | Primary warm canvas background |
| **Warm White** | `#FFFEFB` | Surface and card elevation background |
| **Terracotta** | `#C9785B` | Primary intent accent & call-to-action buttons |
| **Soft Peach** | `#F4D5C5` | Subtle highlights, badges, and card trims |
| **Dark Brown** | `#3A2A25` | High-contrast editorial typography and dark surfaces |
| **Sage Accent** | `#A9B79F` | Secondary natural accent & complimentary alerts |

- **Display Typography**: *Fraunces* (Warm editorial display serif)
- **Body Prose**: *Plus Jakarta Sans* (Clean, legible modern grotesque)
- **Data & Calculations**: *Space Mono* (Tabular numerals for accurate financial alignment)

---

## ⚡ Core Features

### 1. Curated Public-Domain & Philippine Literary Catalog
- 14 rich literary editions including works by Dr. José Rizal, Francisco Balagtas, Jane Austen, F. Scott Fitzgerald, Mary Shelley, and Marcus Aurelius.
- Accurate metadata: publication years, page counts, ISBNs, publishers, and verified sample excerpts for in-app reading.
- Tactile book jackets with realistic spine creases, paper texture overlays, and custom motifs.

### 2. Multi-Facet Search & Dynamic Filtering
- **Full-Text Search**: Instant search across titles, authors, synopses, and thematic tags.
- **Genre Navigation**: Instant filter by Philippine Literature, Classic Fiction, Mystery & Gothic, Poetry & Philosophy, Coming of Age, and Modernist Fiction.
- **Price Range Slider**: Filter between ₱350.00 and ₱600.00 in real time.
- **Stock Filter**: Toggle "In Stock Only" to filter out back-ordered editions.
- **Multi-Field Sorting**: Sort by Curator Picks, Price (Low to High / High to Low), Reader Rating, Title (A-Z / Z-A), and Publication Year.
- **Empty States**: Helpful zero-state suggestions with one-click reset.

### 3. Reactive Shopping Cart (Slide-Over Drawer)
- Modeled with integer **Philippine Centavos** (e.g. 52,000 centavos = ₱520.00) to prevent floating-point rounding errors.
- Quantity adjustment strictly bounded by live inventory stock.
- Free shipping progress bar (Complimentary shipping for orders over ₱1,500.00).
- Promo code engine with demo coupons:
  - `WELCOME10` (10% welcome discount)
  - `BOOKNEST15` (15% member discount)
  - `FREESHIP` (Complimentary shipping)
  - `LITERARY20` (20% literary collector discount)

### 4. Saved Editions (Wishlist)
- Heart toggle with reactive feedback.
- Dedicated Wishlist slide-over drawer.
- "Move to Bag" capability with stock verification.
- Synced with browser `localStorage`.

### 5. Detailed Book Reader Modal
- High-resolution tactile cover presentation.
- Complete publishing specifications.
- **Dual Tabs**: Editorial Synopsis & Parchment-Toned "Read Sample Excerpt" passage.
- Contextual related books strip.

### 6. Simulated Demo Checkout Flow
- Explicit demonstration store notices.
- Delivery address capture and courier speed selection (Standard vs. Priority Express).
- Simulated processing animation with unique reference code generation (`BN-PH-2026-XXXXX`).
- Print-friendly itemized receipt view and copyable order reference.

---

## 💻 Tech Stack

- **Framework**: React 19 (Functional components & hooks)
- **Language**: TypeScript (Strict typing for books, cart, and orders)
- **Build Tool**: Vite 8 (Lightning-fast HMR and optimized static build)
- **Styling**: Tailwind CSS v4 (Custom `@theme` tokens and book shadows)
- **Icons**: Lucide React
- **Storage**: Browser `localStorage` (Automatic hydration and persistence)

---

## 🚀 Getting Started & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/shixxcvb/booknest-bookstore.git

# 2. Enter the directory
cd booknest-bookstore

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

```bash
# Build optimized static bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 🗂️ Proposed Git Commit History

1. `feat: project initialization, vite config, tailwind theme, and types`
2. `feat: homepage layout, editorial hero banner, and brand navigation`
3. `feat: book catalog dataset with philippine classics and public domain titles`
4. `feat: multi-facet search, genre filters, price slider, and sorting logic`
5. `feat: interactive wishlist drawer, heart animations, and local storage`
6. `feat: shopping cart drawer, promo code engine, and centavos calculations`
7. `feat: simulated checkout modal, order confirmation, and receipt printer`
8. `refactor: store information modal, responsive mobile fixes, and documentation`

---

## 🌐 Deploying to Vercel

BookNest is architected as a static SPA with zero backend server dependencies, making it ideal for hosting on Vercel:

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete BookNest bookstore application"
   git push -u origin main
   ```
2. Log into [vercel.com](https://vercel.com) using your GitHub account.
3. Click **Add New...** &gt; **Project**.
4. Import your repository.
5. Vercel automatically detects the Vite framework preset:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Your application will be live in seconds!

---

## ⚠️ Store Notice

> **PLEASE NOTE:** BookNest is an interactive demonstration bookstore. 
> 
> No real payments are processed, no financial credentials or credit cards are collected, and no actual book deliveries are dispatched. All checkout flows, coupon codes, and order tracking numbers are local simulations.

---

## 👩‍💻 Author & Repository

- **Repository**: [shixxcvb/booknest-bookstore](https://github.com/shixxcvb/booknest-bookstore)  
- **Project**: BookNest Independent Digital Bookstore
