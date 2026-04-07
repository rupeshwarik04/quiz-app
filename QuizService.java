package com.stock.quizapp.service;

import com.stock.quizapp.model.Question;
import com.stock.quizapp.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    QuestionRepository questionRepo;

    public List<Question> getQuestionsByLevel(String level) {
        int numberOfQuestions = 50;
        return questionRepo.findRandomQuestions(numberOfQuestions);
    }
}