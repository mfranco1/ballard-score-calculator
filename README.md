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

## Production Build

```bash
npm run build
npm run preview
```
