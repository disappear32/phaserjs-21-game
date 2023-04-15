import Button from './Button.js'

export default class BonusButton extends Button {
    constructor(scene, x, y, key) {
        const width = 120   
        const height = 120
        const text = ''
        const font = {
            fontFamily: 'Inter',
            fontSize: 48,
            color: '#FFFFFF',
            align: 'center'
        }

        const callback = function() {
            console.log('Bonus')
        }

        super(scene, x, y, width, height, key, text, font, callback)
    }
}