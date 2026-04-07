package com.stock.quizapp.controller;

import com.stock.quizapp.model.Question;
import com.stock.quizapp.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin(origins = "http://localhost:3000")
public class QuizController {

    @Autowired
    QuizService service;

    @GetMapping("/all")
    public List<Question> getQuestions() {
        return service.getQuestionsByLevel("any");
    }
}