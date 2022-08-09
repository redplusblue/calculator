let mainDisplay = document.getElementById('main-display');
let miniDisplay = document.getElementById('mini-display');

let operators = ['%', '÷', '×', '+', '-'];
let operandOne = ''
let operandTwo = ''
let currentOperator = '';
let result = '';

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
    miniDisplay.innerText = '';
    currentOperator = '';
    result = '';
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
        } else if (o == '='){
            if(miniDisplay.innerText.length == 0) {
                miniDisplay.innerText = mainDisplay.innerText;
            } else if (checkOperator(miniDisplay.innerText) && mainDisplay.innerText.length == 0){
            } else {
                operatorSymbol = miniDisplay.innerText;
                console.log(operatorSymbol);
                numOne = operatorSymbol.slice(0, -1);
                console.log(numOne);
                operatorSymbol = operatorSymbol.slice(-1);
                console.log(operatorSymbol);
                numTwo = mainDisplay.innerText;
                console.log(numTwo);
                result = operate(operatorSymbol, numOne, numTwo);
                console.log(result);
                mainDisplay.innerText = '';
                miniDisplay.innerText = result;
        }} else {
            if(miniDisplay.innerText.length == 0){
                operandOne = mainDisplay.innerText;
                mainDisplay.innerText += o;
                miniDisplay.innerText += mainDisplay.innerText;
                mainDisplay.innerText = ''
            } else {
                if (checkOperator(miniDisplay.innerText)) {

                    if(mainDisplay.innerText.length != 0) {
                        evaluateOperation()
                        //Does not come back after evaluate operation, see whats up
                        miniDisplay += o;
                        //miniDisplay.innerText += o;
                        // Evaluate operation using the function because = works fine
                    }
                } else {
                    console.log(checkOperator(miniDisplay.innerText))
                    //console.log(miniDisplay.innerText.includes(operators[1]))
                    operandOne = miniDisplay.innerText;
                    //miniDisplay.innerText += o;
                }
            }
            
            
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
        //let miniText = miniDisplay.innerText;
        //miniText = miniText.split('');
        mainText[mainText.length-1] = '';
        //miniText[miniText.length-1] = '';
        mainText = mainText.join('');
        //miniText = miniText.join('');
        //miniDisplay.innerText = miniText;
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

function evaluateOperation() {
    if(miniDisplay.innerText.length == 0) {
        miniDisplay.innerText = mainDisplay.innerText;

    } else if (checkOperator(miniDisplay.innerText) && mainDisplay.innerText.length == 0){
        return;
    } else {
        operatorSymbol = miniDisplay.innerText;
        console.log(operatorSymbol)
        numOne = operatorSymbol.slice(0, -1);
        console.log(numOne)
        operatorSymbol = operatorSymbol.slice(-1);
        console.log(operatorSymbol)
        numTwo = mainDisplay.innerText;
        console.log(numTwo)
        result = operate(operatorSymbol, numOne, numTwo);
        console.log(result)
        mainDisplay.innerText = ''
        miniDisplay.innerText = result;
}}

function checkOperator(string) {
    isTrue = false;
    operators.forEach(element => {
        if(string.includes(element)){
            isTrue = true;
        }
    })
    return isTrue;
}


