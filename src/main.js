import Phaser from './lib/phaser.js'
import config from './configs/config.js'

import Game from './scenes/Game.js'

class TwentyOne extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add('game', Game);
        this.scene.start('game');
    }
}

window.game = new TwentyOne();