export default class Button extends Phaser.GameObjects.Container {
    callback
    button
    text

    constructor(scene, x, y, width, height, key, text, font, callback) {
        super(scene, x, y)

        this.callback = callback

        const backImage = scene.add.image(width / 2, height / 2, key)
        const infoText = scene.add.text(width / 2, height / 2, text, font)
            .setOrigin(0.5)

        this.add([backImage, infoText])

        this.button = this.list[0]
        this.text = this.list[1]

        const sound = this.scene.sound.add('click_sound');

        this.button
            .setInteractive({ useHandCursor: true })
            .on('pointerup', () => {
                sound.play()
                this.playPressedAnimation()
                this.callback()
            })
    }

    updateText(text) {
        this.text.setText(text)
    }

    setDisableState() {
        this.button.disableInteractive()
        this.setAlpha(0.5)
    }

    setActiveState() {
        this.button.setInteractive({ useHandCursor: true })
        this.setAlpha(1)
    }

    playPressedAnimation() {
        const tween = this.scene.tweens.add({
            targets: this.button,
            scale: {from: 1, to: 0.9},
            duration: 40,
            yoyo: true
        })
    }
}