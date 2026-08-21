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

## Robot playground

The dancing G1 background (`src/components/RobotBackground.tsx`) loads `public/robot/g1.glb` and animates joints using `src/data/robotJoints.ts`. To regenerate the model from the source URDF, run `scripts/urdf-to-glb.py` (paths to the URDF are hardcoded at the top), then re-encode with `npx gltf-transform weld` + `npx gltf-transform draco`. The draco decoder lives in `public/draco/`.

## Deployment

On push to `main`, `.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub Pages. In the repo settings, under **Pages**, set the source to **GitHub Actions** (one-time setup).
