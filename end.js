const username = document.getElementById('username')
const saveScorebtn = document.getElementById('save-btn')
const finalscore = document.getElementById('final-Score')
const MAX_HighScores = 5;

const highScores = JSON.parse(localStorage.getItem('highscores')) || [];
console.log(highScores)

const mostrecentscore = localStorage.getItem('mostrecentscore')
finalscore.innerText = mostrecentscore;

username.addEventListener('keyup', ()=>{
saveScorebtn.disabled = !username.value;
})



saveHighScore = (e)=>{
    e.preventDefault()
    const score = {
        score: Math.floor(Math.random(mostrecentscore) * 100 ),
        name:username.value
    }
highScores.push(score)

highScores.sort((a,b)=>{
    return b.sort - a.score
})
highScores.splice(5)

localStorage.setItem('highscore',JSON.stringify(highScores))
setTimeout(()=>{
    window.location.assign('/') 
},2000)
console.log(highScores)
    }