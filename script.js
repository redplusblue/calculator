mainDisplay = document.getElementById('main-display')
miniDisplay = document.getElementById('mini-display')

atWelcome = 'Calculator'


function clearAll() {
    mainDisplay.innerText = '';
    miniDisplay.innerText = mainDisplay.innerText;
}

function digit(d){
    mainDisplay.innerText += d;
    miniDisplay.innerText = mainDisplay.innerText;
}