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

        //Частицы для выигрыша
        this.emitterClub = this.createEmitter('club', -75)
        this.emitterHeart = this.createEmitter('heart', -25)
        this.emitterDiamond = this.createEmitter('diamond', 25)
        this.emitterSpade = this.createEmitter('spade', 75)
    }

    createEmitter(texture, margin) {
        let emitter = this.scene.add.particles(texture).createEmitter({
            x: this.scene.width / 2 + margin,
            y: this.scene.width / 8,
            lifespan: 1500,
            speed: { min: 250, max: 500 },
            scale: { start: 0.8, end: 0 },
            gravityY: 150,
            blendMode: 'ADD',
            emitting: false
        })
        emitter.stop()

        return emitter;
    }


    updateWinText(text) {
        //Выводим текст выигрыша
        this.list[1].setText(text)

        //Показываем инфоблок
        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            ease: 'Quart.easeOut',
            duration: 1200
        });

        //Анимируем текст с выигрышем
        const timeline = this.scene.tweens.timeline({
            onComplete: () => {
                timeline.destroy()
            }
        })

        timeline.add({
            targets: this.list[1],
            scale: 1.2,
            ease: 'Linear',
            rotation: Math.PI / 12,
            duration: 200,
            onComplete: () => {
                //Анимашка выигрыша в виде частиц
                this.emitterClub.explode(16);
                this.emitterHeart.explode(16);
                this.emitterDiamond.explode(16);
                this.emitterSpade.explode(16);
            }
        })

        timeline.add({
            targets: this.list[1],
            scale: 1.5,
            ease: 'Linear',
            rotation: 0,
            duration: 200
        })

        timeline.add({
            targets: this.list[1],
            scale: 1.2,
            ease: 'Linear',
            rotation: -Math.PI / 12,
            duration: 200
        })

        timeline.add({
            targets: this.list[1],
            scale: 1,
            ease: 'Linear',
            rotation: 0,
            duration: 200
        })

        timeline.play()
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

    hide() {
        const tween = this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 200
        })
    }
}