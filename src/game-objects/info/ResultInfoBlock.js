export default class ResultInfoBlock extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y)

        //Настройки
        const width = 1080
        const height = 1800
        const text = ''
        const color = 0x150404
        const aplha = 0.65
        const font = {
            fontFamily: 'Inter',
            fontSize: 64,
            color: '#FFFFFF',
            align: 'center'
        }

        const back = scene.add.graphics()
        back.fillStyle(color, aplha)
        back.fillRect(0, 0, width, height)

        const infoText = scene.add.text(width / 2, 315, text, font)
            .setOrigin(0.5)

        this.add([back, infoText])

        this.setAlpha(0)

        scene.add.existing(this)
    }

    updateWinText(text) {
        const vector = Math.random() < 0.5 ? -1 : 1 //Дляя выбора направления, куда будет качаться текст
        //Нужно добавить еще конфети
        this.list[1].setText(text)

        this.scene.tweens.add({
            targets: this.list[1],
            scale: 1.5,
            ease: 'Sine.easeInOut',
            rotation: vector * Math.PI / 12,
            duration: 1200,
            yoyo: true,
            repeat: 0
        });

        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            ease: 'Quart.easeOut',
            duration: 1200
        });
    }

    updateText(text) {
        this.list[1].setText(text)

        const tween = this.scene.tweens.add({
            targets: this,
            alpha: 1,
            ease: 'Quart.easeOut',
            duration: 1200
        })
    }
}