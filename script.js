const question = [
    {
        question: "What is JavaScript?",
        answers: [
            { text: "Markup Language", correct: false},
            { text: "Programming Language", correct: true},
            { text: "Database", correct: false},
            { text: "Styling Language", correct: false},
        ]
    },
    {
        question: "Which symbol is used for comments in JavaScript (single line)?",
        answers: [
            { text: "//", correct: true},
            { text: "^$", correct: false},
            { text: "#", correct: false},
            { text: "**", correct: false},
        ]
    },
    {
        question: "Which function is used to parse JSON?",
        answers: [
            { text: "convert.JSON()", correct: false},
            { text: "parse.JSON()", correct: false},
            { text: "JSON.stringify()", correct: false},
            { text: "JSON.parse()", correct: true},
        ]
    },
    {
        question: "Which attribute is required in <input> for form validation?",
        answers: [
            { text: "validate", correct: false},
            { text: "validateInput", correct: false},
            { text: "required", correct: true},
            { text: "must", correct: false},
        ]
    },
    {
        question: "What does defer attribute do in <script>?",
        answers: [
            { text: "Runs script immediately", correct: false},
            { text: "Delays script until HTML parsing is complete", correct: true},
            { text: "Stops script execution", correct: false},
            { text: "Loads CSS", correct: false},
        ]
    },
    {
        question: "Which loop runs at least once?",
        answers: [
            { text: "for", correct: false},
            { text: "while", correct: false},
            { text: "do-for", correct: false},
            { text: "do-while", correct: true},
        ]
    },
    {
        question: "Which is NOT a primitive type?",
        answers: [
            { text: "string", correct: false},
            { text: "number", correct: false},
            { text: "object", correct: true},
            { text: "boolean", correct: false},
        ]
    },
    {
        question: "What will happen in Temporal Dead Zone (TDZ)?",
        answers: [
            { text: "Variable becomes global", correct: false},
            { text: "Returns undefined", correct: false},
            { text: "Throws ReferenceError", correct: true},
            { text: "Becomes null", correct: false}
       ]
    },
    {
        question: "What is the output of [] == ![]?",
        answers: [
            { text: "true", correct: true},
            { text: "false", correct: false},
            { text: "undefined", correct: false},
            { text: "error", correct: false}
        ]
    },
    {
        question: "What is the output of [] + {}?",
        answers: [
            { text: "[object Object]", correct: false},
            { text: "\"[object Object]\"", correct: true},
            { text: "[]", correct: false},
            { text: "error", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();