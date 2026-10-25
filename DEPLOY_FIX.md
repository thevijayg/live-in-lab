# AGRINOVA — Vercel Deployment Fix

## Root Cause
Vercel pulls from GitHub. The `src/`, `index.html`, `vite.config.js` files exist locally 
but were never committed to git (git isn't installed). GitHub still has the old `frontend/` 
subfolder structure, so Vercel can't find `/src/main.jsx`.

---

## Fix Option A — Change Vercel Root Directory (Fastest)

1. Go to https://vercel.com/dashboard
2. Click your AGRINOVA project
3. Go to Settings → General
4. Under "Build & Development Settings", find **Root Directory**
5. Set it to: `frontend`
6. Click Save
7. Go to Deployments → Redeploy

Done! Vercel will now build from the `frontend/` folder which has everything committed.

---

## Fix Option B — Push Root Structure via GitHub Web UI

If you want the root-level structure (cleaner), do this via GitHub's web interface:

1. Go to your GitHub repo
2. Upload these files one by one (or drag-and-drop the folder):
   - `index.html`
   - `vite.config.js`
   - `tailwind.config.js`
   - `postcss.config.js`
   - `package.json`
   - `vercel.json`
   - `src/` folder (all contents)
   - `public/` folder

---

## Fix Option C — Install Git and Push (Recommended Long-Term)

1. Download and install Git: https://git-scm.com/download/win
2. Open a terminal in c:\Users\Admin\Desktop\pdl
3. Run:
   ```
   git init
   git add .
   git commit -m "Add root-level Vite structure for Vercel"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -f origin main
   ```

---

## Vercel Settings After Fix

- Framework Preset: Vite
- Build Command: npm run build
- Output Directory: dist
- Root Directory: (empty if using Option C, or `frontend` for Option A)
- Install Command: npm install

## SPA Routing
The `vercel.json` at the root (and `frontend/vercel.json`) both contain:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
This ensures React Router works on Vercel.

## Demo Credentials
- Farmer: murugan@agrinova.demo / agrinova2026
- FPO Admin: fpo.director@sahyadri.demo / agrinova2026  
- Field Officer: officer.tn@agrinova.demo / agrinova2026
- Admin: admin@agrinova.org / agrinova2026
