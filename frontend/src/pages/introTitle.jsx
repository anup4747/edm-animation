import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function IntroTitle({ onComplete }) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);
  const accentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.set(
      [
        titleRef.current,
        subtitleRef.current,
        lineRef.current,
        accentRef.current,
      ],
      {
        autoAlpha: 0,
        y: 24,
      },
    )
      .to(lineRef.current, { autoAlpha: 1, width: "100%", duration: 0.8 })
      .to(titleRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.35")
      .to(subtitleRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.2")
      .to(
        accentRef.current,
        {
          autoAlpha: 1,
          color: "#00ffff",
          textShadow: "0 0 20px rgba(0,255,255,0.35)",
          duration: 0.35,
        },
        "-=0.1",
      )
      .to(
        accentRef.current,
        {
          color: "#ff1a1a",
          textShadow: "0 0 24px rgba(255,26,26,0.4)",
          duration: 1.2,
        },
        "+=0.4",
      );

    const timer = window.setTimeout(() => onComplete?.(), 2600);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="intro-title-screen">
      <div className="intro-title-line" ref={lineRef} />
      <h1 className="intro-title" ref={titleRef}>
        <span className="intro-logo-prefix">SINGULARITY</span>
      </h1>
      <p className="intro-subtitle" ref={subtitleRef}>
        Where sound becomes <span className="intro-subtitle-accent">light</span>
      </p>
    </div>
  );
}
