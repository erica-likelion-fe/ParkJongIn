const input = prompt("소수를 확인할 숫자를 입력하세요.");
const num = Number(input);

function isprime(n) {
    if (n< 2) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false; 
        }
    }
    return true;

    }
console.log(isprime(num) ? `${num} 이건 소수임.` : `${num} 이건 소수가 아님.`);