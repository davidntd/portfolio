import { readFile } from "node:fs/promises";
import path from "node:path";
import Navbar from "./components/Navbar";
import Intro, { DEFAULT_PROFILE } from "./components/Intro";
import Foundation from "./components/Foundation";
import Career from "./components/Career";
import Tech from "./components/Tech";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import StartScreen from "./components/StartScreen";
import CosmicBackground from "./components/CosmicBackground";

// Force server-rendered on every request so admin edits to content.json
// are reflected immediately without a rebuild.
export const dynamic = "force-dynamic";

// Reads the locally-edited admin content when present (app/admin is gitignored
// and local-only), so changes saved in /admin show up in dev and in local
// production builds. Returns null when the file is absent — e.g. git-based
// deploys, where app/admin doesn't exist — so the components fall back to the
// content embedded in them.
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

export default async function Home() {
  const content = await getLocalContent();
  // Local admin edits win in dev; otherwise the site's built-in content.
  const profile = content?.profile ?? DEFAULT_PROFILE;
  const tagline = profile.intro.split("\n")[0];
  return (
    <>
      <CosmicBackground />
      <StartScreen brand={profile.brand} tagline={tagline}>
        <Navbar brand={profile.brand} resumeUrl={profile.resumeUrl} />
        <main className="relative z-10">
          <Intro profile={profile} about={content?.about} />
          <Foundation education={content?.education} awards={content?.awards} />
          <Career items={content?.career} />
          <Tech groups={content?.skills?.groups} />
          <Projects items={content?.projects} />
          <Contact contact={profile} footerText={content?.footer} />
        </main>
      </StartScreen>
    </>
  );
}
