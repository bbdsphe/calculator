// Calculator application logic entry point

const oneButton = document.getElementById('one');
const twoButton = document.getElementById('two');
const threeButton = document.getElementById('three');
const fourButton = document.getElementById('four');
const fiveButton = document.getElementById('five');
const sixButton = document.getElementById('six');
const sevenButton = document.getElementById('seven');
const eightButton = document.getElementById('eight');
const nineButton = document.getElementById('nine');
const pointButton = document.getElementById('point');

const leftParenButton = document.getElementById('left-paren');
const rightParenButton = document.getElementById('right-paren');

const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');
const multiplyButton = document.getElementById('multiply');
const divideButton = document.getElementById('divide');
const powerButton = document.getElementById('power');
const moduloButton = document.getElementById('modulo');
const sinButton = document.getElementById('sin');
const cosButton = document.getElementById('cos');
const tanButton = document.getElementById('tan');

const equalButton = document.getElementById('equal');

const clearAllButton = document.getElementById('clear-all');
const deleteButton = document.getElementById('delete');

const display = document.getElementById('display');

let string = '0';

function updateDisplay() {
    display.textContent = string;
}

function appendString(character) {
    if (string == '0') string = '';

    string += character
}

function backspace() {
    if (
        string.slice(string.length - 4, string.length) == 'sin(' ||
        string.slice(string.length - 4, string.length) == 'cos(' ||
        string.slice(string.length - 4, string.length) == 'tan('
    ) {
        string = string.slice(0, string.length - 4);
    } else {
        string = string.slice(0, string.length - 1);
    }
}

function clearAll() {
    string = '0';
}

oneButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('1');
    updateDisplay();
});

twoButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('2');
    updateDisplay();
});

threeButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('3');
    updateDisplay();
});

fourButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('4');
    updateDisplay();
});

fiveButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('5');
    updateDisplay();
});

sixButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('6');
    updateDisplay();
});

sevenButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('7');
    updateDisplay();
});

eightButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('8');
    updateDisplay();
});

nineButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('9');
    updateDisplay();
});

pointButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('.');
    updateDisplay();
});

leftParenButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('(');
    updateDisplay();
});

rightParenButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString(')');
    updateDisplay();
})

addButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('+');
    updateDisplay();
});

subtractButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('-');
    updateDisplay();
});

multiplyButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('*');
    updateDisplay();
});

divideButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('/');
    updateDisplay();
});

powerButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('^');
    updateDisplay();
});

moduloButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('%');
    updateDisplay();
});

sinButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('sin(');
    updateDisplay();
});

cosButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('cos(');
    updateDisplay();
});

tanButton.addEventListener('click', (event) => {
    event.preventDefault();

    appendString('tan(');
    updateDisplay();
});

equalButton.addEventListener('click', (event) => {
    event.preventDefault();

    let infix = parseExpression(string);
    let postfix = infixToPostfix(infix);
    let value = evaluatePostfix(postfix);

    string = value.toString();
    updateDisplay();
});

clearAllButton.addEventListener('click', (event) => {
    event.preventDefault();

    clearAll();
    updateDisplay();
});

deleteButton.addEventListener('click', (event) => {
    event.preventDefault();

    backspace();
    updateDisplay();
});