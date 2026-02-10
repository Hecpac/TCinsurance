---
name: gsap-animate
description: Adds GSAP animations to a component. Handles scroll-triggered reveals, staggered entrances, and micro-interactions. Use when the user wants to animate a component or add motion.
argument-hint: "[ComponentName or description]"
disable-model-invocation: true
---

# Add GSAP Animation

Add GSAP animation to the specified component: `$ARGUMENTS`

## Rules

1. The component **must** have `"use client"` directive
2. Import GSAP and register plugins as needed:
   ```tsx
   import gsap from "gsap";
   import { ScrollTrigger } from "gsap/ScrollTrigger";
   gsap.registerPlugin(ScrollTrigger);
   ```
3. Use `useRef` for element references — never query the DOM directly
4. Use `useGSAP` hook pattern or `useEffect` with proper cleanup:
   ```tsx
   useEffect(() => {
     const ctx = gsap.context(() => {
       // animations here
     }, containerRef);
     return () => ctx.revert();
   }, []);
   ```
5. Prefer subtle, purposeful motion — no gratuitous effects
6. Common patterns for Swiss design:
   - **Fade up**: `y: 40, opacity: 0` → natural position, `duration: 0.8, ease: "power3.out"`
   - **Stagger children**: `stagger: 0.1` on list/grid items
   - **Scroll reveal**: Use `ScrollTrigger` with `start: "top 80%"`
   - **Line draw**: Animate SVG `strokeDashoffset` for rule lines

## Performance
- Use `will-change: transform` sparingly
- Prefer `transform` and `opacity` properties (GPU-accelerated)
- Kill ScrollTrigger instances on cleanup
