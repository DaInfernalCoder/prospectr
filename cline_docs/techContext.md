# Technical Context
Last Updated: 2024-01-24

## Core Technologies

### 3D Integration
- **@splinetool/react-spline**: ^2.2.6
  - React wrapper for Spline 3D scenes
  - Provides scene loading and interaction APIs
  - Supports event-based animations

### Frontend Framework
- Next.js
- React (with Hooks)
- Tailwind CSS for styling

## Development Environment

### Required Dependencies
```json
{
  "@splinetool/react-spline": "^2.2.6"
}
```

### Browser Support
- Modern browsers with WebGL support required
- Fallback loading state provided for slower connections
- Progressive enhancement approach

## Integration Points

### Component Location
- components/ui/splite.jsx: Main component
- components/Hero.js: Implementation

### Event System
- Uses window-level event listeners
- Normalized coordinate system
- Custom event emission to Spline scene

## Technical Constraints

### Performance
- 3D model size impacts initial load
- Lazy loading implemented for optimization
- Event handling optimized for smooth tracking

### Browser Requirements
- WebGL support needed
- Modern browser APIs used
- Responsive design considerations

## Development Workflow

### Local Development
1. Install dependencies: `npm install`
2. Import Splite component
3. Provide scene URL
4. Configure container dimensions

### Testing Requirements
- Verify mouse tracking across viewport
- Check loading performance
- Test responsive behavior

## Configuration

### Scene URL Format
```javascript
scene="https://prod.spline.design/[scene-id]/scene.splinecode"
```

### Container Setup
```jsx
<div className="lg:w-full h-[600px]">
  <Splite 
    scene="[scene-url]"
    className="w-full h-full"
  />
</div>
```

## Known Limitations

### Current Implementation
- Scene must be pre-configured for mouse tracking
- Initial loading time dependent on model size
- Requires client-side JavaScript

### Future Considerations
- Potential for event throttling
- Mobile touch event support
- Loading optimization strategies
