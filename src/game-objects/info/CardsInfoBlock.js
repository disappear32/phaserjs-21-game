export default class CardsInfoBlock extends Phaser.GameObjects.Container {
    active
    disable

    constructor(scene, x, y, text, key_active, key_disable) {
        super(scene, x, y)

        //Настройки
        const width = 950
        const height = 360
        const font = {
            fontFamily: 'Inter',
            fontSize: 36,
            color: '#FFFFFF'
        }

        this.active = key_active
        this.disable = key_disable

        const backImage = scene.add.image(width / 2, height / 2, key_disable)

        const roleText = scene.add.text(35, 38, text, font)

        const valueText = scene.add.text(915, 38, '', font)
            .setOrigin(1, 0)
            .setVisible(false)

        this.add([backImage, roleText, valueText])

        scene.add.existing(this)
    }

    updateText(previousValue, currentValue) {
        this.setValueVisible()

        const text = this.list[2]
        const originalScale = text.scale
        
        this.scene.tweens.add({
            targets: text,
            scale: 1.2,
            duration: 100,
            yoyo: true,
            repeat: 1,
            onStart: () => {
                text.setText(`${previousValue}`)
            },
            onComplete: () => {
                text.setScale(1)
                text.setText(`${currentValue}`)
            }
        });
        
        this.scene.tweens.addCounter({
            from: previousValue,
            to: currentValue, 
            duration: 200,
            ease: 'Linear',
            onUpdate: tween => {
                const value = Math.floor(tween.getValue())

                text.setText(`${value}`)
            }
        })
    }

    setBackgroundActive() {
        this.list[0].setTexture(this.active)
    }

    setBackgroundDisable() {
        this.list[0].setTexture(this.disable)
    }

    setValueVisible() {
        this.list[2].setVisible(true)
    }

    setValueDisable() {
        this.list[2].setVisible(false)
    }
}