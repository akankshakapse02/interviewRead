package com.resumelens.controller;

import com.resumelens.service.ResumeAnalysisService;
import com.resumelens.service.ResumeAnalysisService.AnalysisResult;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class ResumeController {
    private final ResumeAnalysisService service;

    public ResumeController(ResumeAnalysisService service) {
        this.service = service;
    }

    @PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> analyze(@RequestParam("resume") MultipartFile resume,
                                     @RequestParam("jobTitle") String jobTitle) {
        try {
            return ResponseEntity.ok(service.analyze(resume, jobTitle));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(java.util.Map.of("message", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.internalServerError()
                    .body(java.util.Map.of("message", "Could not read this PDF. Please try a text-based PDF."));
        }
    }

    @GetMapping("/health")
    public java.util.Map<String, String> health() {
        return java.util.Map.of("status", "UP", "application", "AI Resume Analyzer");
    }
}
