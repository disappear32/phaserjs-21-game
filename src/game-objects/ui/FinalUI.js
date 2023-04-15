import RepeatBetButton from '../buttons/RepeatBetButton.js'
import ChangeStakeButton from '../buttons/ChangeStakeButton.js'

export default class FinalUI extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key_repeat, key_change) {
        const repeatBetButton = new RepeatBetButton(scene, 65, 0, key_repeat)
        const changeStakeButton = new ChangeStakeButton(scene, 65, 180, key_change)

        super(scene, x, y, [repeatBetButton, changeStakeButton])

        this.setDepth(2)
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
            onComplete: () => {
                this.list[0].setActiveState()
                this.list[1].setActiveState()
            }
        })
    }
}