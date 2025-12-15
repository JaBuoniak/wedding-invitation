---
description: Build and Deployment Guide
---

# Build and Deployment Guide

This guide describes how to build the application for production and deploy it.

## 1. Local Build

To verify that the application builds correctly without errors:

```bash
// turbo
npm run build
```

This will create a `dist` folder containing the optimized production files (HTML, CSS, JS, images).

## 2. Preview Production Build

To test the built application locally before deploying:

```bash
// turbo
npm run preview
```

Open the link shown (usually http://localhost:4173) to verify everything looks correct.

## 3. Deployment Options

### Option A: Vercel (Recommended)
1. Create an account on [Vercel](https://vercel.com).
2. Install Vercel CLI: `npm i -g vercel` (optional, can also use UI).
3. Connect your GitHub repository to Vercel.
4. Vercel automatically detects Vite and sets up the build settings (`npm run build`, output `dist`).
5. Your site will be live at `https://your-project-name.vercel.app`.

### Option B: Netlify
Similar to Vercel, just drag and drop the `dist` folder into the Netlify "Drop" zone, or connect your Git repository.

### Option C: Manual Hosting (FTP/cPanel)
1. Run `npm run build`.
2. Upload the contents of the `dist` folder to the `public_html` (or equivalent) folder on your server using an FTP client (like FileZilla).
3. Ensure your server is configured to serve `index.html` for client-side routing (SPAs), though for a simple invitation heavily reliant on URL slugs, basic configuration usually works if checking `index.html`.
