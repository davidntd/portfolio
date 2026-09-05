"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Phone, Mail, Send } from "lucide-react";
import Decrypt from "./Decrypt";
import { PanelCard, PanelLabel } from "./PanelCard";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

// @sync-start contact
export const DEFAULT_CONTACT = {
  "brand": "DavidNTD",
  "displayName": "David Nguyen",
  "intro": "Frontend-Focused Full-Stack Developer\nBuilding modern web applications with Next.js and React, with a growing focus on backend development, AI, and embedded systems.\n",
  "location": "Calgary, AB, Canada",
  "phone": "+1 (403) 827-2659",
  "email": "davidnguyen107206@gmail.com",
  "github": "https://github.com/davidntd",
  "linkedin": "http://www.linkedin.com/in/davidntd",
  "resumeUrl": "/Resume/David-Nguyen-ResumeCV.docx.pdf",
  "profileImage": "/profile/profile.jpg",
  "status": "open to work/opportunities in IT and software"
};
// @sync-end

// @sync-start footer
export const DEFAULT_FOOTER = "© 2026 Thái Dương (David) Nguyễn. Designed & built with care.";
// @sync-end

// Same brand icons as the profile card.
const GitHubIcon = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.126 2.062 2.062 0 0 1 0 4.126zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const inputClass =
  "w-full px-3 py-2.5 bg-white border-2 border-[#000] text-[#111] outline-none text-sm transition-colors focus:border-[var(--accent2)] placeholder:text-gray-500";

const toTelHref = (phone) => `tel:${phone.replace(/[^+\d]/g, "")}`;
const toDisplayUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "");

function AutoGrowTextarea({ value, onChange }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.style.height = "auto";
    node.style.height = `${node.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      id="message"
      name="message"
      rows={3}
      value={value}
      onChange={onChange}
      required
      className={`${inputClass} overflow-hidden resize-none`}
    />
  );
}

// Identical to the profile card's contact buttons — chunky retro icon buttons.
const iconBtnClass =
  "inline-flex items-center justify-center h-11 w-full border-2 border-[#000] bg-[var(--bg3)] text-[var(--muted)] shadow-[inset_2px_2px_0_rgba(255,255,255,0.12),inset_-2px_-2px_0_rgba(0,0,0,0.3),0_3px_0_#000] transition-all duration-150 hover:bg-[var(--accent)] hover:text-[#06121f] active:translate-y-[2px] active:shadow-[inset_2px_2px_0_rgba(255,255,255,0.12),inset_-2px_-2px_0_rgba(0,0,0,0.3),0_1px_0_#000]";

function ContactLinkCard({ link }) {
  const [Icon, href, value, delay] = link;
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      title={value}
      aria-label={value}
      className={iconBtnClass}
    >
      <Icon size={19} />
    </a>
  );
}

function ContactForm({ contact: { phone, email, linkedin, github } }) {
  const contactLinks = [
    [Phone, toTelHref(phone), phone, 0],
    [Mail, `mailto:${email}`, email, 160],
    [LinkedInIcon, linkedin, toDisplayUrl(linkedin), 80],
    [GitHubIcon, github, toDisplayUrl(github), 240],
  ];

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const result = await (
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: "ebd85c14-aad4-47af-bc5c-45302e160274",
            ...formData,
            subject: `Portfolio message from ${formData.name}`,
            from_name: formData.name,
            to_email: "davidnguyen107206@gmail.com",
          }),
        })
      ).json();

      setStatus(result.success ? "success" : "error");
      if (result.success) setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus(""), 5000);
  };

  const fields = [
    ["name", "Name", "text"],
    ["email", "Email", "email"],
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
        {/* Left column: section title + contact links card (stretches to match the form) */}
        <div className="flex flex-col gap-3 h-full min-w-0">
          <Reveal>
            <SectionTitle compact>Contact Me</SectionTitle>
          </Reveal>
          <Reveal delay={140} className="flex-1 flex flex-col min-h-0">
            <PanelCard className="p-2.5 flex-1 flex flex-col">
              {/* Label centered in the space above the buttons */}
              <div className="flex-1 flex flex-col justify-center py-2">
                <PanelLabel>Send a message or reach out — I&apos;d love to hear from you.</PanelLabel>
              </div>
              <div className="grid grid-cols-2 gap-2.5 min-w-0 pt-3 border-t border-[var(--border)]">
                {contactLinks.map((link) => (
                  <ContactLinkCard key={link[2]} link={link} />
                ))}
              </div>
            </PanelCard>
          </Reveal>
        </div>

        <Reveal delay={200} className="min-w-0 w-full">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 min-w-0 w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fields.map(([id, label, type]) => (
                <div key={id}>
                  <label htmlFor={id} className="block mb-1 text-sm text-white">
                    <Decrypt text={label} />
                  </label>
                  <input
                    type={type}
                    id={id}
                    name={id}
                    value={formData[id]}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="message" className="block mb-1 text-sm text-white">
                <Decrypt text="Message" />
              </label>
              <AutoGrowTextarea value={formData.message} onChange={handleChange} />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="retro-btn self-start disabled:opacity-50"
            >
              <Decrypt><Send size={16} /></Decrypt>
              <Decrypt
                text={status === "sending" ? "Sending..." : "Send message"}
                animateOnMount={status === "sending"}
              />
            </button>

            {status && status !== "sending" && (
              <div
                className={`rounded-lg p-2.5 text-sm ${
                  status === "success"
                    ? "bg-green-500/20 border border-green-500 text-green-400"
                    : "bg-red-500/20 border border-red-500 text-red-400"
                }`}
              >
                <Decrypt
                  text={
                    status === "success"
                      ? "✓ Message sent successfully! I'll get back to you soon."
                      : "✗ Failed to send. Please try again or email me directly."
                  }
                  animateOnMount
                />
              </div>
            )}
          </form>
        </div>
        </Reveal>
      </div>
    </div>
  );
}

function Footer({ text }) {
  return (
    <footer className="text-center py-6 sm:py-8 px-4 sm:px-6 lg:px-8 text-[var(--muted)] text-xs tracking-wide border-t border-[var(--border)]">
      <Decrypt
        text={text}
        className="text-[var(--muted)] text-xs tracking-wide leading-relaxed"
      />
    </footer>
  );
}

/**
 * Contact — the full-screen contact section (contact links + form) with the
 * site footer beneath it.
 */
export default function Contact({ contact = DEFAULT_CONTACT, footerText = DEFAULT_FOOTER }) {
  return (
    <div id="contact" className="flex flex-col">
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-[1152px] mx-auto w-full flex flex-col">
          <ContactForm contact={contact} />
        </div>
      </section>

      <Footer text={footerText} />
    </div>
  );
}
