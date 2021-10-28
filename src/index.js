import { Controller } from '../mvc/controller.js';

const controller = new Controller();
controller.run();
// const board = createElement('section', [], ['board', 'col']);
// let lineDiv = createElement('div', [], ['line', 'row']);
// for (let i = 0; i < 49; i++) {
//     const cellDiv = createElement('div', [i + 1], ['cell'], {id: i + 1});
//     if(i % 7 === 0) {
//         lineDiv = createElement('div', [], ['line', 'row']);
//         board.append(lineDiv);
//     }
//     lineDiv.append(cellDiv);
// }
// const main = createElement('main', [board]);
// document.body.appendChild(main);

// function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
//     const element = document.createElement(tagName);
//     for(const child of children) element.append(child);
//     element.classList = classes.join(" ");
//     for(const attr in attributes) element.setAttribute(attr, attributes[attr]);
//     for(const event in eventListeners) element.addEventListener(event, eventListeners[event]);
//     return element;
// }