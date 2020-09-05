// screen
let width
let height
// game
let board
let player1
let player2
let playerIndicator = PLAYER1
let playerCoord = { x: 0, y: 0 }
// game information
let round = 1
let P1Score = 0
let P2Score = 0
let DScore = 0
// display
let buttonPvE
let buttonPvP
let buttonEvE
let font
let fontsize = 32

function preload() {
  font = loadFont('./assets/CascadiaCode.ttf')
}


function setup() {
  width = windowWidth
  height = windowHeight
  createCanvas(width, height)
  board = new Board(width, height)

  textFont(font)
  textSize(fontsize)

  buttonPvE = createButton('PvE')
  buttonPvE.position(width*0.9, height*0.6)
  buttonPvE.mousePressed(pve)

  buttonPvP = createButton('PvP')
  buttonPvP.position(buttonPvE.x, buttonPvE.y + buttonPvE.width)
  buttonPvP.mousePressed(pvp)

  buttonEvE = createButton('EvE')
  buttonEvE.position(buttonPvE.x, buttonPvP.y + buttonPvP.width)
  buttonEvE.mousePressed(eve)

  eve() // preset the game mode to environment vs environment
}

function draw() {
  // select player by playerIndicator
  let player
  if (playerIndicator == PLAYER1) {
    player = player1
  } else {
    player = player2
  }

  // update state of game board and score if state changed
  let prevState = board.state
  board.updateState()
  if (prevState != board.state) {
    if (board.state == OWIN) {
      P1Score += 1
    } else if (board.state == XWIN) {
      P2Score += 1
    } else if (board.state == DRAW) {
      DScore += 1
    }
  }

  // draw the game board itself, and display related infomation
  board.draw()
  drawInfo()

  // early return if the game is finished
  if (board.state != GOON) {
    return
  }

  // let player decide where to move
  let idx = player.move(board.symbols)
  if (board.isValidMove(board.symbols, idx)) {
    board.symbols[idx] = player.symbol
    // once the move is valid, change the player
    if (playerIndicator == PLAYER1) {
      playerIndicator = PLAYER2
    } else {
      playerIndicator = PLAYER1
    }
  }
}

function pve() {
  modeChangeReset(HumanPlayer, ComputerPlayer)
}

function pvp() {
  modeChangeReset(HumanPlayer, HumanPlayer)
}

function eve() {
  modeChangeReset(ComputerPlayer, RandomPlayer)
  // setInterval(gameRestart, 1000)
}

function modeChangeReset(P1Type, P2Type) {
  player1 = new P1Type('O')
  player2 = new P2Type('X')
  round = 0
  P1Score = 0
  P2Score = 0
  DScore = 0
  gameRestart()
}

function gameRestart() {
  board.reset()
  round += 1
  playerIndicator = PLAYER1
  playerCoord = { x: 0, y: 0 }
}

function mousePressed() {
  playerCoord = { x: mouseX, y: mouseY }
  if (board.state != GOON) {
    gameRestart()
  }
}

function drawInfo() {
  function leftPad(_str, length) {
    if (_str.length >= length) {
      return _str
    }
    return leftPad('0' + _str, length)
  }

  let p1str = leftPad(P1Score + '', 2)
  let p2str = leftPad(P2Score + '', 2)
  let dstr = leftPad(DScore + '', 2)

  printStr = 'Round ' + round + '\n\n'
  printStr += '1P vs 2P\n'
  printStr += p1str + '-' + dstr + '-' + p2str
  text(printStr, height*0.1, height*0.1)
}
