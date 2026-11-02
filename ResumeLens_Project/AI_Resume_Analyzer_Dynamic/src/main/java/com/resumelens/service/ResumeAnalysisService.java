package com.resumelens.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class ResumeAnalysisService {
    private static final long MAX_SIZE = 5L * 1024 * 1024;
    private static final Map<String, List<String>> ROLE_SKILLS = Map.of(
        "java", List.of("java", "spring boot", "spring", "hibernate", "rest api", "sql", "mysql", "git", "maven", "junit"),
        "software", List.of("java", "python", "javascript", "sql", "git", "rest api", "testing", "data structures"),
        "frontend", List.of("html", "css", "javascript", "react", "responsive design", "git", "api"),
        "data analyst", List.of("sql", "excel", "python", "power bi", "tableau", "statistics", "data visualization"),
        "python", List.of("python", "django", "flask", "sql", "rest api", "git", "pytest")
    );

    public AnalysisResult analyze(MultipartFile file, String jobTitle) throws IOException {
        if (file == null || file.isEmpty()) throw new IllegalArgumentException("Please select a PDF resume.");
        if (file.getSize() > MAX_SIZE) throw new IllegalArgumentException("The PDF must be 5 MB or smaller.");
        String contentType = file.getContentType();
        if ((contentType == null || !contentType.equalsIgnoreCase("application/pdf"))
                && !file.getOriginalFilename().toLowerCase(Locale.ROOT).endsWith(".pdf")) {
            throw new IllegalArgumentException("Please upload a PDF file.");
        }
        if (jobTitle == null || jobTitle.isBlank()) throw new IllegalArgumentException("Please enter a target job title.");

        String resumeText;
        try (PDDocument document = Loader.loadPDF(file.getBytes())) {
            resumeText = new PDFTextStripper().getText(document);
        } catch (Exception e) {
            throw new IllegalArgumentException("This PDF could not be read. Please upload a readable PDF.");
        }
        if (resumeText == null || resumeText.trim().length() < 30) {
            throw new IllegalArgumentException("Not enough readable text was found. Try a text-based PDF instead of a scanned image.");
        }

        String normalized = resumeText.toLowerCase(Locale.ROOT);
        String role = jobTitle.trim();
        List<String> expected = skillsFor(role);
        List<String> matched = expected.stream().filter(normalized::contains).toList();
        List<String> missing = expected.stream().filter(s -> !normalized.contains(s)).toList();
        int score = (int) Math.round(100.0 * matched.size() / Math.max(1, expected.size()));

        List<String> suggestions = new ArrayList<>();
        if (missing.size() > 0) suggestions.add("If you have these skills, add clear evidence of them: " + String.join(", ", missing.subList(0, Math.min(4, missing.size()))) + ".");
        if (!containsAny(normalized, List.of("project", "projects"))) suggestions.add("Add a Projects section with your role, tools used, and measurable result.");
        if (!containsAny(normalized, List.of("education", "qualification"))) suggestions.add("Add an Education section with your degree and graduation year.");
        if (!containsAny(normalized, List.of("experience", "internship", "work experience"))) suggestions.add("Include internship, training, volunteering, or project experience where relevant.");
        if (suggestions.isEmpty()) suggestions.add("Keep bullet points concise and tailor your strongest achievements to the " + role + " role.");
        suggestions.add("Use honest, specific examples. Do not add a skill unless you can explain or demonstrate it.");

        return new AnalysisResult(role, score, matched, missing, suggestions,
                "This is a rule-based keyword coverage estimate, not an ATS score or an AI judgement.");
    }

    private List<String> skillsFor(String role) {
        String r = role.toLowerCase(Locale.ROOT);
        for (var entry : ROLE_SKILLS.entrySet()) {
            if (r.contains(entry.getKey())) return entry.getValue();
        }
        return List.of("communication", "problem solving", "teamwork", "project", "sql", "git", "testing");
    }

    private boolean containsAny(String text, List<String> words) {
        return words.stream().anyMatch(text::contains);
    }

    public record AnalysisResult(String jobTitle, int score, List<String> matchedSkills,
                                List<String> missingSkills, List<String> suggestions, String note) {}
}
