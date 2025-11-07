# Ballard Score Calculator

![Screenshot of the Ballard Score Calculator](./ballard-score.jpeg)

An interactive React + Vite application for estimating neonatal gestational age using the Ballard Score. Clinicians and trainees can quickly document neuromuscular and physical maturity findings, see subtotal updates, and translate the total score into an estimated gestational age, measured in weeks.

## Features

- Guided scoring for neuromuscular and physical maturity domains with contextual tooltips
- Sex-specific genital criteria that adapt the physical maturity assessment
- Automatic gestational age interpolation with clear subtotals and copy-ready summaries
- Clean, responsive layout designed for bedside or desktop use

## Clinical Reference

Scoring guidance aligns with the New Ballard Score framework for gestational age assessment as described by [MSD Manuals Professional Edition - Gestational Age](https://www.msdmanuals.com/professional/pediatrics/perinatal-problems/gestational-age).

## Getting Started

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

### Setting up Google Analytics (Optional)

1. Create a Google Analytics 4 property and get your Measurement ID (format: `G-XXXXXXXXXX`)
2. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
3. Add your Google Analytics Measurement ID to the `.env` file:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
4. Restart your development server

The app will automatically track:
- Page views
- Score selections
- Gender changes
- Calculation completions
- Result copies
- Reset actions

## Production Build

```bash
npm run build
npm run preview
```

## Deploying to GitHub Pages

- Push the project to a GitHub repository and ensure the default branch is `main`.
- Open the repository in GitHub and enable Pages under **Settings → Pages**, selecting **GitHub Actions** as the source.
- The included workflow will build on every push to `main` and publish the static `dist` output automatically.
- By default the workflow sets `VITE_APP_BASE_PATH` to `/${repository-name}/`; adjust by defining a different value in the workflow or repository/environment secrets if you are deploying to a custom domain or user/organization site.

### Adding Google Analytics in Production

To enable Google Analytics in your production deployment:

1. Go to your repository's **Settings → Secrets and variables → Actions**
2. Add a new repository secret named `VITE_GA_MEASUREMENT_ID` with your Google Analytics Measurement ID as the value
3. Update the GitHub Actions workflow to use this secret (see the workflow file for details)
