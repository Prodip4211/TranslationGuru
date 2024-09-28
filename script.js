let currentQuestion = 0;
let score = 0;
let timeLimit = 5;
let questionCount = 3;
let gamePaused = false;
let darkModeEnabled = false;

const questions = [
    { question: "Apple এর বাংলা অনুবাদ কি?", answer: "আপেল" },
    { question: "Orange এর বাংলা অনুবাদ কি?", answer: "কমলা" },
    { question: "Book এর বাংলা অনুবাদ কি?", answer: "বই" }
];

document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('submitAnswer').addEventListener('click', checkAnswer);
document.getElementById('pauseGame').addEventListener('click', pauseGame);
document.getElementById('settingsButton').addEventListener('click', openSettings);
document.getElementById('saveSettings').addEventListener('click', saveSettings);
document.getElementById('darkModeToggle').addEventListener('change', toggleDarkMode);

function startGame() {
    document.querySelector('.interface').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion < questionCount) {
        document.getElementById('question').innerText = questions[currentQuestion].question;
    } else {
        endGame();
    }
}

function checkAnswer() {
    let userAnswer = document.getElementById('answerInput').value.trim();
    if (userAnswer === questions[currentQuestion].answer) {
        showReaction('love');
        score++;
    } else {
        showReaction('sad');
    }
    currentQuestion++;
    setTimeout(loadQuestion, 1000);
}

function showReaction(type) {
    const reactionDiv = document.getElementById('reaction');
    if (type === 'love') {
        reactionDiv.innerText = '😍 সঠিক উত্তর!';
    } else {
        reactionDiv.innerText = '😢 ভুল উত্তর!';
    }
    setTimeout(() => reactionDiv.innerText = '', 2000);
}

function endGame() {
    document.getElementById('score').innerText = `Game Over! সঠিক উত্তর: ${score}, ভুল উত্তর: ${questionCount - score}`;
    document.getElementById('question').innerText = '';
    document.getElementById('answerInput').style.display = 'none';
    document.getElementById('submitAnswer').style.display = 'none';
}

function pauseGame() {
    gamePaused = !gamePaused;
    document.getElementById('pauseGame').innerText = gamePaused ? 'Continue' : 'Paused';
}

function openSettings() {
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('settingsArea').style.display = 'block';
}

function saveSettings() {
    timeLimit = parseInt(document.getElementById('timeLimit').value);
    questionCount = parseInt(document.getElementById('questionCount').value);
    document.getElementById('settingsArea').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
}

function toggleDarkMode() {
    darkModeEnabled = !darkModeEnabled;
    if (darkModeEnabled) {
        document.body.style.backgroundColor = "#222";
        document.body.style.color = "white";
    } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    }
}