# JeffrinSam.github.io

Personal portfolio site for Jeffrin Sam — robotics AI researcher (embodied AI, VLA, world models).

Built with React + TypeScript + Vite, Tailwind CSS, and Framer Motion. Deployed automatically to GitHub Pages via GitHub Actions on every push to `main`.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Editing content

All page content lives in `src/data/`:

- `profile.ts` — name, bio, social links
- `experience.ts` — work history and education
- `projects.ts` — featured project cards
- `publications.ts` — papers
- `skills.ts` — skills, certificates, coursework

Replace `public/resume.pdf` to update the downloadable resume.

## Deployment

On push to `main`, `.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub Pages. In the repo settings, under **Pages**, set the source to **GitHub Actions** (one-time setup).
