export class Game {
    private _lastSymbol: Symbol = " ";
    private _board: Board = new Board();

    public Play(symbol: Symbol, x: Index, y: Index) : void {
        if (this._lastSymbol == " ") {
            if (symbol == "O") {
                throw new Error("Invalid first player");
            }
        }
        else if (symbol == this._lastSymbol) {
            throw new Error("Invalid next player");
        }
        else if (this._board.SymbolAt(x, y) != " ") {
            throw new Error("Invalid position");
        }

        this._lastSymbol = symbol;
        this._board.AddTileAt(symbol, x, y);
    }

    public Winner() : Symbol {
        for (let row=0; row<3; row++) {
            if (this._board.IsWinningRow(row as Index)) {
                return this._board.SymbolAt(row as Index, 0);
            }
        }

        return " ";
    }
}

type Symbol = "X" | "O" | " "
type Index = 0 | 1 | 2

interface Tile
{
    X: Index;
    Y: Index;
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
                const tile : Tile = {X: i as Index, Y: j as Index, Symbol:" "};
                this._plays.push(tile);
            }
        }
    }

    public TileAt(x:  Index, y: Index): Tile {
        return this._plays.find((t:Tile) => t.X == x && t.Y == y)!
    }

    public SymbolAt(x: Index, y: Index): Symbol {
        return this.TileAt(x, y).Symbol;
    }

    public AddTileAt(symbol: Symbol, x: Index, y: Index) : void
    {
        const tile : Tile = {X :x, Y:y, Symbol:symbol};

        this._plays.find((t:Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }

    public IsWinningRow(row: Index) {
        return this.SymbolAt(row, 0) != ' '
          && this.SymbolAt(row, 0) == this.SymbolAt(row, 1)
          && this.SymbolAt(row, 2) == this.SymbolAt(row, 1);
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
// should we use strict equals === ?
// INCOMPLETE FUNCTIONALITY - only checking for rows for victory