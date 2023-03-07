// variables ---------------------------------------------
const palabras = ['CASA','HTML', 'JAVASCRIPT', 'CSS', 'DOM', 'PROGRAMA', 'FLEX', 'ALURA', 'ORACLE'];
const verificar = document.querySelector('#verificar');
const wrongletter = document.querySelector('.wrongletter');
const output = document.querySelector('#output');
const input = document.querySelector('#letra');
const newWord = document.querySelector('.newword');
const saveBtn = document.querySelector(".savebtn");
const letters = /^[\sA-Z]+$/;

let palabra = palabras[Math.floor(Math.random() * palabras.length)];
let palabrasConGuiones = palabra.replace(/./g, "_");

const boardContainer = document.getElementById("boardHangman");
const context = boardContainer.getContext("2d");
let gradient1 = context.createLinearGradient(0, 5, 5, 0);
gradient1.addColorStop(0, "brown");
gradient1.addColorStop(0.5, "black");
let gradient2 = context.createLinearGradient(0, 14, 13, 0);
gradient2.addColorStop(1, "black");
gradient2.addColorStop(0.5, "brown");


//code__canvas---------------------------------------------
function clearCanvas() {
    context.clearRect(0, 0, 600, 510);
}

draw = (part) => {
    switch (part) {

        case 'gallows' :
            context.strokeStyle = 'rgba(168,42,0,0.7)';
            context.lineWidth = 10;
            context.beginPath();
            context.moveTo(300, 500);
            context.lineTo(10, 500);
            context.moveTo(40, 500);
            context.lineTo(60, 10);
            context.lineTo(250, 10);
            context.lineTo(250, 100);
            context.stroke();
            break;

        case 'head':
            context.strokeStyle = 'brown';
            context.lineWidth = 10;
            context.beginPath();
            context.arc(250, 138, 40, 0, Math.PI * 2, true);
            context.closePath();
            context.stroke();
            break;

        case 'body':
            context.strokeStyle = 'black';
            context.beginPath();
            context.moveTo(250, 180);
            context.lineTo(250, 350);
            context.stroke();
            break;

        case 'rightHarm':
            context.strokeStyle = gradient2;
            context.beginPath();
            context.moveTo(250, 200);
            context.lineTo(290, 300);
            context.stroke();
            break;

        case 'leftHarm':
            context.strokeStyle = gradient1;
            context.beginPath();
            context.moveTo(250, 200);
            context.lineTo(210, 300);
            context.stroke();
            break;

        case 'rightLeg':
            context.strokeStyle = gradient2;
            context.beginPath();
            context.moveTo(250, 350);
            context.lineTo(260, 450);
            context.stroke();
            break;

        case 'rightFoot':
            context.strokeStyle = 'black';
            context.lineWidth = 15;
            context.beginPath();
            context.moveTo(260, 450);
            context.lineTo(265, 465);
            context.stroke();
            break;

        case 'leftLeg':
            context.beginPath();
            context.moveTo(250, 350);
            context.lineTo(240, 450);
            context.stroke();
            context.beginPath();
            context.moveTo(240, 450);
            context.lineTo(240, 450);
            context.stroke();

            break;

        case 'leftFoot':
            context.strokeStyle = 'black';
            context.lineWidth = 15;
            context.beginPath();
            context.moveTo(240, 450);
            context.lineTo(235, 465);
            context.stroke();
            break;
    }
}
const draws = [
    'gallows',
    'head',
    'body',
    'rightHarm',
    'leftHarm',
    'rightLeg',
    'leftLeg',
    'rightFoot',
    'leftFoot',
]

// code Game---------------------------------------------
String.prototype.replaceAt = function(index, character) {
    const arr = this.split('');
    arr[index]=character;
    return arr.join('');
}

output.innerHTML = palabrasConGuiones;

let step = 0;
const verification = () => {
    let letra = input.value.toUpperCase();
    // console.log("letra " + letra);

    wrongletter.innerHTML += letra;
    
    
    let youfail = true;

    for (const i in palabra) {
        // console.log(i, palabra, letra, letra.length, palabrasConGuiones);

        if (letra === palabra[i]) {

            palabrasConGuiones = palabrasConGuiones.replaceAt(i, letra);
            youfail = false;
        }

    }if (youfail) {
        draw(draws[step++]);

        if (undefined === draws[step]) this.disabled = true;

        if (step === 9) {
            swal.fire({
                title: "haz perdido",
                icon: 'error',
                text: 'puedes volver a intentarlo !!!',
            });
            clearCanvas();
        }}
    if (palabrasConGuiones.indexOf('_') === -1) {
        swal.fire({
            title: "FELICIDADES, Ganaste !!!",
            icon: 'success',
            text: 'puedes volver a jugar!!',
        });
        clearCanvas();
        step = 0;
    }
    input.value = '';
    input.focus();
    output.innerHTML = palabrasConGuiones;
}

verificar.addEventListener('click', verification);

input.addEventListener('keypress', (event) =>{
    if(event.key === "Enter"){
        verification();
    }
});

function resetGame (){
    palabra = palabras[Math.floor(Math.random() * palabras.length)];

    palabrasConGuiones = palabra.replace(/./g, "_");

    step = 0;

    output.innerHTML = palabrasConGuiones;

    wrongletter.innerHTML = "";
    clearCanvas();
}

// code to add new word---------------------------------------------
function validationNword(text) {
    if (text.match(letters)) {
        alertString.style.color = "green";
        alertString.style.fontSize = "30px";
        alertString.textContent = "LISTO !!!";
        swal.fire({
            title:'Palabra Agregada !!!',
            icon: 'success',
            text: 'Puede guardar otra palabra.',
        });
        newWord.value = "";
        return true;
    } else {
        alertString.style.color = "red";
        alertString.style.transition = "500ms all";
        alertString.style.fontSize = "25px";
        alertString.textContent = "Recuerda Máx. 8 letras - Solo letras mayusculas - No simbolos !!!";

        swal.fire({
            title:'No se permiten letras minusculas o simbolos',
            icon: 'error',
        });
        newWord.value = "";
        return false;
    }
}

saveBtn.addEventListener('click', () =>{
    const value = newWord.value;
    
    if(validationNword(value)) {
        palabras.push(value);
    }
    
    console.log({
        value, 
        palabras
    })
});
