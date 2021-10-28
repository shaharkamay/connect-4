export { Model };
import { Event } from '../scripts/event.js';

class Model {
    constructor() {
        this.cells = Array(49).fill("");
        this.currentPlayer = 'blue';
        this.finished = false;

        // this.updateCellEvent = new Event();
        // this.victoryEvent = new Event();
        // this.drawEvent = new Event();
    }

    play(cellId) {
        this.cells[cellId] = this.currentPlayer;
        this.finished = this.victory() || this.draw();
    }

    // play(move) {
    //     if (this.finished || move < 0 || move > 8 || this.board[move]) { return false; }

    //     this.board[move] = this.currentPlayer;
    //     this.updateCellEvent.trigger({ move, player: this.currentPlayer });

    //     this.finished = this.victory() || this.draw();

    //     if (!this.finished) { this.switchPlayer(); }

    //     return true;
    // }

    victory() {
        return false;
    }

    draw() {
        const draw = this.cells.every(i => i);

        // if (draw) {
        //     this.drawEvent.trigger();
        // }

        return draw;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'blue' ? 'red' : 'blue';
    }
}