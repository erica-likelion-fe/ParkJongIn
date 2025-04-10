const coutdisplay = document.getElementById("count");
const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");

let count = 0;

increaseButton.addEventListener("click", () =>{
    count++;
    coutdisplay.textContent = count;
});

decreaseButton.addEventListener("click", () =>{
    count--;
    coutdisplay.textContent = count;
});