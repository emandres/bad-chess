class ChessBoard {
  constructor() {
    this.board = [
      [2, 3, 4, 5, 6, 4, 3, 2],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-2, -3, -4, -5, -6, -4, -3, -2],
    ]
  }

  move(fr, ff, tr, tf) {
    let dr, df
    switch (this.board[fr][ff]) {
      case 1: // white pawn
        if ((tr - fr === 2 || tr - fr === 1) && tf - ff === 0 && this.board[tr][tf] === 0) {
          this.board[fr][ff] = 0
          this.board[tr][tf] = 1
          return true
        }

        if (tr - fr === 1 && (tf - ff === 1 || tf - ff === -1) && this.board[tr][tf] < 0) {
          this.board[fr][ff] = 0
          this.board[tr][tf] = 1
          return true;
        }

        // TODO: en passant
        break

      case -1: // black pawn
        if ((tr - fr === -2 || tr - fr === -1) && tf - ff === 0 && this.board[tr][tf] === 0) {
          this.board[fr][ff] = 0
          this.board[tr][tf] = -1
          return true;
        }

        if (tr - fr === -1 && (tf - ff === 1 || tf - ff === -1) &&
          this.board[tr][tf] > 0) {
          this.board[fr][ff] = 0
          this.board[tr][tf] = -1
          return true;
        }
        break
      case 2: // rook
      case -2:
        // only move in straight lines along row or column
        if (fr != tr || ff != tf) {
          return false
        }

        // rooks can't jump over other pieces
        dr = fr != tr ? fr < tr ? 1 : -1 : 0
        df = ff != tf ? ff < tf ? 1 : -1 : 0
        for (let i = ff, j = fr; i < tr && j < tf; i += dr, j += df) {
          if (this.board[i][j] != 0) {
            return false
          }
        }

        this.board[tr][tf] = this.board[fr][ff]
        this.board[fr][ff] = 0
        return true
      case 3: // knight
      case -3:
        dr = tr - fr;
        df = tf - ff;
        if (Math.abs(dr) + Math.abs(df) === 3) {
          this.board[tr][tf] = this.board[fr][ff]
          this.board[fr][ff] = 0
          return true
        }
        break;
      case 4: // bishop
      case -4:
        dr = tr - fr
        df = tf - ff
        if (Math.abs(dr) != Math.abs(df)) {
          return false
        }

        // bishops can't jump over other pieces
        dr = tr > fr ? 1 : 0
        df = tf > ff ? 1 : 0
        for (let i = fr, j = ff; i < tr && j < tf; i += dr, j += df) {
          if (this.board[i][j] != 0) {
            return false
          }
        }

        this.board[tr][tf] = this.board[fr][ff]
        this.board[fr][ff] = 0
        return true
      case 5: // queen
      case -5:
        // queen can only move along diagonals or along rank or file
        if (Math.abs(tr - fr) === Math.abs(tf - ff) || tr - fr === 0 || tr - ff === 0) {
          // queens can't jump over other pieces
          dr = tr === fr ? 0 : tr > fr ? 1 : -1
          df = tf === ff ? 0 : tf > ff ? 1 : -1
          for (let i = fr, j = ff; i < tr && j < tf; i += dr, j += df) {
            if (this.board[i][j] != 0) {
              return false
            }
          }

          this.board[tr][tf] = this.board[fr][ff]
          this.board[fr][ff] = 0
          return true
        }
        break;
      case 6: // king
        dr = Math.abs(tr - fr)
        df = Math.abs(tf - ff)
        if ((dr === 1 || df === 1) && !(dr === 0 && df === 0)) {
          this.board[tr][tf] = this.board[fr][ff]
          this.board[fr][ff] = 0
          return true
        }
        // TODO: king can't move into check

        // TODO: castling

        break
    }

    return false
  }
}

module.exports = ChessBoard