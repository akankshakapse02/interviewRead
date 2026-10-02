# AI Interview Assistant

A responsive front-end mini project that presents a polished AI interview preparation loading experience and a simple practice interview workspace.

## What this project demonstrates

- Responsive HTML UI with Tailwind CSS utility classes
- Custom CSS animations for the AI visual
- JavaScript-controlled loading progress
- Accessible disabled/enabled CTA behavior
- Reduced-motion support
- Simple interview question flow
- Clear disclosure that the loading process is a local demo simulation

## Tech Stack

- HTML5
- Tailwind CSS via CDN
- CSS3
- Vanilla JavaScript

## Run locally

No build tool is required.

1. Download or clone the project.
2. Open the folder in VS Code.
3. Open `index.html` with a local server such as VS Code Live Server.
4. Wait for the loading state to reach 100%.
5. Select **Start Interview**.

The Tailwind CDN requires an internet connection while loading the page. The custom CSS and JavaScript are local.

## Project structure

```text
ai-interview-assistant/
├── index.html
├── interview.html
├── README.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── TESTING.md
│   └── SCREENSHOT_EVIDENCE.md
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
└── tests/
    └── manual-test-cases.md
```

## Important scope note

This is a front-end prototype. The loading sequence is simulated locally and does not represent a real model inference, API call, or candidate evaluation. The interview page currently uses a small local question set.

## Future improvements

- Spring Boot REST API
- Database-backed question bank
- Real authentication
- Candidate session persistence
- Server-side scoring
- AI provider integration with transparent disclosure
- Automated browser testing

## Project Status

This project is a front-end AI interview assistant prototype.
The interview loading process and questions are simulated locally.
No external AI API or candidate evaluation service is connected.


## Screenshots

### Desktop Loading Page
![Desktop Loading Page](docs/screenshots/desktop-loading.png)

### Mobile Loading Page
![Mobile Loading Page](docs/screenshots/mobile-loading.png)

### Tablet Loading Page
![Tablet Loading Page](docs/screenshots/tablet-loading.png)

### Interview Page
![Interview Page](docs/screenshots/interview-page.png)

### Interview Completed
![Interview Completed](docs/screenshots/interview-completed.png)
#null 