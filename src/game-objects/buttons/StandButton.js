import Button from './Button.js'

export default class StandButton extends Button {
    constructor(scene, x, y, key) {
        const width = 450
        const height = 150
        const text = 'Stand'
        const font = {
            fontFamily: 'Inter',
            fontSize: 48,
            color: '#FFFFFF',
            align: 'center'
        }

        const callback = function() {
            scene.standChoose()
        }

        super(scene, x, y, width, height, key, text, font, callback)
    }
}