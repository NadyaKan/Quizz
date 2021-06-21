const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const quizBody = document.getElementById('quiz-body');

const quiz = JSON.parse(quizz); // full quiz 
const questions = quiz.data;    // questions + answers

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-btns');
let shuffledQuestions, currentQuestionIndex;


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame(){
    startButton.classList.add('hide');

    shuffledQuestions = questions.sort(() => Math.random() - .5) // number between -0.5 & 0.5
    currentQuestionIndex = 0;
    
    quizBody.classList.remove('hide');
    setNextQuestion();
    
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question + '?';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.option;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    })
}

function resetState(){
    nextButton.classList.add('hide');
    while(answerButtons.firstChild){ //if there is a child
        answerButtons.removeChild(answerButtons.firstChild);
    }
    
}

function selectAnswer(e){   //takes event as paramenter
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1)
        nextButton.classList.remove('hide');
}

function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct)
        element.classList.add('correct');
    else 
        element.classList.add('wrong');
}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}