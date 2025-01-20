'use client';
import { Suspense, lazy, useEffect, useRef } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

export function Splite({
  scene,
  className
}) {
  const splineRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (splineRef.current && containerRef.current) {
        const container = containerRef.current.getBoundingClientRect();
        
        // Get the center point of the container
        const centerX = container.left + (container.width / 2);
        const centerY = container.top + (container.height / 2);
        
        // Calculate the distance from the mouse to the center
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        // Normalize based on the maximum possible distance (half the container size)
        const maxDistance = Math.max(container.width, container.height) / 2;
        const normalizedX = deltaX / maxDistance;
        const normalizedY = deltaY / maxDistance;
        
        // Clamp values between -1 and 1
        const clampedX = Math.max(-1, Math.min(1, normalizedX));
        const clampedY = Math.max(-1, Math.min(1, normalizedY));

        // Invert Y axis to match Spline's coordinate system
        splineRef.current.emitEvent('mouseMove', [clampedX, -clampedY]);
      }
    };

    // Add listener to window instead of container
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }>
        <Spline 
          scene={scene} 
          onLoad={(splineApp) => splineRef.current = splineApp}
        />
      </Suspense>
    </div>
  );
}
