'use client';
import { Suspense, lazy, useEffect, useRef } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

export function Splite({
  scene,
  className,
  onLoad
}) {
  // Handle when Spline is loaded
  const handleSplineLoad = () => {
    if (onLoad && typeof onLoad === 'function') {
      onLoad();
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }>
        <Spline 
          scene={scene}
          onLoad={handleSplineLoad}
        />
      </Suspense>
    </div>
  );
}
