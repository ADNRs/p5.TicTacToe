class GameTree {
  constructor(symbols) {
    this.symbols = symbols
    this.root = new Array()
  }

  build() {

  }

  getBestMove() {
    return Math.round(random(0, 9))
  }
}

class Node {
  constructor(data, parent, children) {
    this.data = data
    this.parent = parent || []
    this.children = children || []
  }
}
