const foodbutton = document.querySelectorAll(".food");
const submitbutton = document.querySelector(".submit");

submitbutton.disabled = true;

foodbutton.forEach((btn) => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("selected");
        updatesubmit();
    });
});  

function updatesubmit() {
    const selected = document.querySelectorAll(".food.selected");
    const isActive = selected.length > 0;
    console.log(selected)
    submitbutton.disabled = !isActive;
    console.log(isActive)
    if (isActive) {
        submitbutton.classList.add("selected");
    } else {
        submitbutton.classList.remove("selected");
    }
};

submitbutton.addEventListener("click", () => {
    const selected = document.querySelectorAll(".food.selected");
    const selectedNames = Array.from(selected).map((item) => item.textContent);
    console.log("선택한 음식" + selectedNames);
});