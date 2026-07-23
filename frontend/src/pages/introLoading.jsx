import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import WaveBackground from "../componants/waveBackground";

const LoadingScreen = ({ onComplete }) => {
  const progressRef = useRef(null);
  const glowRef = useRef(null);
  const lastBinaryUpdateRef = useRef(0);
  const completedRef = useRef(false);

  const [percent, setPercent] = useState(0);
  const [binaryCode, setBinaryCode] = useState(
    "0101010101010101010101010101010101010101010101010101010101010101",
  );

  const generateBinaryCode = (progress) => {
    const length = 90 + Math.round((progress / 100) * 40);

    return Array.from({ length }, () => (Math.random() > 0.5 ? "1" : "0")).join(
      "",
    );
  };

  useEffect(() => {
    const obj = { value: 0 };

    gsap.to(obj, {
      value: 100,
      duration: 12,
      ease: "power1.inOut",
      delay: 0.2,
      onUpdate: () => {
        const val = Math.round(obj.value);
        const easedValue = val < 20 ? val * 0.7 : val < 80 ? val * 0.9 : val;
        const now = Date.now();

        setPercent(easedValue);

        if (now - lastBinaryUpdateRef.current > 220) {
          setBinaryCode(generateBinaryCode(easedValue));
          lastBinaryUpdateRef.current = now;
        }

        gsap.set(progressRef.current, {
          width: `${easedValue}%`,
        });

        gsap.set(glowRef.current, {
          left: `${easedValue}%`,
        });
      },
      onComplete: () => {
        if (!completedRef.current) {
          completedRef.current = true;
          setPercent(100);
          setBinaryCode(generateBinaryCode(100));
          window.setTimeout(() => onComplete?.(), 350);
        }
      },
    });
  }, [onComplete]);

  return (
    <div className="loader-container">
      <div className="loader-background">
        <WaveBackground />
      </div>

      <div className="flex justify-center align-content ">
        <div className="loader-title">LOADING</div>

        <div className="loader-percent">{Math.floor(percent)}%</div>
      </div>
      <div className="loader-bar">
        <div className="loader-progress" ref={progressRef} />
        <div className="loader-glow" ref={glowRef} />
      </div>

      <div className="loader-code">{binaryCode}</div>
    </div>
  );
};

export default LoadingScreen;
