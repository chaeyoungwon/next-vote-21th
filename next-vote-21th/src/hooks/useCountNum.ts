import { useEffect, useState } from "react";

const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export const useCountNum = (end: number, start = 0, duration = 2000) => {
  const [count, setCount] = useState(start);
  const frameRate = 1000 / 60;
  const totalFrame = Math.round(duration / frameRate);

  useEffect(() => {
    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame += 1;
      const progress = easeOutExpo(currentFrame / totalFrame);
      const value = Math.round(start + (end - start) * progress);

      setCount(value);

      if (progress === 1) {
        clearInterval(counter);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [end, start, duration]);

  return count;
};
