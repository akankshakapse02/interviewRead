# ResumeLens — Dynamic AI Resume Analyzer (starter)

A beginner-friendly full-stack Java project. The frontend is HTML/CSS/JavaScript and the backend is Spring Boot. It reads PDF text with Apache PDFBox and returns a rule-based skill keyword coverage estimate.

## Requirements
- Java 21
- Maven 3.9+ (or Eclipse with Maven support)
- Internet connection for Maven to download dependencies the first time

## Run in Eclipse
1. Extract this ZIP to a normal folder.
2. In Eclipse, choose **File → Import → Maven → Existing Maven Projects**.
3. Select the extracted `AI_Resume_Analyzer_Dynamic` folder and click Finish.
4. Open `ResumeAnalyzerApplication.java`.
5. Right-click → **Run As → Java Application** (or Spring Boot App).
6. Wait until Console shows `Tomcat started on port 8080`.
7. Open http://localhost:8080 in Chrome.

## Run with terminal
From the project folder:
```bash
mvn spring-boot:run
```

## How to use
1. Open the home page.
2. Choose a text-based PDF resume (maximum 5 MB).
3. Enter a target job title such as `Java Developer`.
4. Click **Analyze my resume**.
5. View the estimated skill coverage, matched keywords, skills to consider, and suggestions.

## API
- `GET /api/health` — basic backend health check
- `POST /api/analyze` — multipart form fields `resume` (PDF) and `jobTitle` (text)

## Important honesty note
This is a **dynamic, rule-based resume analyzer starter**, not a real generative AI model or an official ATS score. It does not save resumes or require login. It is designed for learning and demonstration. It works best with PDFs containing selectable text, not scanned image-only PDFs.
