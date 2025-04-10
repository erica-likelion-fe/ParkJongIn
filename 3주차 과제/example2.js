const minNum = 1;
const maxNum = 100;
const maxAttempts = 10; 


function startGame() {

    const secretNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    let attempts = 0;    
    let correctGuess = false; 

    console.log(`10번 안에 맞춰보쇼 (${minNum} ~ ${maxNum})`);
  

    while (attempts < maxAttempts && !correctGuess) {

        const userInput = prompt(`시도 ${attempts + 1}/${maxAttempts}: ${minNum}부터 ${maxNum} 사이의 숫자를 입력하세요:`);

        if (userInput === null) {
            alert("게임을 중단합니다.");
            console.log("사용자가 게임을 중단했습니다.");
            return; 
        }


        attempts++;

        const guess = Number(userInput);

        if (isNaN(guess) || guess < minNum || guess > maxNum) {
            alert(`잘못된 입력입니다. ${minNum}부터 ${maxNum} 사이의 숫자를 입력해주세요.`);
            continue; 
        }

        if (guess < secretNumber) {
            alert("UP!"); 
        }
        else if (guess > secretNumber) {
            alert("DOWN!"); 
        }

        else {
            correctGuess = true; 

            alert(`You Win ${attempts}번 만에 정답입니다! `);
            console.log(`You Win ${attempts}번 만에 정답입니다!`);

        }
    } 


    if (!correctGuess && attempts >= maxAttempts) {

        alert(` You lose 시도 횟수(${maxAttempts}번)를 초과했습니다. 정답은 ${secretNumber} 였습니다.`);
        console.log(`You lose 시도 횟수(${maxAttempts}번)를 초과했습니다. 정답은 ${secretNumber} 였습니다.`);
    }

    console.log("--- 게임 종료 ---");

} 

startGame();