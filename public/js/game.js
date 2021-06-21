const startButton = document.getElementById('start-btn');
const quizBody = document.getElementById('quiz-body');
const quiz = JSON.parse(quizz);

startButton.addEventListener('click', startGame)

function startGame(){
    startButton.classList.add('hide');
    quizBody.classList.remove('hide')
    
    console.log(quiz.title);
    console.log(quiz.creator);
    console.log('Question:\n')
    quiz.data.forEach(data => {
        console.log(data.question);
        console.log('Possible Answers:')
        data.answer.forEach(answers => {
            console.log(answers.option+' : '+answers.correct);
        })
    });
    
    

}

function setNextQuestion(){
}


function selectAnswer(){

}