# Manual Test Cases

| ID | Test | Expected result |
|---|---|---|
| TC01 | Open `index.html` | Loading page renders |
| TC02 | Observe loading | Progress moves toward 100% |
| TC03 | During loading | Start Interview is disabled |
| TC04 | Reach 100% | Start Interview becomes enabled |
| TC05 | Click Replay Loading | Progress restarts |
| TC06 | Click Start Interview | `interview.html` opens |
| TC07 | Click Next with empty answer | Validation message appears |
| TC08 | Enter answer and click Next | Next question appears |
| TC09 | Complete final question | Completion state appears |
| TC10 | Test at 375px width | No horizontal overflow |
| TC11 | Test at 768px width | Layout remains usable |
| TC12 | Test at 1440px width | Desktop layout renders correctly |
| TC13 | Enable reduced motion | Animations are minimized |
| TC14 | Refresh page | Loading sequence starts again |
| TC15 | Use browser back button | Previous page remains usable |
