import MinusStakeButton from '../buttons/MinusStakeButton.js'
import PlusStakeButton from '../buttons/PlusStakeButton.js'
import PlaceBet from '../buttons/PlaceBetButton.js'
import StakeButton from '../buttons/StakeButton.js'

export default class StakeUI extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key_change, key_place, key_stake) {
        const minusButton = new MinusStakeButton(scene, 115, 30, key_change)
        const plusButton = new PlusStakeButton(scene, 815, 30, key_change)
        const placeBetButton = new PlaceBet(scene, 315, 30, key_place)
        const stakeButton = new StakeButton(scene, 265, 210, key_stake)

        super(scene, x, y, [minusButton, plusButton, placeBetButton, stakeButton])

        scene.add.existing(this)
    }

    hideUI(onCompleteCallback) {
        this.list[0].setDisableState()
        this.list[1].setDisableState()
        this.list[2].setDisableState()
        this.list[3].setDisableState()

        const tween = this.scene.tweens.add({
            targets: this,
            ease: 'Back.easeIn',
            x: -1000,
            duration: 700,
            onComplete: () => {
                this.setPosition(0, this.scene.height + 300)

                this.list[0].setActiveState()
                this.list[1].setActiveState()
                this.list[2].setActiveState()
                this.list[3].setActiveState()

                onCompleteCallback()
            }
        })
    }

    showUI() {
        this.list[0].setDisableState()
        this.list[1].setDisableState()
        this.list[2].setDisableState()
        this.list[3].setDisableState()

        const tween = this.scene.tweens.add({
            targets: this,
            ease: 'Quart.easeOut',
            y: 1380,
            duration: 500,
            onComplete: () => {
                this.list[0].setActiveState()
                this.list[1].setActiveState()
                this.list[2].setActiveState()
                this.list[3].setActiveState()
            }
        })
    }
}