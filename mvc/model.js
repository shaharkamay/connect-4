export { Model };
import { Event } from '../scripts/event.js';

class Model {
    constructor() {
        this.cells = Array(49).fill("");
        this.currentPlayer = 'yellow';
        this.finished = false;

        this.updateCellEvent = new Event();
        this.victoryEvent = new Event();
        this.drawEvent = new Event();
    }

    play(cellId) {
        const column = cellId % 7; //0 - 6
        for (let i = this.cells.length - (7 - column); i >= 0; i -= 7) {
            if(!this.cells[i] && !this.cells[i - 7]) {
                cellId = i;
                break;
            } 
        }
        this.cells[cellId] = this.currentPlayer;
        this.updateCellEvent.trigger({cellId, player: this.currentPlayer})
        
        this.finished = this.victory() || this.draw();

        if(!this.finished) {
            this.switchPlayer();
        }
        return cellId;
    }

    victory() {
        //lines check
        for (let i = 0; i < this.cells.length; i += 7) {
            let count = 1;
            for (let j = i; j < i + 7; j++) {
                if (this.cells[j] && this.cells[j] === this.cells[j + 1]) count++;
                else count = 1;

                if(count === 4) {
                    this.victoryEvent.trigger(this.currentPlayer);
                    console.log("win by lines")
                    return true;
                }  
            }
        }

        //columns check
        for (let i = 0; i < 7; i++) {
            let count = 1;
            for (let j = i ; j <= this.cells.length; j += 7) {
                if(this.cells[j] && this.cells[j] === this.cells[j + 7]) count++;
                else count = 1;

                if(count === 4) {
                    this.victoryEvent.trigger(this.currentPlayer);
                    console.log("win by cols")
                    return true;
                }
            }
        }

        //top-left-right diagonals check
        for (let i = 0; i < 7; i++) {
            let count = 1;
            for (let j = i; j <= this.cells.length - (i * 7) - 7; j += 8) {
                if(this.cells[j] && this.cells[j] === this.cells[j + 8]) count ++;
                else count = 1;

                if(count === 4) {
                    this.victoryEvent.trigger(this.currentPlayer);
                    console.log("win by top-left-right diagonals");
                    return true;
                }
            }
        }

        //top-left-bottom diagonal check
        for (let i = 7; i < this.cells.length; i += 7) {
            let count = 1;
            for (let j = i; j < this.cells.length - 7; j += 8) {
                if(this.cells[j] && this.cells[j] === this.cells[j + 8]) count++;
                else count = 1;

                if(count === 4) {
                    this.victoryEvent.trigger(this.currentPlayer);
                    console.log("win by top-left-bottom diagonals");
                    return true;
                }
            }
            
        }

        //top-right-left diagonal check
        for (let i = 6; i >= 0; i--) {
            let count = 1;
            for (let j = i; j <= this.cells.length - ((7 - i) * 7) - 6; j += 6) {
                if(this.cells[j] && this.cells[j] === this.cells[j + 6]) count++;
                else count = 1;

                if(count === 4) {
                    this.victoryEvent.trigger(this.currentPlayer);
                    console.log("win by top-right-left diagonal");
                    return true;
                }
            }
        }

        //top-right-bottom diagonal check
        for (let i = 13; i < this.cells.length; i += 7) {
            let count = 1;
            for (let j = i; j < this.cells.length - 6; j += 6) {
                if(this.cells[j] && this.cells[j] === this.cells[j + 6]) count++;
                else count = 1;

                if(count === 4) {
                    this.victoryEvent.trigger(this.currentPlayer);
                    console.log("win by top-right-bottom diagonal");
                    return true;
                }
            }
            
        }
        
        return false;
    }

    draw() {
        const draw = this.cells.every(i => i);

        if (draw) {
            this.drawEvent.trigger();
        }

        return draw;

        // return false;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'yellow' ? 'red' : 'yellow';
    }
}