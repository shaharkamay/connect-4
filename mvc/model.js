export { Model };
import { Event } from '../scripts/event.js';

class Model {
    constructor() {
        this.cells = Array(49).fill("");
        this.currentPlayer = 'blue';
        this.finished = false;

        this.updateCellEvent = new Event();
        this.victoryEvent = new Event();
        this.drawEvent = new Event();
    }

    play(cellId) {
        this.cells[cellId - 1] = this.currentPlayer;
        this.updateCellEvent.trigger({cellId, player: this.currentPlayer})
        
        // this.finished = this.victory() || this.draw();

        this.finished = this.victory();

        if(!this.finished) {
            this.switchPlayer();
        }
        return true;
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
        //lines check
        for (let i = 0; i < this.cells.length; i += 7) {
            let count = 1;
            for (let j = i; j < i + 7; j++) {
                if (this.cells[j] && this.cells[j] === this.cells[j + 1]) count++;
                else count = 1;

                if(count === 4) {
                    this.victoryEvent.trigger(this.currentPlayer);
                    return true;
                }  
            }
        }

        //columns check
        for (let i = 1; i <= 7; i++) {
            let count = 1;
            for (let j = i ; j <= this.cells.length; j += 7) {
                // console.log(j)
                if(this.cells[j] && this.cells[j] === this.cells[j + 7]) count++;
                else count = 1;

                if(count === 4) {
                    this.victoryEvent.trigger(this.currentPlayer);
                    return true;
                }
            }
        }

        //diagonals check
        
        
        return false;
    }

    draw() {
        // const draw = this.cells.every(i => i);

        // if (draw) {
        //     this.drawEvent.trigger();
        // }

        // return draw;

        return false;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'blue' ? 'red' : 'blue';
    }
}