import Button from './Button.js'

export default class RepeatBetButton extends Button {
    constructor(scene, x, y, key) {
        const width = 950
        const height = 150
        const text = [
            'Repeat game',
            `${scene.stake} FUN`
        ]
        const font = {
            fontFamily: 'Inter',
            fontSize: 48,
            color: '#FFFFFF',
            align: 'center'
        }

        const callback = function () {
            scene.repeatChoose()
        }

        super(scene, x, y, width, height, key, text, font, callback)
    }

    updateStakeValue(value) {
        this.list[1].setText([
            'Repeat game',
            `${value} FUN`
        ])

        return this
    }
}