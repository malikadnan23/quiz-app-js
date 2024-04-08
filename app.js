const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName('choice-text'))
const progresstext = document.getElementById('progress-text')
const Scoretext  = document.getElementById('Score')
const Progressbarfull = document.getElementById('progress-Bar-full')
const loader = document.getElementById('loader')
const game = document.getElementById('game')
let currentQuestion = {};
let acceptinganswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
]
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then(res=>{
    return res.json()
}).then(loadedQuestions=>{
    console.log(loadedQuestions.results)
    questions = loadedQuestions.results.map(loadedQuestion=>{
        const formatedquestion ={
            question:loadedQuestion.question
        }
        const answerchoices = [...loadedQuestion.incorrect_answers];
        formatedquestion.answer = Math.floor(Math.random()*3) +1 ;
        answerchoices.splice(formatedquestion.answer -1 , 0,
            loadedQuestion.correct_answer)

            answerchoices.forEach((choice,index)=>{
                formatedquestion['choice'+ (index+1)]=choice;
            })
            return formatedquestion
    })
    // questions = loadedQuestions
    
    startGame()
}).catch(error=>{
    console.log(error)
})

const CORRECT_BONUS= 10;
const MAX_Questions = 3;

startGame = ()=>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestions();
    game.classList.remove('hidden')
    loader.classList.add('hidden')
}
getNewQuestions = ()=>{
if(availableQuestions.length === 0 || questionCounter >= MAX_Questions){
    localStorage.setItem('mostrecentscore',score)
    return window.location.assign('/end.html')
}

    questionCounter++;
    progresstext.innerText= `Question: ${questionCounter}/${MAX_Questions}`

    Progressbarfull.style.width= `${(questionCounter/MAX_Questions ) * 100}%`;

    const questionIndex = Math.floor(Math.random()* availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question;
    
    choices.forEach(choice=>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionIndex,1);
    acceptinganswer  = true
}

choices.forEach((choice)=>{
choice.addEventListener('click',(e)=>{
    if(!acceptinganswer) return;

    acceptinganswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number']
   
    // const classToApply = 'incorrect';
    // if (selectedAnswer == currentQuestion.answer){
    //     classToApply= 'correct'
    // }
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
if(classToApply === 'correct'){
    incrementscore(CORRECT_BONUS)
}


   selectedChoice.parentElement.classList.add(classToApply);


   setTimeout(()=>{
    selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestions()
   },1000)
 
})
})

incrementscore = (num) =>{
    score += num;
    Scoretext.innerText = score;
}


