export class Game {
    private _lastSymbol: Symbol = " ";
    private _board: Board = new Board();

    public Play(symbol: Symbol, x: number, y: number) : void {
        if (this._lastSymbol == " ") {
            if (symbol == "O") {
                throw new Error("Invalid first player");
            }
        }
        else if (symbol == this._lastSymbol) {
            throw new Error("Invalid next player");
        }
        else if (this._board.TileAt(x, y).Symbol != " ") {
            throw new Error("Invalid position");
        }

        this._lastSymbol = symbol;
        this._board.AddTileAt(symbol, x, y);
    }

    public Winner() : Symbol {
        if (this.isLineFullyPlayed(0)) {
            if (this._board.TileAt(0, 0)!.Symbol ==
                    this._board.TileAt(0, 1)!.Symbol &&
                    this._board.TileAt(0, 2)!.Symbol == this._board.TileAt(0, 1)!.Symbol) {
                return this._board.TileAt(0, 0)!.Symbol;
            }
        }

        if (this.isLineFullyPlayed(1)) {
            if (this._board.TileAt(1, 0)!.Symbol ==
                    this._board.TileAt(1, 1)!.Symbol &&
                    this._board.TileAt(1, 2)!.Symbol ==
                            this._board.TileAt(1, 1)!.Symbol) {
                return this._board.TileAt(1, 0)!.Symbol;
            }
        }

        if (this.isLineFullyPlayed(2)) {
            if (this._board.TileAt(2, 0)!.Symbol ==
                    this._board.TileAt(2, 1)!.Symbol &&
                    this._board.TileAt(2, 2)!.Symbol ==
                            this._board.TileAt(2, 1)!.Symbol) {
                return this._board.TileAt(2, 0)!.Symbol;
            }
        }

        return " ";
    }

    private isLineFullyPlayed(lineNumber: number) {
        return this._board.TileAt(lineNumber, 0)!.Symbol != " " &&
          this._board.TileAt(lineNumber, 1)!.Symbol != " " &&
          this._board.TileAt(lineNumber, 2)!.Symbol != " ";
    }
}

type Symbol = "X" | "O" | " "

interface Tile
{
    X: number;
    Y: number;
    Symbol: Symbol;
}

class Board
{
    private _plays : Tile[] = [];

    constructor()
    {
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                const tile : Tile = {X :i, Y:j, Symbol:" "};
                this._plays.push(tile);
            }
        }
    }

    public TileAt(x:  number, y: number): Tile {
        return this._plays.find((t:Tile) => t.X == x && t.Y == y)!
    }

    public AddTileAt(symbol: Symbol, x: number, y: number) : void
    {
        const tile : Tile = {X :x, Y:y, Symbol:symbol};

        this._plays.find((t:Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}

// deleted comments
// law of demeter in this._board.TileAt(1, 1)!.Symbol
// primitive obsession in Game: symbol: string, x: number, y: number
// Tile could be used to tackle the above
// X and Y could be narrowed down to the accepted range (0-2)
// same for Symbol
// DRY - hardcoded spaces
// DRY - this._board.TileAt(0, 0)!.Symbol != ' ' &&
//                 this._board.TileAt(0, 1)!.Symbol != ' ' &&
//                 this._board.TileAt(0, 2)!.Symbol != ' '

// BUG - nothing restricts players to X and O - could potentially play A, B and everyone else
// // e.g. use 'A', 'B', 'C' and so on in the test on line 30