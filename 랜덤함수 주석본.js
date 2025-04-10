// --- 게임 설정 ---
const minNum = 1;
const maxNum = 100;
const maxAttempts = 10; // 최대 시도 가능한 횟수

// --- 게임 실행 함수 ---
function startGame() {
    // 1. 컴퓨터가 1부터 100 사이의 랜덤 숫자 선택
    const secretNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    let attempts = 0;     // 현재 시도 횟수가 쌓이는 중
    let correctGuess = false; // 정답 맞췄는지 여부

    console.log(`--- 숫자 맞추기 게임 시작! (${minNum} ~ ${maxNum}) ---`);
    // console.log(`(개발용 힌트: 정답은 ${secretNumber} 입니다.)`); // 개발/테스트 시 힌트 필요시 주석 해제

    // 게임 루프: 시도 횟수가 남아있고 정답을 맞추지 못한 동안 반복
    while (attempts < maxAttempts && !correctGuess) {
        // 2. 사용자에게 숫자 입력 요청 (prompt 사용)
        const userInput = prompt(`시도 ${attempts + 1}/${maxAttempts}: ${minNum}부터 ${maxNum} 사이의 숫자를 입력하세요:`);

        // 사용자가 '취소'를 누른 경우 (userInput === null)
        if (userInput === null) {
            alert("게임을 중단합니다.");
            console.log("사용자가 게임을 중단했습니다.");
            return; // startGame 함수 종료
        }

        // 시도 횟수 증가
        attempts++;

        // 입력값을 숫자로 변환
        const guess = Number(userInput);

        // 입력값 유효성 검사 (숫자인지, 범위 내인지)
        if (isNaN(guess) || guess < minNum || guess > maxNum) {
            alert(`잘못된 입력입니다. ${minNum}부터 ${maxNum} 사이의 숫자를 입력해주세요.`);
            // 유효하지 않은 입력도 시도 횟수에 포함됩니다.
            // 만약 시도 횟수에서 제외하고 싶다면 아래 줄의 주석을 해제하세요.
            // attempts--;
            continue; // 현재 반복을 건너뛰고 다음 입력 요청
        }

        // 3. 입력 숫자와 정답 비교 (UP)
        if (guess < secretNumber) {
            alert("UP!⬆️"); // alert로 피드백
        }
        // 4. 입력 숫자와 정답 비교 (DOWN)
        else if (guess > secretNumber) {
            alert("DOWN !"); // alert로 피드백
        }
        // 5. 정답을 맞춘 경우
        else {
            correctGuess = true; // 정답 플래그 설정
            // console.log 와 alert 둘 다 사용 가능
            alert(`🎉 축하합니다! ${attempts}번 만에 정답입니다! 🎉`);
            console.log(`🎉 축하합니다! ${attempts}번 만에 정답입니다! 🎉`);
            // while 루프 조건에 의해 루프 종료됨
        }
    } // while 루프 끝

    // 6. 시도 횟수 초과 확인 (루프가 끝난 후 확인)
    // 정답을 못 맞췄고 사용자가 취소하지 않았을 때 실패 메시지 표시
    if (!correctGuess && attempts >= maxAttempts) {
        // console.log 와 alert 둘 다 사용 가능
        alert(`😭 실패! 시도 횟수(${maxAttempts}번)를 초과했습니다. 정답은 ${secretNumber} 였습니다.`);
        console.log(`😭 실패! 시도 횟수(${maxAttempts}번)를 초과했습니다. 정답은 ${secretNumber} 였습니다.`);
    }

    console.log("--- 게임 종료 ---");

} // startGame 함수 끝


startGame();