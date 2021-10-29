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
            this.cells.push(this.createElement('div', [i], ['cell'], {id: i}, {click: (e) => {
                this.playEvent.trigger(i);
            }}));
            if(i % 7 === 0) {
                lineDiv = this.createElement('div', [], ['line', 'row']);
                board.append(lineDiv);
            }
            lineDiv.append(this.cells[i]);
        }
        const main = this.createElement('main', [board]);
        document.body.append(main);

        this.message = this.createElement('div', [], ['message']);
        document.body.append(this.message);
    }

    updateCell(data) {
        this.cells[data.cellId].textContent = data.player;
    }

    victory(winner) {
        console.log(`${winner} wins!`);
        this.message.textContent = `${winner} wins!`;
    }

    draw() {
        this.message.textContent = "It's a draw!";
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