'use client';

import { useEffect, useRef, useState } from 'react';

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
const HIDDEN = { opacity: 0, filter: 'blur(4px)', transform: 'translateY(2px)' };
const VISIBLE = { opacity: 1, filter: 'blur(0)', transform: 'translate(0, 0)' };

const randomChar = () => CHARSET[Math.floor(Math.random() * CHARSET.length)];

const scramble = (text) =>
  text
    .split('')
    .map((char) => (char === ' ' || char === '\n' ? char : randomChar()))
    .join('');

export default function Decrypt({
  children,
  text,
  className = '',
  as: Component = 'span',
  duration = 700,
  delay = 0,
  animateOnMount = false,
}) {
  const isText = text !== undefined;
  const [output, setOutput] = useState(animateOnMount ? '' : text);
  const [style, setStyle] = useState(animateOnMount ? HIDDEN : VISIBLE);
  const [settled, setSettled] = useState(!animateOnMount);
  const ref = useRef(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;

    let intervalId;
    let delayId;
    let observer;

    const run = () => {
      hasRunRef.current = true;
      setSettled(false);

      if (isText) setOutput(scramble(text));

      const startTime = Date.now();

      intervalId = setInterval(() => {
        const progress = Math.min(1, (Date.now() - startTime) / duration);
        const chance = 0.88 * Math.pow(1 - progress, 0.85);

        if (isText) {
          const flickered = text
            .split('')
            .map((char) =>
              char === ' ' || char === '\n'
                ? char
                : Math.random() < chance
                  ? randomChar()
                  : char
            )
            .join('');

          setOutput(flickered);
        } else if (Math.random() < chance) {
          setStyle({
            opacity: Math.random() * 0.45 + 0.1,
            filter: `blur(${Math.random() * 3}px)`,
            transform: `translate(${Math.random() * 3 - 1.5}px, ${Math.random() * 3 - 1.5}px)`,
          });
        } else {
          setStyle({
            opacity: Math.min(1, 0.4 + progress * 0.6),
            filter: 'blur(0)',
            transform: 'translate(0, 0)',
          });
        }

        if (progress >= 1) {
          clearInterval(intervalId);
          if (isText) setOutput(text);
          setStyle(VISIBLE);
          setSettled(true);
        }
      }, 45);
    };

    const trigger = () => {
      delayId = setTimeout(run, delay);
    };

    if (animateOnMount) {
      trigger();
    } else {
      const node = ref.current;
      if (!node) return;

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          trigger();
          observer.disconnect();
        }
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

      observer.observe(node);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(delayId);
      observer?.disconnect();
    };
  }, [text, duration, delay, animateOnMount, isText]);

  return (
    <Component
      ref={ref}
      className={`inline-flex items-center justify-center ${
        isText ? 'shrink min-w-0 whitespace-normal break-words' : 'shrink-0'
      } ${className}`}
      style={
        isText
          ? undefined
          : {
              ...style,
              transition: settled
                ? 'opacity 0.15s ease, filter 0.15s ease, transform 0.15s ease'
                : 'none',
            }
      }
    >
      {isText ? output : children}
    </Component>
  );
}
