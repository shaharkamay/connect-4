export { Controller };
import { Model } from './model.js';
import { View } from './view.js';

class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();

        
        this.view.playEvent.addListener(cellId => { this.model.play(cellId); });

        this.model.updateCellEvent.addListener(data => { this.view.updateCell(data); });
        this.model.victoryEvent.addListener(winner => { this.view.victory(winner); });
        this.model.drawEvent.addListener(() => { this.view.draw(); });
    }

    run() {
        this.view.render();
    }
}