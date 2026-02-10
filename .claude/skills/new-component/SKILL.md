---
name: new-component
description: Creates a new React component following Swiss International Style design system and project conventions. Use when the user asks to create a UI component, section, or page element.
argument-hint: "[ComponentName]"
disable-model-invocation: true
---

# Create New Component

Create a new component named `$ARGUMENTS` in `src/components/$ARGUMENTS.tsx`.

## Requirements

1. **Determine client vs server**: Only add `"use client"` if the component needs interactivity (click handlers, GSAP animations, useState, useEffect)
2. **Use TypeScript**: Define a `Props` interface if the component accepts props
3. **Follow Swiss design**: Use only project tokens (`swiss-paper`, `swiss-black`, `swiss-red`, `swiss-gray`, `text-display`, `text-body`, `text-meta`)
4. **Semantic HTML**: Use appropriate elements (`<section>`, `<header>`, `<nav>`, etc.)
5. **No border-radius**: Never use `rounded-*` classes
6. **Generous whitespace**: Use adequate padding and margins

## Template

```tsx
// "use client" — only if interactive

interface Props {
  // define props here
}

export default function $ARGUMENTS({ }: Props) {
  return (
    <section className="bg-swiss-paper">
      {/* component content */}
    </section>
  );
}
```

## After Creating

1. Verify the component renders correctly by checking for TypeScript errors
2. Import it in the appropriate page file
