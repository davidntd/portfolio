import { readFile } from "node:fs/promises";
import path from "node:path";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import FaviconTheme from "./components/FaviconTheme";
import { DEFAULT_PROFILE } from "./components/Intro";

// Same local-admin fallback as app/page.js: use the locally-edited content
// when present, otherwise the site's built-in values.
async function getLocalContent() {
  try {
    const raw = await readFile(
      path.join(process.cwd(), "app", "admin", "data", "content.json"),
      "utf8"
    );
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin", "vietnamese"],
  variable: "--font-crt",
});


export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata() {
  const content = await getLocalContent();
  return {
    title: content?.profile?.brand ?? DEFAULT_PROFILE.brand,
    description: content?.profile?.intro ?? DEFAULT_PROFILE.intro,
    icons: {
      icon: {
        url: "/images/favicon-light.png?v=6",
        type: "image/png",
        sizes: "512x512",
      },
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${pressStart.variable} ${vt323.variable}`}>
        <FaviconTheme />
        {children}
      </body>
    </html>
  );
}
