import Button from './Button.js'

export default class ChangeStakeButton extends Button {
    constructor(scene, x, y, key) {
        const width = 950
        const height = 150
        const text = 'Change stake'
        const font = {
            fontFamily: 'Inter',
            fontSize: 48,
            color: '#FFFFFF',
            align: 'center'
        }

        const callback = function() {
            scene.changeChoose()
        }

        super(scene, x, y, width, height, key, text, font, callback)
    }
}