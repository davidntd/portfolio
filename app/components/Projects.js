"use client";

import { useMemo, useState } from "react";
import Decrypt from "./Decrypt";
import Reveal from "./Reveal";
import { Section } from "./SectionTitle";
import { techIcon } from "../lib/techIcons";

// @sync-start projects
export const DEFAULT_ITEMS = [
  {
    "name": "HomeFull",
    "desc": "Full-stack web application connecting homeless individuals with job opportunities. Features search and filtering by city, skill, and shelter for improved job accessibility.",
    "github": "https://github.com/Haedyn06/Project-HomeFull.git",
    "live": "https://project-homefull.vercel.app/",
    "image": null,
    "video": null,
    "best": true,
    "tech": [
      {
        "name": "JavaScript",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "tone": "lang"
      },
      {
        "name": "CSS",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        "tone": "lang"
      },
      {
        "name": "Next.js",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "tone": "framework"
      },
      {
        "name": "React",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "tone": "framework"
      },
      {
        "name": "Tailwind",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        "tone": "framework"
      },
      {
        "name": "Vercel",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
        "tone": "platform"
      },
      {
        "name": "Firebase",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",
        "tone": "data"
      }
    ],
    "createdAt": "2026-01-24T17:21:16Z",
    "pushedAt": "2026-01-25T23:37:58Z",
    "private": false,
    "media": []
  },
  {
    "name": "Village Rental",
    "desc": "Desktop application for rental management with CRUD operations across a 5-table relational database. Features real-time cost calculations and an interactive reporting dashboard.",
    "github": "https://github.com/davidntd/VillageRental.git",
    "live": null,
    "image": null,
    "video": null,
    "best": false,
    "tech": [
      {
        "name": "Python",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "tone": "lang"
      },
      {
        "name": "PostgreSQL",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        "tone": "data"
      }
    ],
    "createdAt": "2026-04-05T21:05:52Z",
    "pushedAt": "2026-04-05T21:07:51Z",
    "private": false,
    "media": []
  },
  {
    "name": "Quadratic Solver",
    "desc": "Interactive GUI application for solving quadratic equations with real-time graphing. Supports linear, quadratic, and complex root cases with adjustable axis ranges.",
    "github": "https://github.com/davidntd/Quadratic-Calculator.git",
    "live": null,
    "image": null,
    "video": null,
    "best": false,
    "tech": [
      {
        "name": "Python",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "tone": "lang"
      },
      {
        "name": "Matplotlib",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
        "tone": "tool"
      },
      {
        "name": "NumPy",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
        "tone": "tool"
      }
    ],
    "createdAt": "2026-04-05T07:26:15Z",
    "pushedAt": "2026-04-05T07:26:46Z",
    "private": false,
    "media": []
  },
  {
    "name": "PingPongPyGame",
    "desc": "Classic arcade game built with Python and Pygame. Features real-time input handling, collision detection, randomized ball direction, and physics-based ball-paddle mechanics.",
    "github": "https://github.com/davidntd/PingPongPyGame.git",
    "live": null,
    "image": null,
    "video": null,
    "best": false,
    "tech": [
      {
        "name": "Python",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "tone": "lang"
      }
    ],
    "createdAt": "2026-04-05T06:59:16Z",
    "pushedAt": "2026-04-05T07:04:00Z",
    "private": false,
    "media": []
  },
  {
    "name": "cpsy-300-project-1",
    "desc": "Cloud computing course project (CPSY 300) — collaborative repo with cloud infrastructure work.",
    "github": "https://github.com/falconvn2006/cpsy-300-project-1.git",
    "live": null,
    "image": null,
    "video": null,
    "best": false,
    "tech": [
      {
        "name": "Python",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "tone": "lang"
      },
      {
        "name": "Pandas",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
        "tone": "tool"
      },
      {
        "name": "Matplotlib",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
        "tone": "tool"
      },
      {
        "name": "Polars",
        "icon": "https://cdn.simpleicons.org/polars/white",
        "tone": "tool"
      },
      {
        "name": "Docker",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        "tone": "tool"
      },
      {
        "name": "Azure",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        "tone": "platform"
      }
    ],
    "createdAt": "2026-02-04T21:43:05Z",
    "pushedAt": "2026-02-11T00:39:01Z",
    "private": false,
    "media": []
  },
  {
    "name": "cpsy-300-project-2",
    "desc": "Second CPSY 300 cloud computing course project — collaborative JavaScript web project.",
    "github": "https://github.com/falconvn2006/cpsy-300-project-2.git",
    "live": null,
    "image": null,
    "video": null,
    "best": false,
    "tech": [
      {
        "name": "JavaScript",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "tone": "lang"
      },
      {
        "name": "Python",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "tone": "lang"
      },
      {
        "name": "CSS",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        "tone": "lang"
      },
      {
        "name": "Next.js",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "tone": "framework"
      },
      {
        "name": "React",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "tone": "framework"
      },
      {
        "name": "Tailwind",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        "tone": "framework"
      },
      {
        "name": "Flask",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
        "tone": "framework"
      },
      {
        "name": "Pandas",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
        "tone": "tool"
      },
      {
        "name": "Matplotlib",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
        "tone": "tool"
      },
      {
        "name": "Docker",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        "tone": "tool"
      },
      {
        "name": "Azure",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        "tone": "platform"
      },
      {
        "name": "Firebase",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",
        "tone": "data"
      }
    ],
    "createdAt": "2026-03-03T07:11:43Z",
    "pushedAt": "2026-04-08T18:40:40Z",
    "private": false,
    "media": []
  },
  {
    "name": "itsc-320-assignment-2",
    "desc": "Assignment 2 for the Software Security course at SAIT.",
    "github": "https://github.com/falconvn2006/itsc-320-assignment-2.git",
    "live": null,
    "image": null,
    "video": null,
    "best": false,
    "tech": [
      {
        "name": "Java",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        "tone": "lang"
      }
    ],
    "createdAt": "2026-02-24T03:30:46Z",
    "pushedAt": "2026-03-07T05:54:29Z",
    "private": false,
    "media": []
  },
  {
    "name": "NomViet",
    "desc": "Nôm Việt is a reference tool for learning Chữ Nôm, the traditional Vietnamese writing system. You can explore characters by reading, glyph, or stroke count. It also translates Quốc Ngữ into phonetic script with Chữ Nôm candidates.",
    "github": "https://github.com/davidntd/NomViet.git",
    "live": "https://nom-viet.vercel.app",
    "image": null,
    "video": null,
    "best": true,
    "tech": [
      {
        "name": "JavaScript",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "tone": "lang"
      },
      {
        "name": "CSS",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        "tone": "lang"
      },
      {
        "name": "Next.js",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "tone": "framework"
      },
      {
        "name": "React",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "tone": "framework"
      },
      {
        "name": "Tailwind",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        "tone": "framework"
      },
      {
        "name": "Vercel",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
        "tone": "platform"
      },
      {
        "name": "Supabase",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
        "tone": "data"
      }
    ],
    "createdAt": "2026-08-17T19:33:19Z",
    "pushedAt": "2026-09-02T02:58:10Z",
    "private": false,
    "media": []
  },
  {
    "name": "brown-bakery-site",
    "desc": "brown bakery site",
    "github": "https://github.com/CreefordSanchez/brown-bakery-site",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2025-01-28T02:58:38Z",
    "pushedAt": "2025-02-17T09:43:12Z",
    "tech": [
      {
        "name": "CSS",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        "tone": "lang"
      },
      {
        "name": "JavaScript",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "tone": "lang"
      },
      {
        "name": "HTML",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        "tone": "lang"
      }
    ],
    "best": false,
    "private": false,
    "media": []
  },
  {
    "name": "capstone",
    "desc": "Arc Wellness is a user-friendly mobile fitness application designed to help users set goals, stay consistent, create personalized workout routines, and track their progress, with AI-powered video analysis for exercise recognition. Developed by a multidisciplinary team of 5–6 members, the application integrates frontend and backend services, API connectivity, user profiles, and data management features to provide a complete fitness experience. Primarily contributed on frontend development, particularly the design and implementation of the profile page and its integration with the application's overall user experience.",
    "github": "https://github.com/Alidawood123/capstone",
    "live": "https://apps.apple.com/us/app/arc-wellness/id6761204779",
    "image": null,
    "video": null,
    "createdAt": "2026-01-23T00:44:01Z",
    "pushedAt": "2026-04-21T04:02:46Z",
    "tech": [
      {
        "name": "JavaScript",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "tone": "lang"
      },
      {
        "name": "React Native",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "tone": "tool"
      },
      {
        "name": "Node.js",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        "tone": "tool"
      },
      {
        "name": "MongoDB",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        "tone": "tool"
      },
      {
        "name": "Firebase",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",
        "tone": "tool"
      },
      {
        "name": "Claude",
        "icon": "https://cdn.simpleicons.org/claude",
        "tone": "tool"
      },
      {
        "name": "Jest",
        "icon": "https://cdn.simpleicons.org/jest",
        "tone": "tool"
      },
      {
        "name": "Docker",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        "tone": "tool"
      }
    ],
    "best": true,
    "private": true,
    "media": []
  },
  {
    "name": "itsc-320-assignment-4",
    "desc": "",
    "github": "https://github.com/falconvn2006/itsc-320-assignment-4",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-03-31T21:05:06Z",
    "pushedAt": "2026-04-17T05:15:59Z",
    "tech": [
      {
        "name": "JavaScript",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "tone": "lang"
      },
      {
        "name": "CSS",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        "tone": "lang"
      }
    ],
    "best": false,
    "private": true,
    "media": []
  },
  {
    "name": "cursor-hackahon",
    "desc": "",
    "github": "https://github.com/MinhTam2773/cursor-hackahon",
    "live": "https://cursor-hackahon.vercel.app",
    "image": null,
    "video": null,
    "createdAt": "2026-05-23T19:43:29Z",
    "pushedAt": "2026-05-29T15:52:12Z",
    "tech": [
      {
        "name": "TypeScript",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "tone": "lang"
      },
      {
        "name": "CSS",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        "tone": "lang"
      },
      {
        "name": "Python",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "tone": "lang"
      },
      {
        "name": "Next.js",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "tone": "framework"
      },
      {
        "name": "React",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "tone": "framework"
      },
      {
        "name": "Tailwind",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        "tone": "framework"
      },
      {
        "name": "Vercel",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
        "tone": "platform"
      }
    ],
    "best": false,
    "private": false,
    "media": []
  },
  {
    "name": "Project-1-simple-LED",
    "desc": "A simple LED project that repeatedly turns an LED on and off at a set interval.",
    "github": "https://github.com/davidntd/Project-1-simple-LED",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-08-14T16:34:02Z",
    "pushedAt": "2026-08-14T16:36:40Z",
    "tech": [
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "tone": "lang"
      },
      {
        "name": "PlatformIO",
        "icon": "https://cdn.simpleicons.org/platformio",
        "tone": "platform"
      },
      {
        "name": "Arduino",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        "tone": "framework"
      },
      {
        "name": "ESP32",
        "icon": "https://cdn.simpleicons.org/espressif",
        "tone": "tool"
      }
    ],
    "best": false,
    "private": false,
    "media": [
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-1-simple-LED/main/media/Video.mp4",
        "name": "Video.mp4"
      },
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-1-simple-LED/main/media/tinkercad.mp4",
        "name": "tinkercad.mp4"
      }
    ]
  },
  {
    "name": "Project-2-LED-with-button",
    "desc": "A button-controlled LED system that demonstrates digital input and output by using a push button to control the LED's state.",
    "github": "https://github.com/davidntd/Project-2-LED-with-button",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-08-14T18:53:57Z",
    "pushedAt": "2026-08-14T18:55:21Z",
    "tech": [
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "tone": "lang"
      },
      {
        "name": "PlatformIO",
        "icon": "https://cdn.simpleicons.org/platformio",
        "tone": "platform"
      },
      {
        "name": "Arduino",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        "tone": "framework"
      },
      {
        "name": "ESP32",
        "icon": "https://cdn.simpleicons.org/espressif",
        "tone": "tool"
      }
    ],
    "best": false,
    "private": false,
    "media": [
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-2-LED-with-button/main/media/Tinkercad.mp4",
        "name": "Tinkercad.mp4"
      },
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-2-LED-with-button/main/media/Video.mp4",
        "name": "Video.mp4"
      }
    ]
  },
  {
    "name": "Project-3-Buzzer-with-button",
    "desc": "A button-controlled buzzer system that demonstrates digital input and output by activating an audible alert when the push button is pressed.",
    "github": "https://github.com/davidntd/Project-3-Buzzer-with-button",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-08-15T01:12:04Z",
    "pushedAt": "2026-08-15T01:13:07Z",
    "tech": [
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "tone": "lang"
      },
      {
        "name": "PlatformIO",
        "icon": "https://cdn.simpleicons.org/platformio",
        "tone": "platform"
      },
      {
        "name": "Arduino",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        "tone": "framework"
      },
      {
        "name": "ESP32",
        "icon": "https://cdn.simpleicons.org/espressif",
        "tone": "tool"
      }
    ],
    "best": false,
    "private": false,
    "media": [
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-3-Buzzer-with-button/main/media/Tinkercad.mp4",
        "name": "Tinkercad.mp4"
      },
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-3-Buzzer-with-button/main/media/Video.mp4",
        "name": "Video.mp4"
      }
    ]
  },
  {
    "name": "Project-4-LED-with-photoresistor",
    "desc": "A light-activated LED system that uses a photoresistor (LDR) to detect ambient light and automatically turns the LED on when it becomes dark and off when sufficient light is detected.",
    "github": "https://github.com/davidntd/Project-4-LED-with-photoresistor",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-08-15T02:29:07Z",
    "pushedAt": "2026-08-15T02:32:30Z",
    "tech": [
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "tone": "lang"
      },
      {
        "name": "PlatformIO",
        "icon": "https://cdn.simpleicons.org/platformio",
        "tone": "platform"
      },
      {
        "name": "Arduino",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        "tone": "framework"
      },
      {
        "name": "ESP32",
        "icon": "https://cdn.simpleicons.org/espressif",
        "tone": "tool"
      }
    ],
    "best": false,
    "private": false,
    "media": [
      {
        "type": "image",
        "url": "https://raw.githubusercontent.com/davidntd/Project-4-LED-with-photoresistor/main/media/Image.png",
        "name": "Image.png"
      },
      {
        "type": "image",
        "url": "https://raw.githubusercontent.com/davidntd/Project-4-LED-with-photoresistor/main/media/Tinkercad.png",
        "name": "Tinkercad.png"
      }
    ]
  },
  {
    "name": "Project-5-Multisensor-Device",
    "desc": "A multisensor monitoring device that continuously measures magnetic fields using a Hall-effect sensor, sound levels, motion using a passive infrared (PIR) sensor, temperature, and relative humidity. The device collects and displays sensor readings in real time and can optionally log the data for analysis.",
    "github": "https://github.com/davidntd/Project-5-Multisensor-Device",
    "live": null,
    "image": null,
    "video": null,
    "media": [
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-5-Multisensor-Device/main/media/Video.mp4",
        "name": "Video.mp4"
      }
    ],
    "createdAt": "2026-08-21T02:35:01Z",
    "pushedAt": "2026-08-21T02:36:07Z",
    "tech": [
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "tone": "lang"
      },
      {
        "name": "PlatformIO",
        "icon": "https://cdn.simpleicons.org/platformio",
        "tone": "tool"
      },
      {
        "name": "Arduino",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        "tone": "tool"
      },
      {
        "name": "ESP32",
        "icon": "https://cdn.simpleicons.org/espressif",
        "tone": "tool"
      }
    ],
    "private": false,
    "best": true
  },
  {
    "name": "Project-6-Simple-OLED",
    "desc": "an OLED display to an ESP32 using I²C communication. Initialize the SSD1306 OLED, configure its display settings, and write text to the display using the Adafruit graphics libraries.",
    "github": "https://github.com/davidntd/Project-6-Simple-OLED",
    "live": null,
    "image": null,
    "video": null,
    "media": [
      {
        "type": "image",
        "url": "https://raw.githubusercontent.com/davidntd/Project-6-Simple-OLED/main/media/Image.jpg",
        "name": "Image.jpg"
      }
    ],
    "createdAt": "2026-08-24T19:37:19Z",
    "pushedAt": "2026-08-24T19:38:46Z",
    "tech": [
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "tone": "lang"
      },
      {
        "name": "PlatformIO",
        "icon": "https://cdn.simpleicons.org/platformio",
        "tone": "platform"
      },
      {
        "name": "Arduino",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        "tone": "framework"
      },
      {
        "name": "ESP32",
        "icon": "https://cdn.simpleicons.org/espressif",
        "tone": "tool"
      }
    ],
    "private": false,
    "best": false
  },
  {
    "name": "Project-7-OLED-Sensor-Display",
    "desc": "A sensor device that measures temperature and humidity and displays the readings on an OLED display",
    "github": "https://github.com/davidntd/Project-7-OLED-Sensor-Display",
    "live": null,
    "image": null,
    "video": null,
    "media": [
      {
        "type": "image",
        "url": "https://raw.githubusercontent.com/davidntd/Project-7-OLED-Sensor-Display/main/media/image.png",
        "name": "image.png"
      }
    ],
    "createdAt": "2026-08-25T17:34:48Z",
    "pushedAt": "2026-08-25T17:36:42Z",
    "tech": [
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "tone": "lang"
      },
      {
        "name": "PlatformIO",
        "icon": "https://cdn.simpleicons.org/platformio",
        "tone": "platform"
      },
      {
        "name": "Arduino",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        "tone": "framework"
      },
      {
        "name": "ESP32",
        "icon": "https://cdn.simpleicons.org/espressif",
        "tone": "tool"
      }
    ],
    "private": false,
    "best": false
  },
  {
    "name": "Project-8-Ultrasonic-Distance-Sensor",
    "desc": "A sensor device that detects the distance of an object in front of it within a 100 cm range.",
    "github": "https://github.com/davidntd/Project-8-Ultrasonic-Distance-Sensor",
    "live": null,
    "image": null,
    "video": null,
    "media": [
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-8-Ultrasonic-Distance-Sensor/main/media/Tinkercad.mp4",
        "name": "Tinkercad.mp4"
      },
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-8-Ultrasonic-Distance-Sensor/main/media/Video.mp4",
        "name": "Video.mp4"
      }
    ],
    "createdAt": "2026-08-28T01:15:36Z",
    "pushedAt": "2026-08-28T01:16:47Z",
    "tech": [
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "tone": "lang"
      },
      {
        "name": "PlatformIO",
        "icon": "https://cdn.simpleicons.org/platformio",
        "tone": "platform"
      },
      {
        "name": "Arduino",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        "tone": "framework"
      },
      {
        "name": "ESP32",
        "icon": "https://cdn.simpleicons.org/espressif",
        "tone": "tool"
      }
    ],
    "private": false,
    "best": false
  },
  {
    "name": "Project-9-Rotary-Encode-Counter",
    "desc": "A rotary encoder counter using an ESP32 and OLED display that detects rotation direction, updates the counter, and resets it when the encoder button is pressed.",
    "github": "https://github.com/davidntd/Project-9-Rotary-Encode-Counter",
    "live": null,
    "image": null,
    "video": null,
    "media": [
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-9-Rotary-Encode-Counter/main/media/Video.mp4",
        "name": "Video.mp4"
      }
    ],
    "createdAt": "2026-08-28T02:47:59Z",
    "pushedAt": "2026-08-28T02:49:30Z",
    "tech": [
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "tone": "lang"
      },
      {
        "name": "PlatformIO",
        "icon": "https://cdn.simpleicons.org/platformio",
        "tone": "platform"
      },
      {
        "name": "Arduino",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        "tone": "framework"
      },
      {
        "name": "ESP32",
        "icon": "https://cdn.simpleicons.org/espressif",
        "tone": "tool"
      }
    ],
    "private": false,
    "best": false
  },
  {
    "name": "Project-10-IR-Remote-Controller-Detector",
    "desc": "An ESP32-based IR remote controller detector that receives infrared signals from a remote and identifies the button commands through the Serial Monitor.\n",
    "github": "https://github.com/davidntd/Project-10-IR-Remote-Controller-Detector",
    "live": null,
    "image": null,
    "video": null,
    "media": [
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-10-IR-Remote-Controller-Detector/main/media/Video.mp4",
        "name": "Video.mp4"
      }
    ],
    "createdAt": "2026-08-28T17:08:29Z",
    "pushedAt": "2026-08-28T17:12:24Z",
    "tech": [
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "tone": "lang"
      },
      {
        "name": "PlatformIO",
        "icon": "https://cdn.simpleicons.org/platformio",
        "tone": "platform"
      },
      {
        "name": "Arduino",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        "tone": "framework"
      },
      {
        "name": "ESP32",
        "icon": "https://cdn.simpleicons.org/espressif",
        "tone": "tool"
      }
    ],
    "private": false,
    "best": false
  },
  {
    "name": "Project-11-Servo-Control",
    "desc": "A basic micro servor motor controlled by the tactile push button.",
    "github": "https://github.com/davidntd/Project-11-Servo-Control",
    "live": null,
    "image": null,
    "video": null,
    "media": [
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-11-Servo-Control/main/media/Tinkercad.mp4",
        "name": "Tinkercad.mp4"
      },
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-11-Servo-Control/main/media/Video.mp4",
        "name": "Video.mp4"
      }
    ],
    "createdAt": "2026-08-31T17:00:34Z",
    "pushedAt": "2026-08-31T17:04:29Z",
    "tech": [
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "tone": "lang"
      },
      {
        "name": "PlatformIO",
        "icon": "https://cdn.simpleicons.org/platformio",
        "tone": "platform"
      },
      {
        "name": "Arduino",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        "tone": "framework"
      },
      {
        "name": "ESP32",
        "icon": "https://cdn.simpleicons.org/espressif",
        "tone": "tool"
      }
    ],
    "private": false,
    "best": false
  },
  {
    "name": "Project-12-Servo-Joystick-Controller",
    "desc": "A servo motor controller using a joystick to control the servo’s position and rotation. The joystick allows the servo to turn up to 90° left or right from its center position.",
    "github": "https://github.com/davidntd/Project-12-Servo-Joystick-Controller",
    "live": null,
    "image": null,
    "video": null,
    "media": [
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-12-Servo-Joystick-Controller/main/media/Video.mp4",
        "name": "Video.mp4"
      }
    ],
    "createdAt": "2026-09-02T02:25:24Z",
    "pushedAt": "2026-09-02T02:35:31Z",
    "tech": [
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "tone": "lang"
      },
      {
        "name": "PlatformIO",
        "icon": "https://cdn.simpleicons.org/platformio",
        "tone": "tool"
      },
      {
        "name": "Arduino",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        "tone": "tool"
      },
      {
        "name": "ESP32",
        "icon": "https://cdn.simpleicons.org/espressif",
        "tone": "tool"
      }
    ],
    "private": false,
    "best": false
  },
  {
    "name": "Project-13-Random-LED-Blinking",
    "desc": "A button-controlled LED system that generates random patterns from one to four LEDs. When activated, the LEDs display a new random pattern every second and stop when the system is turned off.",
    "github": "https://github.com/davidntd/Project-13-Random-LED-Blinking",
    "live": null,
    "image": null,
    "video": null,
    "media": [
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-13-Random-LED-Blinking/main/media/Video.mp4",
        "name": "Video.mp4"
      }
    ],
    "createdAt": "2026-09-03T02:25:12Z",
    "pushedAt": "2026-09-03T02:33:14Z",
    "tech": [
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "tone": "lang"
      },
      {
        "name": "PlatformIO",
        "icon": "https://cdn.simpleicons.org/platformio",
        "tone": "tool"
      },
      {
        "name": "Arduino",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        "tone": "tool"
      },
      {
        "name": "ESP32",
        "icon": "https://cdn.simpleicons.org/espressif",
        "tone": "tool"
      }
    ],
    "private": false,
    "best": false
  },
  {
    "name": "Project-14-LED-Transistor-Controlled-Load",
    "desc": "A transistor-controlled load uses a transistor to switch an external load safely. It demonstrates transistor switching and how a low-power control signal can operate higher-current loads.\n",
    "github": "https://github.com/davidntd/Project-14-LED-Transistor-Controlled-Load",
    "live": null,
    "image": null,
    "video": null,
    "media": [
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-14-LED-Transistor-Controlled-Load/main/media/Video.mp4",
        "name": "Video.mp4"
      }
    ],
    "createdAt": "2026-09-05T20:56:06Z",
    "pushedAt": "2026-09-05T20:56:24Z",
    "tech": [
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "tone": "lang"
      },
      {
        "name": "PlatformIO",
        "icon": "https://cdn.simpleicons.org/platformio",
        "tone": "tool"
      },
      {
        "name": "Arduino",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        "tone": "tool"
      },
      {
        "name": "ESP32",
        "icon": "https://cdn.simpleicons.org/espressif",
        "tone": "tool"
      }
    ],
    "private": false,
    "best": false
  },
  {
    "name": "Project-15-RC-Capacitor-Timing",
    "desc": "An RC capacitor timing circuit measures how a capacitor charges and discharges through a resistor. It demonstrates RC timing, voltage filtering, and how capacitor voltage changes over time.",
    "github": "https://github.com/davidntd/Project-15-RC-Capacitor-Timing",
    "live": null,
    "image": null,
    "video": null,
    "media": [
      {
        "type": "video",
        "url": "https://raw.githubusercontent.com/davidntd/Project-15-RC-Capacitor-Timing/main/media/Video.mp4",
        "name": "Video.mp4"
      }
    ],
    "createdAt": "2026-09-05T22:05:32Z",
    "pushedAt": "2026-09-05T22:06:12Z",
    "tech": [
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "tone": "lang"
      },
      {
        "name": "PlatformIO",
        "icon": "https://cdn.simpleicons.org/platformio",
        "tone": "tool"
      },
      {
        "name": "Arduino",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        "tone": "tool"
      },
      {
        "name": "ESP32",
        "icon": "https://cdn.simpleicons.org/espressif",
        "tone": "tool"
      }
    ],
    "private": false,
    "best": false
  }
];
// @sync-end

