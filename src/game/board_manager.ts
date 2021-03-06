/// <reference path="../lib/Phaser/phaser.d.ts" />
/// <reference path="level.ts" />

module PhaserSnake {

    function getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    export class BoardPosition {
        x: number;
        y: number;
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        hash(): string {
            return this.x.toString() + "|" + this.y.toString();
        }

        equal(other: BoardPosition): bool {
            return ((this.x === other.x) && (this.y === other.y))
        }

        clone(): BoardPosition{
            return new BoardPosition(this.x, this.y);
        }
    }
    
    export class BoardManager {
        private _width: number;
        private _height: number;
        private _data: Object;
        private _count: number;

        private _capture(hash: string, value: any) {
            this._data[hash] = value;
        }

        private _uncapture(hash: string) {
            delete this._data[hash];
        }


        private _getCaptured(hash: string):any {
            return this._data[hash];
        }


        constructor(options: GameOptions) {
            this._height = options.boardHeight;
            this._width = options.boardWidth;
            this._count = 0;
            this._data = {};
        }


        capture(position:BoardPosition, value: any) {
            var hash = position.hash();
            if (this._getCaptured(hash) === undefined) {
                this._count++;
            }
            this._capture(hash, value);
        }

        uncapture(position: BoardPosition):any {
            var hash = position.hash();
            if (this._getCaptured(hash) === undefined) {
                return
            }
            var result = this._getCaptured(hash);
            this._uncapture(hash);
            this._count--;
            return result;
        }


        getCaptured(position:BoardPosition): any {
            var hash = position.hash();
            return this._getCaptured(hash);
        }

        relocate(fromPosition:BoardPosition, toPosition:BoardPosition) {
            var fromHash = fromPosition.hash();
            var toHash = toPosition.hash();
            if (!this._getCaptured(fromHash)) {
                return;
            }
            var value = this._data[fromHash];
            this._uncapture(fromHash);
            this._capture(toHash, value);
        }

        captureRandom(value: any):BoardPosition {
            var i:number, j:number, x:number, y:number, hash:string, position:BoardPosition;

            if (this._count === (this._width * this._height)) {
                throw new Error("Could not capture because there is no empty space");
            }

            for (i = 0; i < 5; i++) {
                x = getRandomInt(0, this._width - 1);
                y = getRandomInt(0, this._height - 1);
                position = new BoardPosition(x, y);
                hash = position.hash();
                if (!this._getCaptured(hash)) {
                    this._capture(hash, value);
                    this._count++;
                    return position;
                }
            }

            for (i = 0; i < this._width; i++){
                for (j = 0; j < this._height; j++){
                    position = new BoardPosition((x + i) % this._width, (y + j) % this._height)
                    hash = position.hash();
                    if (!this._getCaptured(hash)) {
                        this._capture(hash, value);
                        this._count++;
                        return position;
                    }
                }
            }
            
        }

        get count() {
            return this._count;
        }

    }
}