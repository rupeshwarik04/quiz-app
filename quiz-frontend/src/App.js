import React, { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  // Fetch questions
  useEffect(() => {
    fetch("http://localhost:8080/quiz/all")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  // Timer logic
  useEffect(() => {
    if (showScore) return;

    if (timeLeft === 0) {
      handleNext(); // auto move
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswer = (optionIndex) => {
    setSelected(optionIndex);

    if (optionIndex === questions[current].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setTimeLeft(15); // reset timer

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowScore(true);
    }
  };

  if (questions.length === 0) return <h2>Loading...</h2>;

  if (showScore) {
    return (
      <div style={styles.container}>
        <h2>🎉 Quiz Finished</h2>
        <h3>
          Your Score: {score} / {questions.length}
        </h3>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div style={styles.container}>
      <h3>
        Question {current + 1} / {questions.length}
      </h3>

      <h2>{q.question}</h2>

      {/* TIMER */}
      <h3 style={{ color: timeLeft <= 3 ? "red" : "black" }}>
        ⏳ Time Left: {timeLeft}s
      </h3>

      {[q.option1, q.option2, q.option3, q.option4].map((opt, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(index + 1)}
          style={{
            ...styles.button,
            backgroundColor:
              selected === index + 1 ? "#8e44ad" : "#ecf0f1", // purple
            color: selected === index + 1 ? "white" : "black",
          }}
        >
          {opt}
        </button>
      ))}

      <br />
      <button onClick={handleNext} style={styles.nextBtn}>
        Next
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  button: {
    display: "block",
    margin: "10px auto",
    padding: "10px 20px",
    width: "300px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  nextBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default App;