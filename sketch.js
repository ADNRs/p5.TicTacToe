// screen
let width
let height
// game
let board
let player1
let player2
let round = 1
let playerIndicator
let P1 = 0
let P2 = 1
let playerCoord = { x: 0, y: 0 }
let P1Score = 0
let P2Score = 0
let DScore = 0
// display
let roundElem
let buttonRst
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

  eve()
}

function draw() {
  // game logic
  let player
  if (playerIndicator == P1) {
    player = player1
  } else {
    player = player2
  }

  let prevStatus = board.status
  board.updateStatus()
  if (prevStatus != board.status) {
    if (board.status == OWIN) {
      P1Score += 1
    } else if (board.status == XWIN) {
      P2Score += 1
    } else if (board.status == DRAW) {
      DScore += 1
    }
  }

  board.draw()
  drawInfo()
  if (board.status != GOON) {
    return
  }
  let loc = player.move(board.symbols)
  if (board.isValidMove(loc)) {
    board.symbols[loc] = player.symbol
    playerIndicator = !playerIndicator
  } else {
    return
  }
}

function pve() {
  player1 = new HumanPlayer()
  player2 = new ComputerPlayer()
  changeModeRst()
}

function pvp() {
  player1 = new HumanPlayer()
  player2 = new HumanPlayer()
  changeModeRst()
}

function eve() {
  player1 = new ComputerPlayer()
  player2 = new ComputerPlayer()
  changeModeRst()
}

function changeModeRst() {
  player1.setSymbol('O')
  player2.setSymbol('X')
  round = 0
  P1Score = 0
  P2Score = 0
  DScore = 0
  restart()
}

function restart() {
  board.reset()
  round += 1
  playerIndicator = P1
  playerCoord = { x: 0, y: 0 }
}

function mousePressed() {
  playerCoord = { x: mouseX, y: mouseY }
  if (board.status != GOON) {
    restart()
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

  printed_str = 'Round ' + round + '\n\n'
  printed_str += '1P vs 2P\n'
  printed_str += p1str + '-' + dstr + '-' + p2str
  text(printed_str, height*0.1, height*0.1)
}
