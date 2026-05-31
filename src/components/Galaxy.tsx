import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  hue: number;
  size: number;
}

interface GalaxyProps {
  density?: number;
  starSpeed?: number;
  glowIntensity?: number;
  transparent?: boolean;
  hueShift?: number;
  saturation?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Galaxy({
  density = 1,
  starSpeed = 0.3,
  glowIntensity = 0.35,
  transparent = false,
  hueShift = 145,
  saturation = 18,
  className = '',
  style,
}: GalaxyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    const numStars = Math.floor(280 * density);
    const stars: Star[] = [];

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStar = (star: Star, scatter = false) => {
      star.x = (Math.random() - 0.5) * canvas.width;
      star.y = (Math.random() - 0.5) * canvas.height;
      star.z = scatter ? Math.random() * canvas.width : canvas.width;
      star.px = 0;
      star.py = 0;
      star.hue = hueShift + (Math.random() - 0.5) * 40;
      star.size = Math.random() * 1.2 + 0.4;
    };

    setSize();
    window.addEventListener('resize', setSize);

    for (let i = 0; i < numStars; i++) {
      const star: Star = { x: 0, y: 0, z: 0, px: 0, py: 0, hue: 0, size: 0 };
      initStar(star, true);
      stars.push(star);
    }

    const draw = () => {
      if (!ctx || !canvas) return;

      if (transparent) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = 'rgb(5, 10, 7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const speed = starSpeed * 1.8;

      for (const star of stars) {
        // Store previous projected position for trail
        star.px = (star.x / star.z) * canvas.width + cx;
        star.py = (star.y / star.z) * canvas.height + cy;

        star.z -= speed;

        if (star.z <= 1) {
          initStar(star);
          continue;
        }

        const sx = (star.x / star.z) * canvas.width + cx;
        const sy = (star.y / star.z) * canvas.height + cy;

        if (sx < -50 || sx > canvas.width + 50 || sy < -50 || sy > canvas.height + 50) {
          initStar(star);
          continue;
        }

        const alpha = Math.min(1, (1 - star.z / canvas.width) * 1.6);
        const size = Math.max(0.05, star.size * (1 - star.z / canvas.width) * 2.5);
        const l = 55 + alpha * 30;

        // Trail line
        ctx.beginPath();
        ctx.moveTo(star.px, star.py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `hsla(${star.hue}, ${saturation}%, ${l}%, ${alpha * 0.35})`;
        ctx.lineWidth = size * 0.5;
        ctx.stroke();

        // Star dot with faster manual glow (avoids expensive canvas shadowBlur)
        if (glowIntensity > 0) {
          ctx.beginPath();
          ctx.arc(sx, sy, size * 2.5 * glowIntensity, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${star.hue}, ${saturation + 25}%, 80%, ${alpha * 0.18})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, ${saturation}%, ${l}%, ${alpha})`;
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', setSize);
    };
  }, [density, starSpeed, glowIntensity, transparent, hueShift, saturation]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', ...style }}
    />
  );
}
