## School Data Finder – CharacterStrong

**Live Demo:** 
https://hmiryala1010.github.io/react-interview-exercise/
**Repository:** 
https://github.com/hmiryala1010/react-interview-exercise

---

## Project Overview

**School Data Finder** is a modern web application that enables educators to search U.S. school districts, view schools within each selected district, and explore their locations on an interactive Google Map. Users can filter schools by name, receive real-time alerts for invalid input or empty results, and interact with a clean, responsive interface built using React, TypeScript, Chakra UI, and Google Maps API. The app is designed for fast, intuitive exploration of national school data.


---

## Tech Stack

* **React 18 + TypeScript 5 + Vite** – fast development and modern build tooling
* **Chakra UI + Emotion + Sass** – styling with CharacterStrong-inspired theme
* **Framer Motion** – smooth component transitions
* **Google Maps API (@react-google-maps/api)** – displays schools on an interactive map
* **React Icons + Path Aliases** – icon support and clean import paths
* **GitHub Actions + Node 16** – automated CI/CD to GitHub Pages

---

## Project Structure

```
src/
├─ App.tsx
├─ favicon.webp  logo192.png  logo512.png
├─ main.tsx      vite-env.d.ts  index.scss
├─ components/
│  ├─ Header.tsx  Home.tsx
│  ├─ design/         → Card, Glob.tsx (with SCSS)
│  ├─ district/       → DistrictItem, DistrictList, index.ts
│  ├─ school/         → MapView, SchoolItem, SchoolList, index.ts
│  └─ search/         → SearchInput.tsx, index.ts
├─ theme/
│  ├─ index.ts
│  └─ override/       → Button.ts, Input.ts, index.ts
└─ utils/             → maps.ts, nces.ts
```

---

## Getting Started

```bash
npm install        # install dependencies
npm run dev        # start local server at http://localhost:3000
npm run build       # production build
npm run serve       # preview production
```

---

## Key Features

* **District search** with a center-aligned search bar
* **School list** displayed after selecting a district
* **Google Maps integration** showing school markers
* **District and school-level search filters**
* **Name-only validation**: invalid input (numbers/special characters) triggers an alert
* **Contextual alerts**: empty results, errors, and loading states
* **"More Details" buttons**: display full data for any district or school
* **Responsive layout** with keyboard-friendly navigation

---

## Design & Architectural Choices

* Used CharacterStrong’s **color palette and styling** for buttons and inputs
* Applied **two-panel layout** for better data visibility (districts left, schools right)
* Introduced **two-stage search** to reduce API calls and improve clarity
* Implemented pagination for district and school lists – 5 items per page for cleaner navigation
* Avoided Redux – **hook-based state** is sufficient for this app
* Secured the API key with `.env` and GitHub Secrets
* Enabled **automated CI/CD** with GitHub Actions

---

## Google Maps API Key

To integrate Google Maps securely:

* Revoked the original public key to prevent misuse
* Created a **new restricted API key** in Google Cloud Console

  * Restriction: **HTTP referrers** – limited to `localhost` and the deployed domain
  * API access: **Maps JavaScript API** only
* Saved the key in a `.env` file at the project root:

  ```env
  VITE_GOOGLE_MAPS_KEY=your-api-key
  ```

---

## Deployment (GitHub Pages + GitHub Actions)

I deployed the app using GitHub Pages with automated deployment through GitHub Actions:

* Added `.env` to `.gitignore` to keep the key private
* Used `import.meta.env.VITE_GOOGLE_MAPS_KEY` in `maps.ts` to load the key
* Added the key as a **GitHub Actions secret** (`VITE_GOOGLE_MAPS_KEY`) for deployment
* Updated the GitHub Actions workflow (`.github/workflows/push.yaml`) with:

  ```yaml
  env:
    VITE_GOOGLE_MAPS_KEY: ${{ secrets.VITE_GOOGLE_MAPS_KEY }}
  ```
* The workflow builds the app and deploys the `dist` folder to the `gh-pages` branch using `JamesIves/github-pages-deploy-action`
* Updated `vite.config.ts` to set the correct `base` path for deployment
* Enabled GitHub Pages from the `gh-pages` branch in repository settings

Now, every push to `main` automatically triggers a deployment.

---

## Extra Credit

* Enabled GitHub Pages + GitHub Actions deployment
* Implemented Google Maps integration to show school locations
* Designed a clean, responsive UI with animations
* Used Chakra UI and custom theming for a CharacterStrong-aligned look
* Added contextual alerts, “More Details” panels, and map-based views
* Explored additional NCES APIs for future enhancements (e.g., demographics, enrollment, funding data)



## Future Improvements

* Add search suggestion/autocomplete for district and school names to improve user experience and reduce invalid queries
* Implement **dark mode** toggle for UI flexibility
* Make the layout fully responsive across all devices for optimal usability on phones, tablets, and desktops

---
 