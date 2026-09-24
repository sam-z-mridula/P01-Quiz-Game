// DOM Elements

const startScreen     = document.getElementById("start-screen");
const quizScreen      = document.getElementById("quiz-screen");
const resultScreen    = document.getElementById("result-screen");
const startButton     = document.getElementById("start-btn");
const questionText    = document.getElementById("q-text");
const answerContainer = document.getElementById("ans-container");
const currQuestion    = document.getElementById("cur-q");
const totalQuestion   = document.getElementById("total-q");
const score           = document.getElementById("score");
const finalScore      = document.getElementById("final-score");
const maxScore        = document.getElementById("max-score");
const resultMsg       = document.getElementById("result-message");
const restartButton   = document.getElementById("restart-btn");
const progressBar     = document.getElementById("progress");

// QUESTIONS
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let curQidx = 0;
let scr = 0;
let ansDisabled = false;

totalQuestion.textContent = quizQuestions.length;
maxScore.textContent = quizQuestions.length;

// event listener

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    // reset vars
    curQidx = 0;
    scr = 0;
    score.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    // reset state
    ansDisabled = false;

    const curQ = quizQuestions[curQidx];
    currQuestion.textContent = curQidx + 1;

    const progressPercent = (curQidx / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = curQ.question;

    answerContainer.innerHTML = "";
    
    curQ.answers.forEach(ans => {
        const button = document.createElement("button");
        button.textContent = ans.text;
        button.classList.add("ans-btn");

        button.dataset.correct = ans.correct;
        button.addEventListener("click", selectAns);
        answerContainer.appendChild(button);
    })
}

function selectAns(event) {
    if (ansDisabled) return;

    ansDisabled = true;
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    Array.from(answerContainer.children).forEach(btn => {
        if(btn.dataset.correct === "true") {
            btn.classList.add("correct");
        } else if (btn === selectedBtn) {
            btn.classList.add("wrong");
        }
    });

    if (isCorrect) {
        scr++;
        score.textContent = scr;
    }

    setTimeout(() => {
        curQidx++;

        if (curQidx < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScore.textContent = scr;
    const percentage = (scr/quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMsg.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMsg.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMsg.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMsg.textContent = "Not bad! Try again to improve!";
    } else {
        resultMsg.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
}