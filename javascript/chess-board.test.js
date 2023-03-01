const ChessBoard = require('./chess-board')

describe('white pawns', () => {
  it.each([
    [1, true],
    [2, true],
    [3, false]
  ])('moving %i ranks on first move', (ranksToMove, expected) => {
    const board = new ChessBoard()
    expect(board.move(1, 0, 1 + ranksToMove, 0)).toBe(expected)
  })

  it.each([
    [-1],
    [1]
  ])('can attack left and right', (filesToMove) => {
    const board = new ChessBoard()
    board.board[2][1 + filesToMove] = -1

    expect(board.move(1, 1, 2, 1 + filesToMove)).toBe(true)
  })

  it.each([
    [-1],
    [1]
  ])('cannot move diagonally without attacking', (filesToMove) => {
    const board = new ChessBoard()

    expect(board.move(1, 1, 2, 1 + filesToMove)).toBe(false)
  })
})

describe('black pawns', () => {
  it.each([
    [1, true],
    [2, true],
    [3, false]
  ])('moving %i ranks on first move', (ranksToMove, expected) => {
    const board = new ChessBoard()
    expect(board.move(6, 0, 6 - ranksToMove, 0)).toBe(expected)
  })

  it.each([
    [-1],
    [1]
  ])('can attack left and right', (filesToMove) => {
    const board = new ChessBoard()
    board.board[5][1 + filesToMove] = 1

    expect(board.move(6, 1, 5, 1 + filesToMove)).toBe(true)
  })

  it.each([
    [-1],
    [1]
  ])('cannot move diagonally without attacking', (filesToMove) => {
    const board = new ChessBoard()

    expect(board.move(6, 1, 5, 1 + filesToMove)).toBe(false)
  })
})

describe('rooks', () => {
  it('cannot move when blocked', () => {
    const board = new ChessBoard()

    expect(board.move(0, 0, 0, 1)).toBe(false)
    expect(board.move(0, 0, 2, 0)).toBe(false)
    expect(board.move(0, 7, 0, 6)).toBe(false)
    expect(board.move(0, 7, 2, 7)).toBe(false)

    expect(board.move(7, 0, 7, 1)).toBe(false)
    expect(board.move(7, 0, 5, 0)).toBe(false)
    expect(board.move(7, 7, 7, 6)).toBe(false)
    expect(board.move(7, 7, 5, 7)).toBe(false)
  })

  it.failing('can move', () => {
    const board = new ChessBoard()
    board.move(1, 0, 3, 0)

    expect(board.move(0, 0, 2, 0)).toBe(true)
  })
})