const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let timerInterval;
let gameStarted = false;

function createCards() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<div class="card-content">❓</div>`;
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.onclick = () => flipCard(card);
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }

    card.classList.add('flipped');
    card.querySelector('.card-content').textContent = card.dataset.emoji;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    setTimeout(() => {
        if (card1.dataset.emoji === card2.dataset.emoji) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            
            if (matchedPairs === emojis.length) {
                endGame();
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.querySelector('.card-content').textContent = '❓';
            card2.querySelector('.card-content').textContent = '❓';
        }
        flippedCards = [];
    }, 1000);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById('timer').textContent = timer;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function endGame() {
    stopTimer();
    document.getElementById('finalTime').textContent = timer;
    document.getElementById('finalMoves').textContent = moves;
    document.getElementById('winMessage').style.display = 'block';
}

function hideWinMessage() {
    document.getElementById('winMessage').style.display = 'none';
}

function startNewGame() {
    stopTimer();
    timer = 0;
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    gameStarted = false;
    
    document.getElementById('timer').textContent = '0';
    document.getElementById('moves').textContent = '0';
    
    createCards();
}

// Inicializar el juego
createCards();
   