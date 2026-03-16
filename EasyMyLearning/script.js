// COURSES DATA
const courses = [
    { title: "HTML Basics", desc: "Learn the structure of the web." },
    { title: "CSS Mastery", desc: "Design beautiful websites." },
    { title: "JavaScript", desc: "Make websites interactive." },
    { title: "Python", desc: "Programming made easy." }
];

const courseContainer = document.getElementById("course-container");

courses.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course-card");
    div.innerHTML = `<h3>${course.title}</h3><p>${course.desc}</p>`;
    courseContainer.appendChild(div);
});

// QUIZ DATA
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyperlinks Text Mark Language", correct: false },
            { text: "None", correct: false }
        ]
    },
    {
        question: "Which language is used for styling?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Java", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "JavaScript is used for?",
        answers: [
            { text: "Styling", correct: false },
            { text: "Structure", correct: false },
            { text: "Interactivity", correct: true },
            { text: "Database", correct: false }
        ]
    },
    {
        question: "Which is a programming language?",
        answers: [
            { text: "CSS", correct: false },
            { text: "HTML", correct: false },
            { text: "Python", correct: true },
            { text: "HTTP", correct: false }
        ]
    },
    {
        question: "Which runs in the browser?",
        answers: [
            { text: "Java", correct: false },
            { text: "C++", correct: false },
            { text: "JavaScript", correct: true },
            { text: "Python", correct: false }
        ]
    }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const resultBox = document.getElementById("quiz-result");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    resultBox.classList.add("hide");
    showQuestion();
}

function showQuestion() {
    resetButtons();
    const q = questions[currentQuestion];
    questionText.textContent = q.question;

    q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.onclick = () => selectAnswer(btn, answer.correct);
        answerButtons.appendChild(btn);
    });
}

function resetButtons() {
    answerButtons.innerHTML = "";
}

function selectAnswer(button, correct) {
    if (correct) {
        score++;
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 700);
}

function showResult() {
    document.getElementById("quiz-question-container").classList.add("hide");
    resultBox.classList.remove("hide");
    scoreText.textContent = score;
}

restartBtn.addEventListener("click", () => {
    document.getElementById("quiz-question-container").classList.remove("hide");
    startQuiz();
});

startQuiz();