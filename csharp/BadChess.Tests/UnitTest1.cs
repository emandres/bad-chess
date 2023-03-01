namespace BadChess.Tests;

public class Tests
{
    [TestCase(1, true)]
    [TestCase(2, true)]
    [TestCase(3, false)]
    public void WhitePawnsCanMoveUpOneOrTwoRanks(int ranksToMove, bool expected)
    {
        var board = new ChessBoard();
        Assert.That(board.Move(1, 0, 1 + ranksToMove, 0), Is.EqualTo(expected));
    }

    [TestCase(-1)]
    [TestCase(1)]
    public void WhitePawnsCanAttackUpOneRankAndOneFileLeftOrRight(int filesToMove)
    {
        var board = new ChessBoard();
        board[2, 1 + filesToMove] = -1;
        
        Assert.That(board.Move(1, 1, 2, 1 + filesToMove), Is.True);
    }
    
    [TestCase(-1)]
    [TestCase(1)]
    public void WhitePawnsCanNotMoveDiagonallyWithoutAttacking(int filesToMove)
    {
        var board = new ChessBoard();
        
        Assert.That(board.Move(2, 1, 1, 1 + filesToMove), Is.False);
    }
    
    [TestCase(1, true)]
    [TestCase(2, true)]
    [TestCase(3, false)]
    public void BlackPawnsCanMoveUpOneOrTwoRanks(int ranksToMove, bool expected)
    {
        var board = new ChessBoard();
        Assert.That(board.Move(6, 0, 6 - ranksToMove, 0), Is.EqualTo(expected));
    }

    [TestCase(-1)]
    [TestCase(1)]
    public void BlackPawnsCanAttackUpOneRankAndOneFileLeftOrRight(int filesToMove)
    {
        var board = new ChessBoard();
        board[5, 1 + filesToMove] = 1;
        
        Assert.That(board.Move(6, 1, 5, 1 + filesToMove), Is.True);
    }
    
    [TestCase(-1)]
    [TestCase(1)]
    public void BlackPawnsCanNotMoveDiagonallyWithoutAttacking(int filesToMove)
    {
        var board = new ChessBoard();
        
        Assert.That(board.Move(6, 1, 5, 1 + filesToMove), Is.False);
    }

    [Test]
    public void RooksCannotMoveWhenBlocked()
    {
        var board = new ChessBoard();
        Assert.That(board.Move(0, 0, 0, 1), Is.False);
        Assert.That(board.Move(0, 0, 2, 0), Is.False);
        Assert.That(board.Move(0, 7, 0, 6), Is.False);
        Assert.That(board.Move(0,7, 2, 7), Is.False);
        
        Assert.That(board.Move(7, 0, 7, 1), Is.False);
        Assert.That(board.Move(7, 0, 5, 0), Is.False);
        Assert.That(board.Move(7, 7, 7, 6), Is.False);
        Assert.That(board.Move(7, 7, 5, 7), Is.False);
    }

    [Test]
    public void RooksCanMove()
    {
        var board = new ChessBoard();
        board.Move(1, 0, 3, 0);
        Assert.That(board.Move(0, 0, 2, 0), Is.True);
    }
}