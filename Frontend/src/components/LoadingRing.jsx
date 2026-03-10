import React, { useEffect, useState } from "react";

const LoadingRing = ({ duration = 3000, size = 80, color = "blue" }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="flex justify-center items-center min-h-[150px]">
      <div
        style={{ width: size, height: size }}
        className={`border-8 border-${color}-400 border-t-transparent rounded-full animate-spin shadow-lg`}
      ></div>
    </div>
  );
};

export default LoadingRing;