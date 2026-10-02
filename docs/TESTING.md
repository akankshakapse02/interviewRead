# Testing Documentation

## Testing approach

Testing is documented rather than fabricated. The repository contains test cases that can be executed manually in a browser.

### Viewports to test

| Profile | Width | Height | Status |
|---|---:|---:|---|
| Narrow / mobile | 375px | 812px | Run locally |
| Tablet | 768px | 1024px | Run locally |
| Wide / desktop | 1440px | 900px | Run locally |

## Evidence rule

Do not claim a viewport has passed until it has actually been checked. After running the project, record the result in `docs/SCREENSHOT_EVIDENCE.md` and add real screenshots if desired.

## Functional checks

- Loading starts automatically.
- Progress increases from 0% to 100%.
- Preparation steps change state.
- Start Interview remains disabled during loading.
- Start Interview becomes enabled at 100%.
- Replay restarts the loading sequence.
- Start Interview opens `interview.html`.
- Empty interview answers are rejected.
- Non-empty answers move to the next question.
- Final question reaches the completed state.

## Browser matrix

Recommended manual checks:

- Chrome current
- Edge current
- Firefox current
- Android Chrome

Record the actual browser/version and date when testing.
