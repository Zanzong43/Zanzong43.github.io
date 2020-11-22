const X_CLASS = 'x'
const CIRC_CLASS = "circ"
const WIN_COMBOS = [
    [0,1,2], [3,4,5], [6,7,8],   //horizontals
    [0,3,6], [1,4,7], [2,5,8],   //verticals
    [0,4,8], [2,4,6]             //diagonals
]
const cellElements = document.querySelectorAll('[data-cell')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circTurn

startGame()

restartButton.addEventListener('click', startGame)



cellElements.forEach(cell=> {
    cell.addEventListener('click', handleClick, {once: true})
})

function startGame(){
    circTurn =false
    cellElements.forEach(cell=> {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRC_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}


function handleClick(e){
    const cell = e.target
    const currentClass = circTurn ? CIRC_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    }
    else{
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw){
    if (draw){
        winningMessageTextElement.innerText = `Draw!`
    }else{
        winningMessageTextElement.innerText = `${circTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRC_CLASS)
    })
}


function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circTurn = !circTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRC_CLASS)
    if (circTurn){
        board.classList.add(CIRC_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WIN_COMBOS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}