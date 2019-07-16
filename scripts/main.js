"use strict";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(op, n1, n2) {
    switch(op) {
        case '+': 
            return add(n1, n2);
            break;
        case '-': 
            return subtract(n1, n2);
            break;
        case '*':
            return multiply(n1, n2);
            break;
        case '/':
            return divide(n1, n2);
            break;
    }
}

let display = document.querySelector('div#display');
let buttons = document.querySelectorAll('.button button');
buttons.forEach(button => button.addEventListener("click", takeInput));

let expression = [];
updateDisplay();

function takeInput(e) {
    let lastToken = expression.slice(-1)[0];
    let secondLastToken = expression.slice(-2, -1)[0];

    if (['C', '<', '='].includes(e.target.innerText)) {
        //non input conditions
        if (e.target.id === 'clear-disp') {
            expression = [];
        }
        if (e.target.id === 'clear-char') {
            if (isNaN(lastToken) || lastToken.length === 1) {
                expression = expression.slice(0, -1);
            }
            else 
                expression[expression.length - 1] = lastToken.slice(0, -1);
        }
        updateDisplay();
        return;
    }

    if (isNaN(lastToken)) {
        if (!isNaN(e.target.innerText)) {
            if (isNaN(lastToken + e.target.innerText) || !isNaN(secondLastToken))
                expression[expression.length] = e.target.innerText;
            else 
                expression[expression.length - 1] += e.target.innerText;
        }
        else if (e.target.innerText === '-' && lastToken !== '-') {
            expression[expression.length] = e.target.innerText;
        }
    }
    else {
        if (isNaN(lastToken + e.target.innerText)) {
            if (e.target.innerText === '.') return;
            expression[expression.length] = e.target.innerText;
        }
        else {
            expression[expression.length - 1] += e.target.innerText;
        }
    }

    updateDisplay();
}


function updateDisplay() {
    if (expression.length === 0) {
        display.innerText = '0';
    }
    else {
        display.innerText = '';
    }
    expression.forEach(token => display.innerText += token);
}
