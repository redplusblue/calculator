let mainDisplay = document.getElementById('main-display');
let miniDisplay = document.getElementById('mini-display');

let operators = ['%', '÷', '×', '+', '-'];
let currentOperator = '';

function copyText(display){
    text = '';
    if(miniDisplay.innerText == '' || mainDisplay.innerText == ''){
        alert("Cannot copy empty element!");
    } else {
    if(display == 'mini'){
        text = miniDisplay.innerText;
        navigator.clipboard.writeText(text);
        alert(`Copied ${text} to clipboard!`);
    } else {
        text = mainDisplay.innerText;
        navigator.clipboard.writeText(text);
        alert(`Copied ${text} to clipboard!`);
    }
}
}

function clearAll() {
    mainDisplay.innerText = '';
    miniDisplay.innerText = mainDisplay.innerText;
    currentOperator = '';
}

function digit(d){
    mainDisplay.innerText += d;
}

function operator(o) {
    if(miniDisplay.innerText.length == 0 && mainDisplay.innerText.length == 0) {
        return
    } else {
        if(o == '.'){
            if(mainDisplay.innerText.includes('.')){
                return
            } else {
                mainDisplay.innerText += o;
            }
        } else {
            if(currentOperator.length == 0){
                operandOne = mainDisplay.innerText; 
                currentOperator = o;
                console.log(operandOne)                  ///////////////////////////////////////////
                console.log(currentOperator)             ///////////////////////////////////////////
            } else {
                operandTwo = mainDisplay.innerText;
                console.log(operandTwo)                  ///////////////////////////////////////////
                result = operate(currentOperator, operandOne, operandTwo)
                miniDisplay.innerText = result;
            }
            ///////////////////////////////// Create a clause for %
        //Incorporate into the operating if-else      
        mainDisplay.innerText += o;
        miniDisplay.innerText += mainDisplay.innerText;
        mainDisplay.innerText = '';
        }
    }
}

function clearLast() {
    if(mainDisplay.innerText.length == 0 && miniDisplay.innerText.length != 0){
        let toEval = miniDisplay.innerText;
        toEval = toEval.split('');
        toEval[toEval.length-1] = '';
        toEval = toEval.join('');
        miniDisplay.innerText = toEval;
    } else if(mainDisplay.innerText.length != 0 && miniDisplay.innerText.length == 0){
        let toEval = mainDisplay.innerText;
        toEval = toEval.split('');
        toEval[toEval.length-1] = '';
        toEval = toEval.join('')
        mainDisplay.innerText = toEval;
    } else if (mainDisplay.innerText.length != 0 && miniDisplay.innerText.length != 0){
        let mainText = mainDisplay.innerText;
        mainText = mainText.split('');
        let miniText = miniDisplay.innerText;
        miniText = miniText.split('');
        mainText[mainText.length-1] = '';
        miniText[miniText.length-1] = '';
        mainText = mainText.join('');
        miniText = miniText.join('');
        miniDisplay.innerText = miniText;
        mainDisplay.innerText = mainText;
    } else {
        return
    }
}

function operate(currentOperator, operandOne, operandTwo) {
    operandOne = Number(operandOne)
    operandTwo = Number(operandTwo)
    if(currentOperator == '÷') {
        return divide(operandOne, operandTwo);
    } else if (currentOperator == '×') {
        return multiply(operandOne, operandTwo);
    } else if (currentOperator == '+') {
        return add(operandOne, operandTwo);
    } else if (currentOperator == '-') {
        return subtract(operandOne, operandTwo);
    }

    function divide(a, b){
        return a/b;
    }

    function multiply(a, b){
        return a*b;
    }

    function add(a, b){
        return a+b;
    }

    function subtract(a, b) {
        return a-b;
    }
}


