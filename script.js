let mainDisplay = document.getElementById('main-display');
let miniDisplay = document.getElementById('mini-display');

let operators = ['%', '÷', '×', '+', '-', '.'];
let operandOne = ''
let operandTwo = ''
let currentOperator = '';
let result;
let patternNum = /^[0-9]$/gm;

// Keyboard support
document.addEventListener('keydown', (e) => {
    let keyCode = e.key;
    if(keyCode.match(patternNum)) {
        digit(keyCode)
    } else if(keyCode == 'Backspace' || keyCode == 'Delete') {
        clearLast()
    } else if(checkOperator(keyCode)) {
        operator(keyCode)
    } else if (keyCode == '/') {
        operator('÷')
    } else if (keyCode == '*') {
        operator('×')
    } else if(keyCode == 'Enter') {
        evaluateOperation()    
    }
} )

// Copy text on hover
function copyText(display) {
    text = '';
    if (display == 'mini') {
        if (miniDisplay.innerText.length == 0) {
            alert("Cannot copy empty field!")
        } else {
            text = miniDisplay.innerText;
            navigator.clipboard.writeText(text);
            alert(`Copied ${text} to clipboard!`);
        }
    } else {
        if (mainDisplay.innerText.length == 0) {
            alert("Cannot copy empty field!")
        } else {
            text = mainDisplay.innerText;
            navigator.clipboard.writeText(text);
            alert(`Copied ${text} to clipboard!`);
        }
    }
}

// AC button
function clearAll() {
    mainDisplay.innerText = '';
    miniDisplay.innerText = '';
    currentOperator = '';
    result = undefined;
}

// Numbers 
function digit(d) {
    mainDisplay.innerText += d;
}

// Operators
function operator(o) {
    if (miniDisplay.innerText.length == 0 && mainDisplay.innerText.length == 0) {
        if(o == '-') {
            changeSign()
        }
    } else {
        if (o == '.') {
            if (mainDisplay.innerText.includes('.')) {
                return
            } else {
                mainDisplay.innerText += o;
            }
        } else if (o == '=') {
            evaluateOperation()
        } else {
            if (miniDisplay.innerText.length == 0) {
                if(mainDisplay.innerText == '-') {
                    mainDisplay.innerText = '';
                    return;
                }
                mainDisplay.innerText += o;
                miniDisplay.innerText += mainDisplay.innerText;
                mainDisplay.innerText = ''
            } else {
                displayText = miniDisplay.innerText;
                if (displayText[0] == '-')
                {
                    possibleOperator = displayText.charAt(displayText.length-1)
                    if (checkOperator(possibleOperator)) {
                        evaluateOperation()
                        return;
                    }
                    else {
                        miniDisplay.innerText += o;
                }}
                if (checkOperator(miniDisplay.innerText)) {
                    if (mainDisplay.innerText.length != 0) {
                        evaluateOperation()
                        miniDisplay.innerText += o;
                    }
                } else {
                    miniDisplay.innerText += o;
                }
            }


        }
    }
}

// Clear button
function clearLast() {
    if (mainDisplay.innerText.length == 0 && miniDisplay.innerText.length != 0) {
        let toEval = miniDisplay.innerText;
        toEval = toEval.split('');
        toEval[toEval.length - 1] = '';
        toEval = toEval.join('');
        miniDisplay.innerText = toEval;
    } else if (mainDisplay.innerText.length != 0 && miniDisplay.innerText.length == 0) {
        let toEval = mainDisplay.innerText;
        toEval = toEval.split('');
        toEval[toEval.length - 1] = '';
        toEval = toEval.join('')
        mainDisplay.innerText = toEval;
    } else if (mainDisplay.innerText.length != 0 && miniDisplay.innerText.length != 0) {
        let mainText = mainDisplay.innerText;
        mainText = mainText.split('');
        mainText[mainText.length - 1] = '';
        mainText = mainText.join('');
        mainDisplay.innerText = mainText;
    } else {
        return
    }
}

// Math
function operate(currentOperator, operandOne, operandTwo) {
    operandOne = Number(operandOne)
    operandTwo = Number(operandTwo)
    if (currentOperator == '÷') {
        return divide(operandOne, operandTwo);
    } else if (currentOperator == '×') {
        return multiply(operandOne, operandTwo);
    } else if (currentOperator == '+') {
        return add(operandOne, operandTwo);
    } else if (currentOperator == '-') {
        return subtract(operandOne, operandTwo);
    } else if (currentOperator == '%') {
        return percent(operandOne, operandTwo)
    }

    function divide(a, b) {
        return a / b;
    }

    function multiply(a, b) {
        return a * b;
    }

    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    function percent(a, b) {
        return (a*b)/100;
    }
}

function evaluateOperation() {
    if (miniDisplay.innerText.length == 0) {
        return;
    } else if (checkOperator(miniDisplay.innerText) && mainDisplay.innerText.length == 0) {
        return;
    } else if (!checkOperator(miniDisplay.innerText) && mainDisplay.innerText.length != 0) {
        return;
    }else {
        operatorSymbol = miniDisplay.innerText;
        numOne = operatorSymbol.slice(0, -1);
        operatorSymbol = operatorSymbol.slice(-1);
        numTwo = mainDisplay.innerText;
        result = operate(operatorSymbol, numOne, numTwo);
        mainDisplay.innerText = ''
        miniDisplay.innerText = Math.floor(Number(result) * 100) / 100;
    }
}

//Check if the string is an operator
function checkOperator(string) {
    isTrue = false;
    operators.forEach(element => {
        if (string.includes(element)) {
            isTrue = true;
        }
    })
    return isTrue;
}

// +/- button
function changeSign() {
    let displayText = mainDisplay.innerText;
    if(displayText.length == 0) {
        mainDisplay.innerText += '-'; 
    } else if (displayText.length == 1 && displayText == '-'){
        mainDisplay.innerText = '';
        return;
    } 
    else {
        if(displayText[0] == '-') {
            displayText = Number(displayText) * -1;
            mainDisplay.innerText = displayText;  
        } else {
            displayText = '-' + displayText;
            mainDisplay.innerText = displayText;
        }
    }
}


