const submitButton = document.getElementById('submit-btn')
const playerNames = document.querySelectorAll('.players-container input')
const startGame = document.querySelector('.start-game')
const gridContainer = document.querySelector('.game')
const scoreDisplay = document.querySelector('.score')
const player1 = document.querySelector('.player1')
const player2 = document.querySelector('.player2')
const div = document.createElement('div')
const box = document.querySelectorAll('.game div')
const winnerMessage = document.querySelector('.winnerMessage')
const winnerText = document.querySelector('.winningMesageText')
const restartButton = document.getElementById('restartBtn')
const x_class = 'x'
const cicrcle_class = 'circle'

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const name = [];
const clikedBoxId = []



//start game button function
submitButton.addEventListener('click', ()=>{
    playerNames.forEach( players => {
            name.push(players.value)
            players.style.display = 'none'
            submitButton.style.display = 'none'   
        })
        
                playersDisplay()
                playerScoreDisplay()
                gameRules()                                               
})

beginGame()
function beginGame(){
        circleTurn= false
        //add eventListener to each cell.
        box.forEach( gridBox => {
        gridBox.classList.remove(x_class)
        gridBox.classList.remove(cicrcle_class)
        gridBox.removeEventListener('click', clickBox)
        gridBox.addEventListener('click', clickBox,  {once: true})
    })
    setContainerHover()
    winnerMessage.classList.remove('show')
}


// display player names 
function playersDisplay(){
        startGame.innerHTML = ` <h1>${name[0]}</h1> <span>VS</span> <h1> ${name[1]}</h1>`
        startGame.classList.add('active') 
        if (startGame.classList.contains('active')){
            document.body.style.backgroundColor = 'rgba(0,0,0,0.7)'
        } 
        else {
            document.body.style.backgroundColor = 'white'
        }

        
       let timeout =   setTimeout( () => {
            startGame.classList.remove('active')
            document.body.style.backgroundColor = 'white'
            gridContainer.style.transform = 'scale(1)'
            scoreDisplay.style.left = 0
            player1.style.top = '20%'
            player2.style.top = '20%'
           

         }, 5000);        
}

//display each player character
function playerScoreDisplay (){
        scoreDisplay.innerHTML = ` <h1>${name[0]}: <span>0</span></h1> <br>  <h1>${name[1]}: <span>0</span></h1> <br> <button>New Game</button>`
        player1.innerHTML = "X"
        player2.innerHTML = "O"
}

//show game rules
function gameRules(){
    document.body.append(div)
    div.classList.add('game-rules')

    div.innerHTML = `<h1>GAME RULES</h1> <p>By Default, Player 1 is 'X' and Player 2 is 'O'</p> <br> <button>OK</button>`
  

    let rulesTimeout = setTimeout ( () => {
        div.style.transform = 'scale(1)'
        document.body.style.backgroundColor = 'rgba(0,0,0,0.8)'
    }, 8000)
  
    document.querySelector('.game-rules button').addEventListener('click',() =>{
        div.style.transform = 'scale(0)'
        document.body.style.backgroundColor = 'white'
        player1.classList.add('turn')
    })
}

restartButton.addEventListener('click', beginGame)

//click effect on box
function clickBox(e){
    const cell = e.target
    player1.classList.toggle('turn')
    player2.classList.toggle('turn')
   const currentClass = circleTurn ? cicrcle_class : x_class
   placeMark ( cell, currentClass)
    if (checkWin(currentClass)){
        console.log('winner')
        endGame(false)    
    }
    else if ( isDraw()){
        endGame(true)
    }
    else{
        swapTurn()
        setContainerHover()
    }
   
    
}
function endGame(draw){
      if (draw){
            winnerText.innerText = 'DRAW!'
      }else{
            winnerText.innerText = `${circleTurn ? `${name[1]}`: `${name[0]}`} WINS!`
      }
    winnerMessage.classList.add('show')
}

function isDraw(){
    return [...box].every( cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(cicrcle_class)
    })
}
function placeMark( cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurn(){ 
    circleTurn = !circleTurn
}

function setContainerHover (){
    gridContainer.classList.remove(x_class)
    gridContainer.classList.remove(cicrcle_class)
    if (circleTurn){
        gridContainer.classList.add(cicrcle_class)
    }else{
        gridContainer.classList.add(x_class)
    }
}



 function checkWin (currentClass){
    return winningCombinations.some ( combination => {
        return combination.every ( index => {
            return box[index].classList.contains(currentClass)  
        })
    })
}   

