import Button from './Button.js'

export default class PlusStakeButton extends Button {
    constructor(scene, x, y, key) {
        const width = 150
        const height = 150
        const text = '+'
        const font = {
            fontFamily: 'Inter',
            fontSize: 48,
            color: '#FFFFFF',
            align: 'center'
        }

        const changeValue = 50
        const callback = function () {
            scene.updateStake(changeValue)
        }

        super(scene, x, y, width, height, key, text, font, callback)
    }
}