# Active Context
Last Updated: 2024-01-24

## Current Focus
- Implementing and optimizing the 3D Spline robot component in the Hero section
- Working on global cursor tracking for the robot's head movement

## Recent Changes
1. Installed @splinetool/react-spline package
2. Created Splite component with proper structure and lazy loading
3. Implemented global cursor tracking using window events
4. Added coordinate normalization for smooth robot movement

## Active Files
- components/ui/splite.jsx: Main Spline component implementation
- components/Hero.js: Integration of Spline component
- package.json: Added @splinetool/react-spline dependency

## Next Steps
1. Test robot movement behavior across different screen sizes
2. Consider adding loading optimization for the 3D model
3. Add error boundaries for better error handling
4. Document Spline scene requirements for future updates

## Current Implementation Details
- Using React.lazy for performance optimization
- Window-level mouse tracking for full-screen cursor following
- Coordinate normalization (-1 to 1) for precise movement
- Proper cleanup of event listeners in useEffect
