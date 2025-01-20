# System Patterns
Last Updated: 2024-01-24

## 3D Component Architecture

### Spline Component Pattern
```jsx
// Lazy loading pattern for 3D content
const Spline = lazy(() => import('@splinetool/react-spline'))

// Component with global mouse tracking
export function Splite({
  scene,  // URL to Spline scene
  className // Styling classes
})
```

### Key Technical Patterns

1. **Lazy Loading**
   - Using React.lazy for code splitting
   - Suspense wrapper for loading state
   - Improves initial page load performance

2. **Global Mouse Tracking**
   - Window-level event listeners
   - Coordinate normalization system
   - Clean event listener management
   ```javascript
   // Coordinate normalization pattern
   const normalizedX = (clientX / window.innerWidth) * 2 - 1;
   const normalizedY = (clientY / window.innerHeight) * 2 - 1;
   ```

3. **Reference Management**
   - useRef for stable Spline instance reference
   - Prevents unnecessary re-renders
   - Maintains consistent event handling

4. **Component Integration**
   - Flexible className prop for styling
   - Container-based sizing
   - Responsive design support

## Data Flow

### Mouse Movement Pipeline
1. Window mousemove event captured
2. Coordinates normalized to -1 to 1 range
3. Events emitted to Spline scene
4. Robot updates position/rotation

### Component Lifecycle
1. Lazy load Spline library
2. Initialize scene with provided URL
3. Set up mouse tracking
4. Clean up on unmount

## Technical Decisions

### Why Global Mouse Tracking?
- Enables full-screen robot interaction
- Smoother movement across viewport
- Better user experience

### Why Coordinate Normalization?
- Consistent movement across screen sizes
- Predictable robot behavior
- Easier scene configuration

### Performance Considerations
- Lazy loading reduces initial bundle size
- Event throttling may be needed for performance
- Reference-based updates minimize re-renders

## Integration Guidelines

### Required Scene Setup
- Scene must handle 'mouseMove' events
- Robot should have proper pivot points
- Movement constraints should be configured

### Container Requirements
- Fixed height recommended (e.g., h-[600px])
- Full width for proper scaling
- Proper z-index management
