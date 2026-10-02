# Architecture & Documentation

## User flow

```text
index.html
   |
   | local loading simulation
   v
100% ready
   |
   | Start Interview
   v
interview.html
   |
   | answer questions
   v
completion state
```

## Main components

### Loading screen
`index.html` contains the primary candidate-facing loading experience.

### Visual styling
`assets/css/style.css` contains custom visual effects, responsive refinements, animations, and reduced-motion support.

### Loading logic
`assets/js/app.js` controls:

- Progress percentage
- Progress bar
- Step state
- Replay behavior
- CTA enablement
- Navigation to the interview page

### Interview screen
`interview.html` provides a small local question flow. It validates that an answer exists before moving to the next question.

## Design principles

1. Keep the primary action obvious.
2. Avoid claiming that local demo behavior is real AI processing.
3. Preserve readability at narrow widths.
4. Respect users who prefer reduced motion.
5. Keep the project dependency-light.

## Accessibility considerations

- Semantic buttons and headings
- Visible focus styles from browser defaults
- Responsive text sizing
- Reduced-motion media query
- Disabled CTA until the session is ready
