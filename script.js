// https://opentdb.com/api.php?amount=10 

const _question = document.getElementById("question");
const _options = document.querySelector(".quiz-options")

const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById("total-question");


const _checkBtn = document.getElementById("check-answer");
const _playAgainBtn = document.getElementById("play-again");
const _result = document.getElementById("result")

let correctAnswer = "";
let correctScore = askedCount = 0;
let totalQuestion = 10;
let quizData = [];


// event listeners on the buttons to check answer
function eventListeners() {
    _checkBtn.addEventListener("click", checkAnswer);
    _playAgainBtn.addEventListener('click', restartQuiz);
}



document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    eventListeners();
    _correctScore.textContent = correctScore;
    _totalQuestion.textContent = totalQuestion;
});




// get question from API

async function loadQuestion() {

    try {   
        const APIUrl = "https://opentdb.com/api.php?amount=1"
        const response = await fetch(`${APIUrl}`);

        if (!response.ok) {
        throw new Error("Network response was not ok");
        }

        const data =  await response.json();
        quizData = data.results;
        currentQuestionIndex = 0;
        _result.innerHTML = "";
        showQuestion(data.results[0]);
    } catch (error) {
        console.error(`Error fetching quiz data,  ${error}`)
    }
}


// check if answer is correct or incorrect
// shuffle the four options
// display the question
// display the list of options 
function showQuestion(data) {
    _checkBtn.disabled = false;
    console.log(data);
   
    let currentQuestion = quizData[currentQuestionIndex];
    
    // let questionNo = currentQuestionIndex + 1;
    correctAnswer = data.correct_answer;
    console.log(correctAnswer);

    let incorrectAnswers = data.incorrect_answers;
    console.log(incorrectAnswers);

    let optionsList = incorrectAnswers;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswers.length + 1)), 0, correctAnswer);
    // inserting correct answer in random position in the options list

    console.log(optionsList);


    _question.innerHTML = ` Q ${askedCount+1}.  ${data.question}
    <br>
    <span class="category">${data.category}</span>`


    _options.innerHTML = `
    ${optionsList.map((option, index) => `
        <li>${index +1}.  <span>  ${option} </span></li>
`).join('') }
`;

selectOption();
}


// when player clicks on option, add class selected
function selectOption() {
    _options.querySelectorAll("li").forEach((option) => {
        option.addEventListener("click", () => {
            if(_options.querySelector(".selected")) {
                const activeOptions = _options.querySelector(".selected");
                activeOptions.classList.remove("selected");

            }
            option.classList.add("selected");
        });
    });
    console.log(correctAnswer)
}


// check selected answer is correct 
// if correct add one to the score
// if incorrect show the correct answer
function checkAnswer() {
    _checkBtn.disabled = true;
    if(_options.querySelector(".selected")) {
        let selectedAnswer = _options.querySelector(".selected span").textContent;
        console.log(selectedAnswer);

        if(selectedAnswer.trim() == HTMLDecode(correctAnswer)) {
            correctScore++;
            _result.innerHTML = `<p> <i class = "fas fa-check"></i>Correct Answer ! </p>`
        } else {
            _result.innerHTML = `<p> <i class = "fas fa-times" ></i> Incorrect Answer !</p><p><small><b> Correct Answer: </b> ${correctAnswer} </small></p>`;
        }
        checkCount();
    } else {
        _result.innerHTML = `<p><i class = "fas fa-question"></i>Please select an option !</p>`
        _checkBtn.disabled = false;
    }
}

// to convert html entities into normal tex of correct answer if there is any

function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

// keep track of questions 
// if end of quiz, to restart
function checkCount() {
    askedCount++;
    setCount();
    if (askedCount == totalQuestion) {
        _result.innerHTML += `<p> Your score is ${correctScore}</p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";

    } else {
        setTimeout(() => {
            loadQuestion();
        }, 3000);
    }
}

// display score and out of total questions
function setCount() {
    _correctScore.textContent = correctScore;
    _totalQuestion.textContent = totalQuestion;
 
}

// to restart quiz at end of the round
function restartQuiz() {
    correctScore = askedCount = 0;
    _playAgainBtn.style.display ="none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount();
    loadQuestion();
}