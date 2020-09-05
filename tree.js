function getScore(symbols, symbol) {
  let score
  let state = board.checkState(symbols)

  if (state == DRAW) {
    score = DRAWSCORE
  } else if (state == GOON) {
    score = GOONSCORE
  } else if ((state == OWIN && symbol == 'O') || (state == XWIN && symbol == 'X')) {
    score = WINSCORE
  } else {
    score = LOSESCORE
  }

  return score
}

class GameTree {
  constructor(symbols, symbol) {
    this.root = new GameTreeNode()
    this.symbols = symbols
    this.symbol = symbol
  }

  __buildMinimaxWithPrune(node, alpha, beta, minimaxType) {
    if (node.score != undefined) {
      return
    }

    if (minimaxType == 'max') {
      let val = -Infinity
      for (let child of node.children) {
        this.__buildMinimaxWithPrune(child, alpha, beta, 'min')
        val = Math.max(val, child.score)
        alpha = Math.max(alpha, val)
        if (beta <= alpha) {
          break
        }
      }
      node.score = val
    } else {
      let val = Infinity
      for (let child of node.children) {
        this.__buildMinimaxWithPrune(child, alpha, beta, 'max')
        val = Math.min(val, child.score)
        beta = Math.min(beta, val)
        if (beta <= alpha) {
          break
        }
      }
      node.score = val
    }
  }

  __buildMinimax(node, minimaxType) {
    if (node.score != undefined) {
      return
    }

    if (minimaxType == 'max') {
      let val = -Infinity
      for (let child of node.children) {
        this.__buildMinimax(child, 'min')
        val = Math.max(val, child.score)
      }
      node.score = val
    } else {
      let val = Infinity
      for (let child of node.children) {
        this.__buildMinimax(child, 'max')
        val = Math.min(val, child.score)
      }
      node.score = val
    }
  }

  __buildHelper(node, symbols, symbol, currDepth, destDepth) {
    if (node.move != undefined) {
      symbols[node.move] = symbol
    } else {
      symbol = symbol == 'O' ? 'X' : 'O'
    }

    let state = board.checkState(symbols)
    if (currDepth == destDepth || state != GOON) {
      node.score = getScore(symbols, this.symbol)
      return
    }

    for (let i = 0; i < 9; i++) {
      if (!board.isValidMove(symbols, i)) {
        continue
      }

      let child = new GameTreeNode(i)
      let copiedSymbols = Array.from(symbols)
      let childSymbol = symbol == 'O' ? 'X' : 'O'
      node.children.push(child)
      this.__buildHelper(child, copiedSymbols, childSymbol, currDepth+1, destDepth)
    }
  }

  build() {
    this.__buildHelper(this.root, this.symbols, this.symbol, 0, 6)
    // this.__buildMinimax(this.root, 'max')
    this.__buildMinimaxWithPrune(this.root, -Infinity, Infinity, 'max')

    let bestMove, maxVal = -Infinity
    for (let child of this.root.children) {
      if (child.score > maxVal) {
        maxVal = child.score
        bestMove = child.move
      }
    }
    this.root.move = bestMove
  }

  getBestMove() {
    return this.root.move
  }
}

class GameTreeNode {
  constructor(move, score, children) {
    this.move = move
    this.score = score
    this.children = children || []
  }
}
