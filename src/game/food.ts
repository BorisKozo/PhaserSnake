/// <reference path="../lib/Phaser/phaser.d.ts" />
/// <reference path="level.ts" />
module PhaserSnake{
    export class Food{

        private _game: Phaser.Game;
        private _level: Level;

        constructor(game: Phaser.Game, level: Level) {
            this._game = game;
            this._level = level;
        }


    }
}