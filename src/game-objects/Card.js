export default class Card extends Phaser.GameObjects.Group {
    front
    back

    keyBackActive
    keyBackDisable

    constructor(scene, x, y, key_backActive, key_backDisable) {
        super(scene)
        this.keyBackActive = key_backActive
        this.keyBackDisable = key_backDisable

        const width = 160
        const height = 220

        const front = scene.add.image(x + width / 2, y + height / 2, this.keyBackDisable)
        const back = scene.add.image(x + width / 2, y + height / 2, this.keyBackDisable)

        this.add(front)
        this.add(back)

        this.front = this.children.entries[0]
        this.back = this.children.entries[1]

        this.front.setVisible(false)
        this.turn = false
    }

    setBackgroundActive() {
        this.back.setTexture(this.keyBackActive)
    }

    setBackgroundDisable() {
        this.back.setTexture(this.keyBackDisable)
    }

    setFrontTexture(key) {
        this.front.setTexture(key)
    }

    flipFront() {
        this.back.scale = 1
        this.back.scaleX = 0

        const timeline = this.scene.tweens.timeline({
            onComplete: () => {
                timeline.destroy()

                this.front.setVisible(false)
                this.back.setVisible(true)

                this.back.scale = 1.1
                this.back.scaleX = 0

                const newTimeline = this.scene.tweens.timeline({
                    onComplete: () => {
                        newTimeline.destroy()
                    }
                })

                newTimeline.add({
                    targets: this.back,
                    scaleX: 1.1,
                    alpha: 0.9,
                    duration: 200
                })

                newTimeline.add({
                    targets: this.back,
                    scale: 1,
                    alpha: 1,
                    duration: 200,
                    delay: 100,
                })

                newTimeline.play()
            }
        })

        timeline.add({
            targets: this.front,
            scale: 1.1,
            alpha: 1,
            duration: 200
        })

        timeline.add({
            targets: this.front,
            scaleX: 0,
            alpha: 0.1,
            duration: 200,
            delay: 100
        })

        timeline.play()
    }

    flipBack(onCompleteCallback) {
        this.front.scale = 1
        this.front.scaleX = 0
        
        const timeline = this.scene.tweens.timeline({
            onComplete: () => {
                timeline.destroy()

                this.back.setVisible(false)
                this.front.setVisible(true)

                this.front.scale = 1.1
                this.front.scaleX = 0

                const newTimeline = this.scene.tweens.timeline({
                    onComplete: () => {
                        onCompleteCallback()
                        newTimeline.destroy()
                    }
                })

                newTimeline.add({
                    targets: this.front,
                    scaleX: 1.1,
                    alpha: 0.9,
                    duration: 200
                })

                newTimeline.add({
                    targets: this.front,
                    scale: 1,
                    alpha: 1,
                    duration: 200,
                    delay: 100,
                })

                newTimeline.play()
            }

        })

        timeline.add({
            targets: this.back,
            scale: 1.1,
            alpha: 1,
            duration: 200
        })

        timeline.add({
            targets: this.back,
            scaleX: 0,
            alpha: 0.1,
            duration: 200,
            delay: 100
        })

        timeline.play()

    }

}