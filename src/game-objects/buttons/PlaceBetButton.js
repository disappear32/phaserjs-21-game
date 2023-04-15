import Button from './Button.js'

export default class PlaceBet extends Button {
    constructor(scene, x, y, key) {
        const width = 450
        const height = 150
        const text = 'Place bet'
        const font = {
            fontFamily: 'Inter',
            fontSize: 48,
            color: '#FFFFFF',
            align: 'center'
        }

        const callback = function() {
            scene.startGame()
        }

        super(scene, x, y, width, height, key, text, font, callback)
    }
}