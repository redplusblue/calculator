mainDisplay = document.getElementById('main-display')
miniDisplay = document.getElementById('mini-display')

function copyText(display){
    text = ''
    if(miniDisplay.innerText == '' || mainDisplay.innerText == ''){
        alert("Cannot copy empty element!")
    }
    if(display == 'mini'){
        text = miniDisplay.innerText
        navigator.clipboard.writeText(text)
        alert(`Copied ${text} to clipboard!`)
    } else {
        text = mainDisplay.innerText
        navigator.clipboard.writeText(text)
        alert(`Copied ${text} to clipboard!`)
    }
}

function clearAll() {
    mainDisplay.innerText = '';
    miniDisplay.innerText = mainDisplay.innerText;
}

function digit(d){
    mainDisplay.innerText += d;
    miniDisplay.innerText += d;
}

function operator(o) {
    console.log(0)
    if(miniDisplay.innerText.length == 0 && mainDisplay.innerText.length == 0) {
        return
    } else {
        if(o == '.'){
            if(mainDisplay.innerText.includes('.') || miniDisplay.innerText.includes('.')){
                // FIX THIS
                // if the number already includes . then no more but display can have more than 1 .
                return
            } else {
                mainDisplay.innerText += o;
                miniDisplay.innerText += o;
                
            }
        } else {
        mainDisplay.innerText = '';
        miniDisplay.innerText += o;
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



