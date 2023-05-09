/**
 * Document Element References
 */

let numberZeroButton = document.getElementById('0');
let numberOneButton = document.getElementById('1');
let numberTwoButton = document.getElementById('2');
let numberThreeButton = document.getElementById('3');
let numberFourButton = document.getElementById('4');
let numberFiveButton = document.getElementById('5');
let numberSixButton = document.getElementById('6');
let numberSevenButton = document.getElementById('7');
let numberEightButton = document.getElementById('8');
let numberNineButton = document.getElementById('9');
let openParenButton = document.getElementById('open-paren');
let closeParenButton = document.getElementById('close-paren');

let pointButton = document.getElementById('.');

let addButton = document.getElementById('add');
let subtractButton = document.getElementById('subtract');
let multiplyButton = document.getElementById('multiply');
let divideButton = document.getElementById('divide');
let equalButton = document.getElementById('=');

let clearAllButton = document.getElementById('ac');
let clearEntryButton = document.getElementById('ce');

let displayContainer = document.getElementById('display');

/**
 * Global Variables
 */

let result = 0;

let tokens = [];

let string = '';

/**
 * Utility Functions
 */

function isNumber(character) {
    return (character >= '0' && character <= '9');
}

function isOperator(character) {
    return (
        character == '+' ||
        character == '-' ||
        character == '*' ||
        character == '/'
    );
}

function parseEquationString(string) {
    let currentSymbol = '';

    for (let index = 0; index < string.length; index += 1) {
        let character = string[index];
        
        if (isNumber(character) || character == '.') {
            currentSymbol += character;
        }
        
        else {
            if (currentSymbol != '') {
                tokens.push(currentSymbol);
                currentSymbol = '';
            }

            tokens.push(character);
        }
    }

    if (currentSymbol !== '') tokens.push(currentSymbol);

    console.log(tokens);
}

function infixToPostfix(infix) {
    let bodmas = {
        '-': 1,
        '+': 1,
        '/': 2,
        '*': 2,
    }

    let postfix = [];

    let operatorStack = [];

    infix.forEach((token) => {
        console.log(token);
        if (!isNaN(parseFloat(token))) {
            postfix.push(token);
        } else if (isOperator(token)) {
            while (
                operatorStack.length > 0 &&
                operatorStack[operatorStack.length - 1] != '(' && // Top element not opening paren
                bodmas[token] <= bodmas[operatorStack[operatorStack.length - 1]]
            ) {
                postfix.push(operatorStack.pop());
            }
            operatorStack.push(token);
        } else if (token == '(') {
            operatorStack.push(token);
        } else if (token == ')') {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] != '(') {
                postfix.push(operatorStack.pop());
            }
            
            if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] == '(')  {
                operatorStack.pop();
            }
        }
    });

    while (operatorStack.length > 0) {
        postfix.push(operatorStack.pop());
    }

    tokens = postfix;
}

function computeEquation(postfix) {
    let stack = [];

    for (let index = 0; index < postfix.length; index += 1) {
        let token = postfix[index];

        if (!isNaN(parseFloat(token))) {
            stack.push(parseFloat(token));
        } else {
            let secondOperand = stack.pop();
            let firstOperand = stack.pop();

            let value;

            switch(token) {
                case '+':
                    value = firstOperand + secondOperand;
                    break;
                case '-':
                    value = firstOperand - secondOperand;
                    break;
                case '*':
                    value = firstOperand * secondOperand;
                    break;
                case '/':
                    value = firstOperand / secondOperand;
                    break;

                default:
                    break;
            }

            stack.push(value);
        }
    }

    result = stack.pop();
}

function updateDisplay() {
    displayContainer.textContent = string;
}

function clearAll() {
    string = '';
    tokens = [];
    result = '';
}

/**
 * Event Listeners
 */

numberZeroButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '0';
    updateDisplay();
    console.log(string);
});

numberOneButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '1';
    updateDisplay();
    console.log(string);
});

numberTwoButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '2';
    updateDisplay();
    console.log(string);
});

numberThreeButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '3';
    updateDisplay();
    console.log(string);
});

numberFourButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '4';
    updateDisplay();
    console.log(string);
});

numberFiveButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '5';
    updateDisplay();
    console.log(string);
});

numberSixButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '6';
    updateDisplay();
    console.log(string);
});

numberSevenButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '7';
    updateDisplay();
    console.log(string);
});

numberEightButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '8';
    updateDisplay();
    console.log(string);
});

numberNineButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '9';
    updateDisplay();
    console.log(string);
});

openParenButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '(';
    updateDisplay();
    console.log(string);
});

closeParenButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += ')';
    updateDisplay();
    console.log(string);
});

pointButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '.';
    updateDisplay();
    console.log(string);
});

addButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '+';
    updateDisplay();
    console.log(string);
});

subtractButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '-';
    updateDisplay();
    console.log(string);
});

multiplyButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '*';
    updateDisplay();
    console.log(string);
});

divideButton.addEventListener('click', (event) => {
    event.preventDefault();

    string += '/';
    updateDisplay();
    console.log(string);
});

equalButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(string);

    parseEquationString(string);

    infixToPostfix(tokens);

    computeEquation(tokens);

    string = result;

    updateDisplay();
});

clearAllButton.addEventListener('click', (event) => {
    event.preventDefault();

    clearAll();

    updateDisplay();
});

clearEntryButton.addEventListener('click', (event) => {
    event.preventDefault();
});