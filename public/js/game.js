const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const quizBody = document.getElementById('quiz-body');
const startContainer = document.getElementById('start-container');


const quiz = JSON.parse(quizz); // full quiz 
const questions = quiz.data;    // questions + answers

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-btns');
let shuffledQuestions, currentQuestionIndex;
let correctIndex = 0;

// result
const resultContainer = document.getElementById('result-box');
const resultButton = document.getElementById('result-btn');
const amountCorrectContainer = document.getElementById('amount-correct');
const amountWrongContainer = document.getElementById('amount-wrong');
const percent = document.getElementById('percentage');
const resultText = document.getElementById('result-sentence');

resultButton.addEventListener('click', showResults);


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame(){
    startButton.classList.add('hide');
    resultButton.classList.add('hide');
    correctIndex = 0;

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
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if(correct) correctIndex++;
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1) // if quiz has a further question
        nextButton.classList.remove('hide');
    else {
        resultButton.classList.remove('hide');
    }
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

function showResults(){
    quizBody.classList.add('hide');
    resultContainer.classList.remove('hide');
    amountCorrectContainer.innerText = 'Correct: '+correctIndex;
    amountWrongContainer.innerText = 'Wrong: '+ (questions.length - correctIndex);
    let quote = parseInt((correctIndex / questions.length) * 100)
    percent.innerText = 'You have known '+ quote +'% of the questions!'

    if(quote >= 80)  resultText.innerText = 'Fantastic Job'
    else if(quote >= 50 && quote < 80)  resultText.innerText = 'Good Job'
    else if(quote >= 20 && quote < 50)  resultText.innerText = 'You can do better!'
    else resultText.innerText = 'Oh no.. maybe next time!'
}