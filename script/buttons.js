const home_buttons = document.querySelector(".home_buttons");
const gogameBtn = document.querySelector(".gogamebtn");
const nWordBtn = document.querySelector(".newwordbtn");

const diccionary = document.querySelector(".diccionary");
const cancelBtn1 = document.querySelector(".cancelbtn");
const alertString = document.querySelector(".alert");

const game = document.querySelector(".game");
const gamebtn = document.querySelector(".gamebtn");
// const nGameBtn = document.querySelector(".newgamebtn");
const cancelBtn2 = document.querySelector(".dismissbtn");

const rigthW = document.querySelector(".rightword");
const wrongW = document.querySelector(".wrongWord");



// boton de iniciar juego
gogameBtn.addEventListener('click', function () {
    home_buttons.style.display = "none";
    game.style.display = "flex";
    gamebtn.style.display = "flex";
    console.log(gogameBtn);
});
// new words btn
nWordBtn.addEventListener('click', function () {
    home_buttons.style.display = "none";
    diccionary.style.display = "flex";
    console.log(nWordBtn);
});

// boton para cancelar agregar nueva palabra
cancelBtn1.addEventListener('click', function () {
    diccionary.style.display = "none";
    home_buttons.style.display = "flex";
});

// boton para cancelar la partida
cancelBtn2.addEventListener('click', function () {
    game.style.display = "none";
    gamebtn.style.display = "none";
    home_buttons.style.display = "flex";
});

document.querySelector('#newgamebtn').addEventListener('click', () => {
    resetGame();
});










