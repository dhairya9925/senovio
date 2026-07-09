"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { RoutePath } from "./SenovioSiteLayout";

/* ──────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────── */

export interface HeroSlide {
  /** Large heading line */
  title: string;
  /** Accent-coloured second line */
  highlight: string;
  /** Body text below the heading */
  description: string;
  /** Full-width background image URL */
  image: string;
  /** Primary call-to-action */
  primaryCta: { label: string; to: RoutePath };
  /** Secondary (outline) call-to-action */
  secondaryCta: { label: string; to: RoutePath };
}

interface HeroSliderProps {
  slides: HeroSlide[];
  /** Auto-advance interval in ms (default 6000). Set 0 to disable. */
  interval?: number;
}

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */

export default function HeroSlider({ slides, interval = 5000 }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const isTransitioningRef = useRef(false);
  const total = slides.length;

  /* ── Auto-play ──────────────────────────────────────── */
  useEffect(() => {
    if (interval <= 0 || total <= 1) return;

    const timer = setTimeout(() => {
      setDirection("next");
      isTransitioningRef.current = true;
      setCurrent((prev) => (prev + 1) % total);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 1200);
    }, interval);

    return () => clearTimeout(timer);
  }, [current, interval, total]);

  /* ── Navigation helpers ─────────────────────────────── */
  function goTo(index: number, dir: "next" | "prev") {
    if (isTransitioningRef.current || index === current) return;
    setDirection(dir);
    isTransitioningRef.current = true;
    setCurrent(index);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1200);
  }

  function goNext() {
    goTo((current + 1) % total, "next");
  }
  function goPrev() {
    goTo((current - 1 + total) % total, "prev");
  }

  const slide = slides[current];

  return (
    <section
      id="hero-slider"
      className="hero-slider"
      aria-roledescription="carousel"
      aria-label="Hero banner"
    >
      {/* ── Background images ──────────────────────────── */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`hero-slider__bg ${
            i === current
              ? `hero-slider__bg--active hero-slider__bg--${direction}`
              : "hero-slider__bg--hidden"
          }`}
          style={{ backgroundImage: `url("${s.image}")` }}
          aria-hidden={i !== current}
        />
      ))}

      {/* ── Dark overlay ───────────────────────────────── */}
      <div className="hero-slider__overlay" aria-hidden="true" />

      {/* ── Content card ───────────────────────────────── */}
      <div className="hero-slider__inner">
        <div key={current} className={`hero-slider__card hero-slider__card--enter-${direction}`}>
          <h1 className="hero-slider__heading">
            {slide.title}
            <span className="hero-slider__heading-highlight">{slide.highlight}</span>
          </h1>
          <p className="hero-slider__description">{slide.description}</p>
          <div className="hero-slider__ctas">
            <Link href={slide.primaryCta.to} className="hero-slider__btn hero-slider__btn--primary">
              {slide.primaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={slide.secondaryCta.to}
              className="hero-slider__btn hero-slider__btn--outline"
            >
              {slide.secondaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Arrow buttons ──────────────────────────────── */}
      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            className="hero-slider__arrow hero-slider__arrow--prev"
            onClick={goPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className="hero-slider__arrow hero-slider__arrow--next"
            onClick={goNext}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* ── Dot indicators ─────────────────────────────── */}
      {total > 1 && (
        <div className="hero-slider__dots" role="tablist" aria-label="Slide navigation">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              className={`hero-slider__dot ${i === current ? "hero-slider__dot--active" : ""}`}
              onClick={() => goTo(i, i > current ? "next" : "prev")}
            />
          ))}
        </div>
      )}

      {/* ── Progress bar ───────────────────────────────── */}
      {total > 1 && interval > 0 && (
        <div className="hero-slider__progress-track" aria-hidden="true">
          <div
            key={current}
            className="hero-slider__progress-bar"
            style={{ animationDuration: `${interval}ms` }}
          />
        </div>
      )}
    </section>
  );
}
