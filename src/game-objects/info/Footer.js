export default class Footer extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y)
        
        //Настройки
        const width = 1080
        const height = 120
        const color = 0x282F3F
        const font = {
            fontFamily: 'Inter',
            fontSize: 36,
            color: '#FFFFFF',
            align: 'center'
        }

        //Создаем графический объект и оборачиваем его в текстуру
        const footerRectangle = scene.make.graphics()
        footerRectangle.fillStyle(color, 1)
        footerRectangle.fillRect(0, 0, width, height)
        footerRectangle.generateTexture('footer', width, height)

        const footer = scene.add.image(width / 2, height / 2, 'footer')

        const balanceText = scene.add.text(width / 4, height / 2, [
            'Balance:',
            `${scene.balance} FUN`
        ], font)
            .setOrigin(0.5)

        const playtimeText = scene.add.text(width / 4 * 3, height / 2, [
            'Your playtime:',
            '00:00:00'
        ], font)
            .setOrigin(0.5) // Написать потом логику обновления времени в игре

        this.add([footer, balanceText, playtimeText])

        this.playtimeSeconds = 0

        this.scene.time.addEvent({
            delay: 1000, // вызываем обработчик раз в секунду
            callback: this.updatePlaytime, // метод, который обновляет время
            callbackScope: this,
            loop: true // позволяет повторять событие каждый раз через указанный интервал
        });
    }

    updatePlaytime() {
        this.playtimeSeconds++

        const hours = Math.floor(this.playtimeSeconds / 3600)
        const minutes = Math.floor((this.playtimeSeconds % 3600) / 60)
        const seconds = Math.floor(this.playtimeSeconds % 60)

        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

        this.list[2].setText([
            'Your playtime:',
            formattedTime
        ]);
    }

    updateBalanceWinText(previousValue, currentValue) {
        this.scene.tweens.add({
            targets: this.list[1],
            scale: 1.5,
            ease: 'Sine.easeInOut',
            duration: 500,
            yoyo: true,
            repeat: 0
        });

        this.scene.tweens.addCounter({
            from: previousValue,
            to: currentValue, 
            duration: 500,
            ease: 'Linear',
            onUpdate: tween => {
                const value = Math.floor(tween.getValue())

                this.list[1].setText([
                    'Balance:',
                    `${value} FUN`
                ])
            }
        })
    }

    updateBalanceText(previousValue, currentValue) {
        this.scene.tweens.addCounter({
            from: previousValue,
            to: currentValue, 
            duration: 500,
            ease: 'Linear',
            onUpdate: tween => {
                const value = Math.floor(tween.getValue())

                this.list[1].setText([
                    'Balance:',
                    `${value} FUN`
                ])
            }
        })
    }
}