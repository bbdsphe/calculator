// Collection of utility definitions

const simpleOperators = ['+', '-', '*', '/', '%'];
const specialOperators = ['^'];
const trigOperators = ['sin', 'cos', 'tan'];

const operators = simpleOperators.concat(specialOperators).concat(trigOperators);

const precedence = {
    '-': 1,
    '+': 1,
    '/': 2,
    '*': 2,
    '%': 2,
    '^': 3,
    'sin': 4,
    'cos': 4,
    'tan': 4,
}

function isNumber(token) {
    return !isNaN(parseFloat(token));
}

function isOperator(token) {
    return operators.includes(token);
}

function isParen(token) {
    return token === '(' || token === ')';
}

function parseExpression(expression) {
    let tokens = [];
    let currentToken = '';
    let lastToken = '';

    for (let index = 0; index < expression.length; index += 1) {
        let character = expression[index];

        if (isNumber(character)) {
            currentToken += character;
        } else {
            // Character is is not a number (Possibly a operator or a letter)

            // The current token is complete by this point and should be added to the
            // token array

            if (currentToken != '')  {
                tokens.push(currentToken);
                currentToken = '';
            }


            // This handles negative numbers case

            if (character == '-' && (index == 0 || isOperator(lastToken))) {
                currentToken += character;
            }

            // This handles simple operators

            //else if (/[+\-*/%]/.test(character) || isParen(character)) {
            else if (/[+\-*/%]/.test(character)) {
                tokens.push(character);
            }

            // This handles exponentiation

            else if (character == '^') {
                tokens.push('**');
            }

            // This handles trigonometric operators

            else if (/sin|cos|tan/.test(expression.slice(index, index + 3))) {
                tokens.push(expression.slice(index, index + 3));
            }
        }

        lastToken = character;
    }

    if (currentToken != '') {
        tokens.push(currentToken);
    }

    return tokens;
}

function infixToPostfix(infix) {
    let postfix = [];
    let operators = [];

    for (let index = 0; index < infix.length; index += 1) {
        let token = infix[index];

        if (isNumber(token)) {
            postfix.push(token);
        }

        else if (/[+\-*/^sinco]/.test(token)) {
            while (
                operators.length > 0 &&
                precedence[token] <= precedence[operators[operators.length - 1]]
            ) {
                postfix.push(operators.pop());
            }

            operators.push(token)
        }

        else if (token == '(') {
            operators.push(token)
        }

        else if (token == ')') {
            while(operators[operators.length - 1] != '(') {
                postfix.push(operators.pop());
            }

            operators.pop();
        }
    }

    while (operators.length > 0) {
        postfix.push(operators.pop());
    }

    return postfix;

}

function evaluatePostfix(postfix) {
    let operands = [];

    for (let index = 0; index < postfix.length; index += 1) {
        let token = postfix[index];

        if (isNumber(token)) {
            operands.push(parseFloat(token));
        }

        let secondOperand = operands.pop();
        let firstOperand = operands.pop();

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
            case '**':
                value = firstOperand ** secondOperand;
                break;
            case 'sin':
                value = Math.sin(firstOperand);
                break;
            case 'cos':
                value = Math.cos(firstOperand);
                break;
            case 'tan':
                value = Math.tan(firstOperand);
                break;

            default:
                break;
        }

        operands.push(value);
    }

    return operands.pop();
}

console.log(evaluatePostfix(infixToPostfix(parseExpression('sin(2) + cos(3) - tan(1)'))));