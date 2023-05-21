export default class TopInfoBlock extends Phaser.GameObjects.Container  {
    constructor(scene, x, y, key) {
        super(scene, x, y)

        //Настройки
        const width = 550
        const height = 160
        const text = 'Good luck!'
        const font = {
            fontFamily: 'Inter',
            fontSize: 48,
            color: '#000000',
            align: 'center'
        }

        const backImage = scene.add.image(width / 2, height / 2, key)

        const infoText = scene.add.text(width / 2, height / 2, text, font)
            .setOrigin(0.5)

        this.add([backImage, infoText])
    }

    updateText(text) {
        this.text = text
        this.list[1].setText(this.text)
    }
}