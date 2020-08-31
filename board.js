class Board{
  constructor(width, height) {
    this.width = width
    this.height = height
    this.symbol = ['O', ' ', 'O', 'O', 'X', 'X', 'X', 'O', 'O']
    this.drawSetup()
  }

  drawSetup() {
    let center = { x: this.width / 2, y: this.height / 2 };
    let blockWidth = this.height / 5
    let lineLength = this.height * 0.6
    this.boardLines = [
      {
        x1: center.x - lineLength/2, y1: center.y - blockWidth/2,
        x2: center.x + lineLength/2, y2: center.y - blockWidth/2
      },
      {
        x1: center.x - lineLength/2, y1: center.y + blockWidth/2,
        x2: center.x + lineLength/2, y2: center.y + blockWidth/2
      },
      {
        x1: center.x - blockWidth/2, y1: center.y - lineLength/2,
        x2: center.x - blockWidth/2, y2: center.y + lineLength/2
      },
      {
        x1: center.x + blockWidth/2, y1: center.y - lineLength/2,
        x2: center.x + blockWidth/2, y2: center.y + lineLength/2
      }
    ]
    this.symbolCoord = [
      { x: center.x - blockWidth, y: center.y - blockWidth },
      { x: center.x,              y: center.y - blockWidth },
      { x: center.x + blockWidth, y: center.y - blockWidth },
      { x: center.x - blockWidth, y: center.y              },
      { x: center.x,              y: center.y              },
      { x: center.x + blockWidth, y: center.y              },
      { x: center.x - blockWidth, y: center.y + blockWidth },
      { x: center.x,              y: center.y + blockWidth },
      { x: center.x + blockWidth, y: center.y + blockWidth }
    ]
    this.drawLine = function(_line) {
      line(_line.x1, _line.y1, _line.x2, _line.y2)
    }
    this.drawSymbol = function(symbol, coord) {
      print(symbol)
      if (symbol == 'O') {
        this.drawO(coord)
      }
      else if (symbol == 'X') {
        this.drawX(coord)
      }
    }
    this.drawO = function(_coord) {
      noFill()
      circle(_coord.x, _coord.y, blockWidth/2)
      fill(255)
    }
    this.drawX = function(_coord) {
      let slashes = [
        {
          x1: _coord.x + blockWidth/4,
          y1: _coord.y + blockWidth/4,
          x2: _coord.x - blockWidth/4,
          y2: _coord.y - blockWidth/4
        },
        {
          x1: _coord.x - blockWidth/4,
          y1: _coord.y + blockWidth/4,
          x2: _coord.x + blockWidth/4,
          y2: _coord.y - blockWidth/4
        }
      ]
      for (let slash of slashes) {
        this.drawLine(slash)
      }
    }
  }

  draw() {
    for (let boardLine of this.boardLines) {
      this.drawLine(boardLine)
    }
    for (let i = 0; i < 9; i++) {
      this.drawSymbol(this.symbol[i], this.symbolCoord[i])
    }
  }
}
