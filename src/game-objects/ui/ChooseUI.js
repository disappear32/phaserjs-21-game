import HitButton from '../buttons/HitButton.js'
import StandButton from '../buttons/StandButton.js'

export default class ChooseUI extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key_hit, key_stand) {
        const hitButton = new HitButton(scene, 65, 0, key_hit)
        const standButton = new StandButton(scene, 565, 0, key_stand)

        super(scene, x, y, [hitButton, standButton])

        scene.add.existing(this)
    }

    hideUI(onCompleteCallback) {
        this.list[0].setDisableState()
        this.list[1].setDisableState()

        const tween = this.scene.tweens.add({
            targets: this,
            ease: 'Back.easeIn',
            x: -1000,
            duration: 700,
            onComplete: () => {
                this.setPosition(0, this.scene.height + 300)

                this.list[0].setActiveState()
                this.list[1].setActiveState()

                onCompleteCallback()
            }
        })
    }

    showUI() {
        this.list[0].setDisableState()
        this.list[1].setDisableState()

        const tween = this.scene.tweens.add({
            targets: this,
            ease: 'Quart.easeOut',
            y: 1380,
            duration: 500,
        })
    }
}