const SHOW_COUNT = 4;
const GITHUB_USER = "davidntd";

// Recognizable frameworks / libraries / tools, keyed by package name.

const FILTERS = [
  { id: "best", label: "Best" },
  { id: "recent", label: "Recent Updates" },
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
];

// Repos that must never appear in any filter (e.g. the site's own repo).
const HIDDEN_REPOS = new Set(["portfolio"]);

// "https://github.com/Owner/RepoName.git" → "reponame" (lowercased)
const repoKeyFromUrl = (url = "") => {
  const m = String(url || "")
    .replace(/\.git$/, "")
    .match(/github\.com\/[^/]+\/([^/?#]+)/i);
  return m ? m[1].toLowerCase() : null;
};
const repoKeyOf = (item) => repoKeyFromUrl(item?.github) || String(item?.name ?? "").toLowerCase();

const fmtDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

function TechChip({ name, tone = "lang", icon }) {
  const src = icon || techIcon(name);
  // All tech chips share the same neutral badge style regardless of category/tone.
  const toneCls = "border-[var(--text)]/25 bg-[var(--bg3)]";
  return (
    <span
      title={name}
      className={`group/tech relative inline-flex h-8 w-8 items-center justify-center border ${toneCls} cursor-default`}
    >
      {src ? (
        <img src={src} alt={name} width={20} height={20} className="object-contain" />
      ) : (
        <span className="font-pixel text-[0.7rem] leading-none text-[var(--text)]">
          {name.slice(0, 1)}
        </span>
      )}
      <span className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded border border-[var(--border)] bg-[#121218] px-2 py-1 text-[0.62rem] text-[var(--text)] opacity-0 shadow-[0_8px_20px_rgba(0,0,0,0.45)] transition-opacity duration-150 group-hover/tech:opacity-100">
        {name}
      </span>
    </span>
  );
}

function ProjectLink({ href, children, as, onClick, title }) {
  const cls = "font-pixel text-[0.55rem] px-3 py-2 rounded-md border-2 border-[#000] bg-[var(--bg3)] text-[var(--accent2)] shadow-[inset_2px_2px_0_rgba(255,255,255,0.08),inset_-2px_-2px_0_rgba(0,0,0,0.3)] hover:border-[var(--accent2)] hover:bg-[var(--accent2)] hover:text-[#000] transition-colors duration-300 inline-flex items-center gap-1.5 cursor-pointer";
  if (as === "button") {
    return (
      <button type="button" onClick={onClick} className={cls} title={title}>
        {children}
      </button>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      title={title}
    >
      <Decrypt text={children} />
    </a>
  );
}

/**
 * Projects — the project grid plus the "View more on GitHub" button.
 *
 * All data comes from the admin's content.json (synced via the admin's
 * "Sync from GitHub" button and saved locally). No client-side GitHub
 * fetching occurs. Sort by Best / Recent / Newest / Oldest.
 */
export default function Projects({ items = DEFAULT_ITEMS }) {
  const [filter, setFilter] = useState("newest");
  const [mediaGallery, setMediaGallery] = useState({ open: false, items: [], index: 0 });

  // Build the pool from admin items, filtering out hidden repos.
  const pool = useMemo(() => {
    return items
      .map((item, idx) => ({
        name: item.name,
        desc: item.desc ?? "",
        github: item.github,
        live: item.live || null,
        image: item.image ?? null,
        video: item.video ?? null,
        media: Array.isArray(item.media) ? item.media : [],
        private: item.private ?? false,
        tech: item.tech ?? null,
        best: !!item.best,
        bestOrder: idx,
        language: item.language ?? null,
        createdAt: item.createdAt ?? null,
        pushedAt: item.pushedAt ?? null,
      }))
      .map((p) => {
        // Merge legacy single image/video fields into media array
        if ((!p.media || p.media.length === 0) && (p.image || p.video)) {
          const m = [];
          if (p.image) m.push({ type: "image", url: p.image });
          if (p.video) m.push({ type: "video", url: p.video });
          return { ...p, media: m };
        }
        return { ...p, media: p.media || [] };
      })
      .filter((p) => !HIDDEN_REPOS.has(String(p.name ?? "").toLowerCase()));
  }, [items]);

  // Pick the projects for the active filter.
  const shown = useMemo(() => {
    const newest = [...pool].sort(
      (a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
    );
    if (filter === "recent") {
      return [...pool]
        .sort((a, b) => (b.pushedAt ?? "").localeCompare(a.pushedAt ?? ""))
        .slice(0, SHOW_COUNT);
    }
    if (filter === "oldest") return [...newest].reverse().slice(0, SHOW_COUNT);
    if (filter === "best") {
      const flagged = pool
        .filter((p) => p.best)
        .sort((a, b) => a.bestOrder - b.bestOrder);
      const rest = pool
        .filter((p) => !p.best)
        .sort(
          (a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
        );
      return [...flagged, ...rest].slice(0, SHOW_COUNT);
    }
    return newest.slice(0, SHOW_COUNT);
  }, [pool, filter]);

  const header = (
    <div className="flex flex-wrap items-center gap-2">
      <label className="relative inline-flex items-center gap-2">
        <span className="font-pixel text-[0.55rem] uppercase tracking-[0.14em] text-[var(--muted)]">
          Sort:
        </span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Project filter"
          className="font-pixel text-[0.6rem] uppercase tracking-[0.08em] appearance-none bg-[var(--bg3)] text-[var(--text)] border-2 border-[#000] px-3 py-1.5 pr-8 cursor-pointer shadow-[inset_2px_2px_0_rgba(255,255,255,0.08),inset_-2px_-2px_0_rgba(0,0,0,0.3)] focus:outline-none focus:border-[var(--accent2)] transition-colors"
        >
          {FILTERS.map((f) => (
            <option key={f.id} value={f.id} className="bg-[var(--bg2)] text-[var(--text)]">
              {f.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--accent2)] text-[0.6rem] leading-none">
          ▼
        </span>
      </label>
    </div>
  );

  return (
    <Section id="projects" title="Projects" header={header}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8 items-start">
        {shown.map((p, idx) => {
          // Build tech chips from admin-provided tech array.
          const manualTech = Array.isArray(p.tech)
            ? p.tech.map((t) => (typeof t === "string" ? { name: t } : t)).filter((t) => t?.name)
            : [];
          const chips = manualTech.map((t) => ({
            name: t.name,
            icon: t.icon || null,
            tone: t.tone || "tech",
          }));

          const date =
            filter === "recent" && p.pushedAt
              ? { label: "Updated", date: fmtDate(p.pushedAt) }
              : p.createdAt
                ? { label: "Created", date: fmtDate(p.createdAt) }
                : null;

          return (
            <Reveal key={p.name} delay={idx * 90}>
              <article className="pixel-border bg-[var(--card)] p-3 sm:p-3.5 flex flex-col gap-2.5 transition-all duration-300 hover:-translate-y-1">
                <Decrypt
                  text={p.name}
                  as="h3"
                  className="text-[var(--text)] text-base md:text-lg leading-snug min-w-0 flex-text-left"
                />

                {date && (
                  <div className="font-pixel text-[0.65rem] uppercase tracking-[0.1em]">
                    <span className="text-[var(--accent2)]">{date.label}</span>{" "}
                    <span className="text-[var(--text)]">{date.date}</span>
                  </div>
                )}

                {chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {chips.map((c, ci) => (
                      <TechChip key={`${c.tone}-${c.name}-${ci}`} name={c.name} tone={c.tone} icon={c.icon} />
                    ))}
                  </div>
                )}



                {p.desc && (
                  <Decrypt
                    text={p.desc}
                    as="p"
                    className="text-sm md:text-[0.95rem] text-left text-[var(--text)] opacity-90 leading-relaxed flex-text-left"
                  />
                )}

                <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--border)]">
                  {!p.private && <ProjectLink href={p.github} title="View Git Repo">GitHub</ProjectLink>}
                  {p.live && <ProjectLink href={p.live} title="View Live Site">Live</ProjectLink>}
                  {p.media.length > 0 && (
                    <ProjectLink as="button" onClick={() => setMediaGallery({ open: true, items: p.media, index: 0 })} title="View Img/Vid">
                      Media
                    </ProjectLink>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="text-center">
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="retro-btn px-6 py-3"
        >
          <Decrypt text="View more on GitHub →" />
        </a>
      </div>

      {/* Media Gallery Popup */}
      {mediaGallery.open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 sm:p-6"
          onClick={() => setMediaGallery({ ...mediaGallery, open: false })}
        >
          <div
            className="relative w-full max-w-4xl flex flex-col rounded-xl border-2 border-[#000] bg-[var(--bg2)] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar: type + counter on the left, close on the right */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b-2 border-[#000] bg-[var(--bg3)]">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`font-pixel text-[0.55rem] uppercase tracking-[0.12em] px-2 py-1 rounded shrink-0 ${
                  mediaGallery.items[mediaGallery.index]?.type === "video"
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}>
                  {mediaGallery.items[mediaGallery.index]?.type === "video" ? "VID" : "IMG"}
                </span>
                {mediaGallery.items.length > 1 && (
                  <span className="font-mono text-xs text-[var(--muted)] truncate">
                    {mediaGallery.index + 1} / {mediaGallery.items.length}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setMediaGallery({ ...mediaGallery, open: false })}
                className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border-2 border-[#000] bg-[var(--bg2)] text-[var(--text)] font-pixel text-[0.55rem] uppercase tracking-wider hover:bg-red-500/20 hover:text-red-400 transition-colors cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {/* Media stage: dark area, arrows overlay the media itself */}
            <div className="relative flex items-center justify-center bg-black/70 p-4 sm:p-6" style={{ minHeight: "min(62vh, 520px)" }}>
              {/* Left arrow — overlaid on media, vertically centered */}
              {mediaGallery.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => setMediaGallery({
                    ...mediaGallery,
                    index: (mediaGallery.index - 1 + mediaGallery.items.length) % mediaGallery.items.length,
                  })}
                  aria-label="Previous"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[var(--bg2)]/90 border-2 border-[#000] text-[var(--accent2)] flex items-center justify-center font-pixel text-lg hover:bg-[var(--accent2)] hover:text-[#000] transition-colors cursor-pointer shadow-lg"
                >
                  ◀
                </button>
              )}

              {mediaGallery.items[mediaGallery.index]?.type === "video" ? (
                <video
                  key={mediaGallery.items[mediaGallery.index].url}
                  src={mediaGallery.items[mediaGallery.index].url}
                  controls
                  autoPlay
                  className="max-h-[62vh] max-w-full object-contain rounded"
                />
              ) : (
                <img
                  key={mediaGallery.items[mediaGallery.index].url}
                  src={mediaGallery.items[mediaGallery.index]?.url}
                  alt=""
                  className="max-h-[62vh] max-w-full object-contain rounded"
                />
              )}

              {/* Right arrow — overlaid on media, vertically centered */}
              {mediaGallery.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => setMediaGallery({
                    ...mediaGallery,
                    index: (mediaGallery.index + 1) % mediaGallery.items.length,
                  })}
                  aria-label="Next"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[var(--bg2)]/90 border-2 border-[#000] text-[var(--accent2)] flex items-center justify-center font-pixel text-lg hover:bg-[var(--accent2)] hover:text-[#000] transition-colors cursor-pointer shadow-lg"
                >
                  ▶
                </button>
              )}
            </div>

            {/* Footer bar: dot navigation */}
            {mediaGallery.items.length > 1 && (
              <div className="flex items-center justify-center gap-2.5 px-4 py-3 border-t-2 border-[#000] bg-[var(--bg3)]">
                {mediaGallery.items.map((item, di) => (
                  <button
                    key={di}
                    type="button"
                    onClick={() => setMediaGallery({ ...mediaGallery, index: di })}
                    aria-label={`Go to item ${di + 1}`}
                    title={item.type === "video" ? `Video ${di + 1}` : `Image ${di + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      di === mediaGallery.index
                        ? "bg-[var(--accent2)] scale-125"
                        : "bg-[var(--muted)] opacity-40 hover:opacity-70"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
