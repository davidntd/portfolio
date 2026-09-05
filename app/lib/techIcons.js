// Shared tech → icon mapping. Icons come from the real brand CDNs (devicon +
// simple-icons) instead of hand-drawn local SVGs, and are keyed by display
// name so both the project chips and the Tech Stack section resolve the same
// icon from the same source.
//
//   devicon:      https://cdn.jsdelivr.net/gh/devicons/devicon/icons/<name>/<name>-<variant>.svg
//   simple-icons: https://cdn.simpleicons.org/<slug>/<color>
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const SIMPLE = (slug) => `https://cdn.simpleicons.org/${slug}/white`;
const d = (name, variant = "original") => `${DEVICON}/${name}/${name}-${variant}.svg`;

export const TECH_ICONS = {
  // Languages
  C: d("c"),
  "C++": d("cplusplus"),
  "C#": d("csharp"),
  Java: d("java"),
  Python: d("python"),
  HTML: d("html5"),
  CSS: d("css3"),
  JavaScript: d("javascript"),
  TypeScript: d("typescript"),
  Go: d("go"),
  Rust: d("rust"),
  Ruby: d("ruby"),
  PHP: d("php"),
  Swift: d("swift"),
  Kotlin: d("kotlin"),
  Dart: d("dart"),
  Shell: d("bash"),
  Vue: d("vuejs"),
  Svelte: d("svelte"),

  // Data stores
  PostgreSQL: d("postgresql"),
  MySQL: d("mysql"),
  MongoDB: d("mongodb"),
  SQLite: d("sqlite"),
  SQLAlchemy: d("sqlalchemy"),

  // Frameworks & libraries
  React: d("react"),
  "Next.js": d("nextjs"),
  "Node.js": d("nodejs"),
  Angular: d("angular"),
  Express: d("express"),
  NestJS: d("nestjs"),
  Django: d("django", "plain"),
  Flask: d("flask"),
  FastAPI: d("fastapi"),
  Supabase: d("supabase"),
  Firebase: d("firebase"),
  Prisma: d("prisma"),
  Tailwind: d("tailwindcss"),
  Electron: d("electron"),
  Tauri: d("tauri"),
  Vite: d("vite"),
  Webpack: d("webpack"),
  "Three.js": d("threejs"),
  Redux: d("redux"),
  Sass: d("sass"),
  GraphQL: d("graphql", "plain"),
  Sequelize: d("sequelize"),
  Fastify: SIMPLE("fastify"),
  Mongoose: SIMPLE("mongoose"),
  Axios: SIMPLE("axios"),
  "Socket.IO": SIMPLE("socketdotio"),
  "styled-components": SIMPLE("styledcomponents"),
  "React Router": SIMPLE("reactrouter"),
  "React Query": SIMPLE("reactquery"),
  Apollo: SIMPLE("apollographql"),
  "Chart.js": SIMPLE("chartdotjs"),
  D3: SIMPLE("d3"),
  GSAP: SIMPLE("gsap"),
  "Framer Motion": SIMPLE("framer"),
  Lucide: SIMPLE("lucide"),
  MUI: SIMPLE("mui"),
  Storybook: SIMPLE("storybook"),

  // Python data science / GUI
  PyQt: d("qt"),
  Matplotlib: d("matplotlib"),
  NumPy: d("numpy"),
  Pandas: d("pandas"),
  Polars: SIMPLE("polars"),
  SciPy: SIMPLE("scipy"),
  TensorFlow: d("tensorflow"),
  PyTorch: d("pytorch"),
  OpenCV: d("opencv"),
  "scikit-learn": d("scikitlearn"),

  // Testing & tooling
  Jest: d("jest", "plain"),
  Vitest: d("vitest"),
  Cypress: SIMPLE("cypress"),
  Pytest: d("pytest"),
  ESLint: d("eslint"),
  Prettier: SIMPLE("prettier"),
  PostCSS: d("postcss"),
  Autoprefixer: SIMPLE("autoprefixer"),
  Selenium: SIMPLE("selenium"),

  // Platforms & infrastructure
  Vercel: d("vercel"),
  Netlify: d("netlify"),
  Heroku: d("heroku"),
  "GitHub Pages": d("github"),
  Git: d("git"),
  Azure: d("azure"),
  AWS: d("amazonwebservices", "original-wordmark"),
  Render: SIMPLE("render"),
  Docker: d("docker"),

  // Hardware / embedded / build
  Arduino: d("arduino"),
  ESP32: SIMPLE("espressif"),
  PlatformIO: SIMPLE("platformio"),
  Maven: SIMPLE("apachemaven"),
  Gradle: SIMPLE("gradle"),

  // Design / email / maps
  Framer: SIMPLE("framer"),
  Resend: SIMPLE("resend"),
  Leaflet: SIMPLE("leaflet"),
};

// Returns the CDN icon URL for a tech name, or null to fall back to a
// letter badge (used for names with no canonical brand icon).
export const techIcon = (name) => TECH_ICONS[name] ?? null;
