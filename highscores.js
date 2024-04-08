const highscoreslist = document.getElementById('highscoreslist');
const highscores = JSON.parse(localStorage.getItem('highscore'))


highscoreslist.innerHTML = highscores.map(score=>{
    return `<li class = highscore>${score.name} - ${score.score}</li>`
}).join('')

console.log(highscores)
