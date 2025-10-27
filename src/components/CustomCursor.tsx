"use client";
import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    // Create cursor elements
    const cursorContainer = document.createElement('div');
    cursorContainer.style.position = 'fixed';
    cursorContainer.style.top = '0';
    cursorContainer.style.left = '0';
    cursorContainer.style.width = '100%';
    cursorContainer.style.height = '100%';
    cursorContainer.style.pointerEvents = 'none';
    cursorContainer.style.zIndex = '999999998'; // Above overlay (99999999), below modal content (999999999)

    // Create 20 circles
    const circles = Array.from({ length: 20 }, () => {
      const circle = document.createElement('div');
      circle.className = 'custom-cursor-circle';
      cursorContainer.appendChild(circle);
      return circle;
    });

    document.body.appendChild(cursorContainer);

    const coords = { x: 0, y: 0 };
    circles.forEach((circle, index) => {
      circle.x = 0;
      circle.y = 0;
      // Use theme color
      circle.style.backgroundColor = '#FBD144';
      circle.style.opacity = ((circles.length - index) / circles.length * 0.5).toString();
    });

    const onMouseMove = (e: MouseEvent) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    };

    const animateCircles = () => {
      let x = coords.x;
      let y = coords.y;

      circles.forEach((circle, index) => {
        circle.style.left = `${x - 12}px`;
        circle.style.top = `${y - 12}px`;
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
        
        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    };

    window.addEventListener('mousemove', onMouseMove);
    animateCircles();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeChild(cursorContainer);
    };
  }, []);

  return null;
}
