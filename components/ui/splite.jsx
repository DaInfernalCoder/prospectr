'use client';
import { Suspense, lazy, useEffect, useRef } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

export function Splite({
  scene,
  className
}) {
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
        />
      </Suspense>
    </div>
  );
}
