'use client';

import { useEffect } from 'react';

const LIGHT_ICON = '/images/favicon-light.png?v=6';
const DARK_ICON = '/images/favicon-dark.png?v=6';

function applyFavicon(isDark) {
  const href = isDark ? DARK_ICON : LIGHT_ICON;
  let link = document.querySelector('link[data-favicon-theme]');

  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.sizes = '512x512';
    link.setAttribute('data-favicon-theme', 'true');
    document.head.appendChild(link);
  }

  if (link.getAttribute('href') !== href) {
    link.setAttribute('href', href);
  }
}

export default function FaviconTheme() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const update = () => applyFavicon(media.matches);
    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  return null;
}
