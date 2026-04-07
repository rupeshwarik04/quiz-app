package com.stock.quizapp.repository;

import com.stock.quizapp.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    @Query(value = "SELECT * FROM question ORDER BY RAND() LIMIT :numQ", nativeQuery = true)
    List<Question> findRandomQuestions(@Param("numQ") int numQ);

}
