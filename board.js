let GOON = 0
let OWIN = 1
let XWIN = 2
let DRAW = 3

class Board {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.symbols = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    this.status = GOON
    this.setup()
  }

  setup() {
    let center = { x: this.width / 2, y: this.height / 2 };
    this.blockWidth = this.height / 5
    this.lineLength = this.height * 0.6
    this.boardLines = [
      {
        x1: center.x - this.lineLength/2, y1: center.y - this.blockWidth/2,
        x2: center.x + this.lineLength/2, y2: center.y - this.blockWidth/2
      },
      {
        x1: center.x - this.lineLength/2, y1: center.y + this.blockWidth/2,
        x2: center.x + this.lineLength/2, y2: center.y + this.blockWidth/2
      },
      {
        x1: center.x - this.blockWidth/2, y1: center.y - this.lineLength/2,
        x2: center.x - this.blockWidth/2, y2: center.y + this.lineLength/2
      },
      {
        x1: center.x + this.blockWidth/2, y1: center.y - this.lineLength/2,
        x2: center.x + this.blockWidth/2, y2: center.y + this.lineLength/2
      }
    ]
    this.symbolsCoord = [
      { x: center.x - this.blockWidth, y: center.y - this.blockWidth },
      { x: center.x,                   y: center.y - this.blockWidth },
      { x: center.x + this.blockWidth, y: center.y - this.blockWidth },
      { x: center.x - this.blockWidth, y: center.y                   },
      { x: center.x,                   y: center.y                   },
      { x: center.x + this.blockWidth, y: center.y                   },
      { x: center.x - this.blockWidth, y: center.y + this.blockWidth },
      { x: center.x,                   y: center.y + this.blockWidth },
      { x: center.x + this.blockWidth, y: center.y + this.blockWidth }
    ]
    this.drawLine = function(_line) {
      line(_line.x1, _line.y1, _line.x2, _line.y2)
    }
    this.drawSymbol = function(symbol, coord) {
      if (symbol == 'O') {
        this.drawO(coord)
      }
      else if (symbol == 'X') {
        this.drawX(coord)
      }
    }
    this.drawO = function(_coord) {
      noFill()
      circle(_coord.x, _coord.y, this.blockWidth/2)
      fill(255)
    }
    this.drawX = function(_coord) {
      let slashes = [
        {
          x1: _coord.x + this.blockWidth/4,
          y1: _coord.y + this.blockWidth/4,
          x2: _coord.x - this.blockWidth/4,
          y2: _coord.y - this.blockWidth/4
        },
        {
          x1: _coord.x - this.blockWidth/4,
          y1: _coord.y + this.blockWidth/4,
          x2: _coord.x + this.blockWidth/4,
          y2: _coord.y - this.blockWidth/4
        }
      ]
      for (let slash of slashes) {
        this.drawLine(slash)
      }
    }
  }

  draw() {
    background(125)
    for (let boardLine of this.boardLines) {
      this.drawLine(boardLine)
    }
    for (let i = 0; i < 9; i++) {
      this.drawSymbol(this.symbols[i], this.symbolsCoord[i])
    }
  }

  reset() {
    this.symbols = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    this.status = GOON
  }

  isValidMove(idx) {
    return this.symbols[idx] == ' '
  }

  __checkSymbolWin(symbol) {
    for (let x = 0; x <= 6; x += 3) {
      if ((this.symbols[x] == this.symbols[x+1]) && (this.symbols[x+1] == this.symbols[x+2]) && (this.symbols[x] == symbol)) {
        return true
      }
    }
    for (let x = 0; x < 3; x++) {
      if ((this.symbols[x] == this.symbols[x+3]) && (this.symbols[x+3] == this.symbols[x+6]) && (this.symbols[x] == symbol)) {
        return true
      }
    }
    if ((this.symbols[0] == this.symbols[4]) && (this.symbols[4] == this.symbols[8]) && (this.symbols[0] == symbol)) {
      return true
    }
    if ((this.symbols[2] == this.symbols[4]) && (this.symbols[4] == this.symbols[6]) && (this.symbols[2] == symbol)) {
      return true
    }
    return false
  }

  checkStatus() {
    let cnt = 0
    for (let i = 0; i < 9; i++) {
      cnt += (this.symbols[i] == 'O') || (this.symbols[i] == 'X')
    }

    if (this.__checkSymbolWin('O')) {
      return OWIN
    } else if (this.__checkSymbolWin('X')) {
      return XWIN
    } else if (cnt == 9) {
      return DRAW
    } else {
      return GOON
    }
  }

  updateStatus() {
    this.status = this.checkStatus()
  }

  getIdxByCoord(coord) {
    let halfBW = this.blockWidth / 2
    for (let i = 0; i < 9; i++) {
      if ((this.symbolsCoord[i].x - halfBW <= coord.x) && (coord.x <= this.symbolsCoord[i].x + halfBW)) {
        if ((this.symbolsCoord[i].y - halfBW <= coord.y) && (coord.y <= this.symbolsCoord[i].y + halfBW)) {
          return i
        }
      }
    }
    return -1
  }
}
