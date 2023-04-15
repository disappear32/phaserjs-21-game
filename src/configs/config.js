import Phaser from '../lib/phaser.js'

export default {
    type: Phaser.CANVAS,
    scale: {
        width: 1080,
        height: 1920,
        parent: "game",
        mode: Phaser.Scale.FIT,
        fps: {
            target: 60,
            forceSetTimeOut: true
        }
    }
}