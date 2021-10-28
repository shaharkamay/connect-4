export { View };
import { Event } from '../scripts/event.js';

class View {
    constructor() {
        this.playEvent = new Event();
    }

    render() {
        const board = this.createElement('section', [], ['board', 'col']);
        let lineDiv = this.createElement('div', [], ['line', 'row']);
        this.cells = [];
        for (let i = 0; i < 49; i++) {
            this.cells.push(this.createElement('div', [i + 1], ['cell'], {id: i + 1}, {click: (e) => {
                e.target.textContent = "clicked";
            }}));
            if(i % 7 === 0) {
                lineDiv = this.createElement('div', [], ['line', 'row']);
                board.append(lineDiv);
            }
            lineDiv.append(this.cells[i]);
        }
        const main = this.createElement('main', [board]);
        document.body.append(main);
        document.body.append(this.message);
    }

    updateCell(cellId, player) {
        this.cells[cellId].textContent = player;
    }

    victory(winner) {
        this.message.innerHTML = `${winner} wins!`;
    }

    draw() {
        this.message.innerHTML = "It's a draw!";
    }

    createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
        const element = document.createElement(tagName);
        for(const child of children) element.append(child);
        element.classList = classes.join(" ");
        for(const attr in attributes) element.setAttribute(attr, attributes[attr]);
        for(const event in eventListeners) element.addEventListener(event, eventListeners[event]);
        return element;
    }
}