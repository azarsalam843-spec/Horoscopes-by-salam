import React, { useEffect, useState } from 'react';

export function StarryBackground() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: string; opacity: number }[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: `${Math.random() * 3 + 2}s`,
        opacity: Math.random() * 0.5 + 0.3,
      }));
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className="atmosphere" />
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': star.duration,
            '--opacity': star.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
