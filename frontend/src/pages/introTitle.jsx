import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function IntroTitle() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.set([titleRef.current, subtitleRef.current, lineRef.current], {
      autoAlpha: 0,
      y: 32,
    })
      .to(lineRef.current, { autoAlpha: 1, width: "100%", duration: 0.8 })
      .to(titleRef.current, { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.2")
      .to(subtitleRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.3");
  }, []);

  return (
    <div className="intro-title-screen">
      <div className="intro-title-line" ref={lineRef} />
      <h1 className="intro-title" ref={titleRef}>
        EDM ANIMATION
      </h1>
      <p className="intro-subtitle" ref={subtitleRef}>
        The pulse begins here.
      </p>
    </div>
  );
}
