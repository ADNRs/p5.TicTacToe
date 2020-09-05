class Board {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.reset()
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
    this.state = GOON
  }

  isValidMove(symbols, idx) {
    return symbols[idx] == ' '
  }

  checkSymbolWin(symbols, symbol) {
    for (let x = 0; x <= 6; x += 3) {
      if ((symbols[x] == symbols[x+1]) && (symbols[x+1] == symbols[x+2]) && (symbols[x] == symbol)) {
        return true
      }
    }
    for (let x = 0; x < 3; x++) {
      if ((symbols[x] == symbols[x+3]) && (symbols[x+3] == symbols[x+6]) && (symbols[x] == symbol)) {
        return true
      }
    }
    if ((symbols[0] == symbols[4]) && (symbols[4] == symbols[8]) && (symbols[0] == symbol)) {
      return true
    }
    if ((symbols[2] == symbols[4]) && (symbols[4] == symbols[6]) && (symbols[2] == symbol)) {
      return true
    }
    return false
  }

  checkState(symbols) {
    let cnt = 0
    for (let i = 0; i < 9; i++) {
      cnt += symbols[i] != ' '
    }

    if (this.checkSymbolWin(symbols, 'O')) {
      return OWIN
    } else if (this.checkSymbolWin(symbols, 'X')) {
      return XWIN
    } else if (cnt == 9) {
      return DRAW
    } else {
      return GOON
    }
  }

  updateState() {
    this.state = this.checkState(this.symbols)
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
