# Quiz App

This is a simple Quiz App that fetches questions from the Open Trivia Database API and allows users to answer them. The app keeps track of the user's score and provides feedback on whether the selected answers are correct or incorrect.

## Screenshot
![App Screenshot] [

# Features
- Fetches quiz questions from the Open Trivia Database API.
- Displays a question with multiple choice answers.
- Allows users to select an answer and check if it is correct.
- Keeps track of the user's score and the number of questions asked.
- Provides feedback on the correctness of the selected answer.
- Allows users to restart the quiz after completing all questions.


# How to Use

Clone the repository:
```bash
Open the index.html file in your web browser.
```

The quiz will start automatically, displaying the first question.

Select an answer and click the "Check Answer" button to see if your answer is correct.

The app will display feedback and update your score.

After answering all questions, you can restart the quiz by clicking the "Play Again" button.

# Code Overview

## HTML Elements
#question: Displays the current question.

.quiz-options: Contains the list of answer options.

#correct-score: Displays the user's current score.

#total-question: Displays the total number of questions.

#check-answer: Button to check the selected answer.

#play-again: Button to restart the quiz.

#result: Displays feedback on the selected answer.

# JavaScript Functions
eventListeners(): Adds event listeners to the "Check Answer" and "Play Again" buttons.

loadQuestion(): Fetches a new question from the API and displays it.

showQuestion(data): Displays the fetched question and answer options.

selectOption(): Adds a "selected" class to the clicked answer option.

checkAnswer(): Checks if the selected answer is correct and updates the score.

HTMLDecode(textString): Decodes HTML entities in the correct answer.

checkCount(): Keeps track of the number of questions asked and handles the end of the quiz.

setCount(): Updates the displayed score and total number of questions.

restartQuiz(): Resets the quiz and starts over.

'
# Dependencies

Fetch API: Used to fetch quiz questions from the Open Trivia Database API.
