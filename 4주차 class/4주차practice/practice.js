const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const messageElement = document.getElementById('message');
const attemptsElement = document.getElementById('attempts');

let secretNumber = Math.floor(Math.random() * 100) + 1; 
let attemptsLeft = 10;
let gameOver = false;

attemptsElement.textContent = `남은 기회: ${attemptsLeft}`;

guessButton.addEventListener('click', checkGuess);

guessInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        event.preventDefault();
        checkGuess();
    }
});

function checkGuess() {
    if (gameOver) {
        return; // 
    }

    const userGuess = parseInt(guessInput.value); 

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        messageElement.textContent = '⚠️ 1부터 100 사이의 숫자를 입력해주세요!';
        guessInput.value = ''; 
        guessInput.focus();  
        return;
    }

    attemptsLeft--;

 
    if (userGuess === secretNumber) {
        messageElement.textContent = `정답입니다! ${secretNumber}`;
  
        endGame();
    } else if (attemptsLeft === 0) {
        messageElement.textContent = `기회를 모두 소진했습니다. 정답은 ${secretNumber}였습니다.`;
 
        endGame();
    } else {
        if (userGuess < secretNumber) {
            messageElement.textContent = `${userGuess} ⬆️ UP!`;
        } else { 
            messageElement.textContent = `${userGuess} ⬇️ DOWN!`;
        }
    }

    attemptsElement.textContent = `남은 기회: ${attemptsLeft}`;

    if (!gameOver) {
        guessInput.value = '';
        guessInput.focus();
    }
}

function endGame() {
    gameOver = true;
    guessInput.disabled = true;  
    guessButton.disabled = true; 
}

guessInput.focus();