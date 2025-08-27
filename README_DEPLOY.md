Deploying this Next.js static site to GitHub Pages

This project is a Next.js app configured for static export so it can be hosted on GitHub Pages.

Checklist
- [ ] Confirm repository is pushed to GitHub (e.g. https://github.com/<username>/portfolio)
- [ ] Decide if you will host at user/org level (https://<username>.github.io) or project level (https://<username>.github.io/<repo>)

Quick steps (project-level pages)
1. If you haven't already, create a repo on GitHub and push the current code to it (branch: main).
2. Optionally set `basePath` in `next.config.ts` to `'/<repo>'` (uncomment and replace `<repo>`).
3. Install dev dependency `gh-pages` locally:

   npm install --save-dev gh-pages

4. Build and export, then deploy (from project root):

   npm run predeploy
   npx gh-pages -d out

Or use the npm script added here:

   npm run deploy

Notes
- The static export will output files to the `out/` folder.
- If you host at `https://<username>.github.io`, do NOT set `basePath`.
- If something uses server-side features, `next export` may fail—this project appears to be using only static-friendly features, but if export errors occur, open an issue and I'll help modify code to be fully static.

Troubleshooting
- 404 on project site: ensure `basePath` is set correctly and that files were deployed to `gh-pages` branch.
- Build errors: run `npm run build` and inspect logs; if typescript or image-related errors block export, we can patch them.
