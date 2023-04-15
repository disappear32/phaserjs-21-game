import Phaser from '../lib/phaser.js'
import config from '../configs/config.js'

import Card from '../game-objects/Card.js'
import CardsInfoBlock from '../game-objects/info/CardsInfoBlock.js'

import CommonUI from '../game-objects/ui/CommonUI.js'
import StakeUI from '../game-objects/ui/StakeUI.js'
import ChooseUI from '../game-objects/ui/ChooseUI.js'
import FinalUI from '../game-objects/ui/FinalUI.js'

import ResultInfoBlock from '../game-objects/info/ResultInfoBlock.js'

export default class Game extends Phaser.Scene {
    constructor() {
        super('game')
    }

    stake
    balance

    playerOpenCardsCount
    playerValue

    dealerOpenCardsCount
    dealerValue

    dealerCardsGroup
    playerCardsGroup

    commonUIContainer
    stakeUIContainer
    chooseUIContainer
    finalUIContainer

    resultInfoBlock
    dealerCardsInfoBlock
    playerCardsInfoBlock

    init() {
        this.stake = 50
        this.balance = 5000

        this.dealerValue = 0
        this.playerValue = 0

        this.playerOpenCardsCount = 0
        this.dealerOpenCardsCount = 0

        this.height = config.scale.height
        this.width = config.scale.width
    }

    preload() {
        const progress = this.add.graphics();

        this.load.on('progress', function (value) {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, config.scale.height / 2, config.scale.width * value, 60);

        });

        this.load.on('complete', function () {
            progress.destroy();
        });

        this.load.setPath('assets/');

        this.load.image('backTable', 'backTable.jpg')
        this.load.image('bonus', 'bonus.png')
        this.load.image('setting', 'setting.png')
        this.load.image('gridBackgroundActive', 'gridBackgroundActive.png')
        this.load.image('gridBackgroundDisable', 'gridBackgroundDisable.png')
        this.load.image('placeBet', 'placeBet.png')
        this.load.image('change', 'change.png')
        this.load.image('stakeButton', 'stakeButton.png')
        this.load.image('standButton', 'standButton.png')
        this.load.image('hitButton', 'hitButton.png')
        this.load.image('topInfoBlock', 'topInfoBlock.png')
        this.load.image('repeatBetButton', 'repeatBetButton.png')
        this.load.image('changeStakeButton', 'changeStakeButton.png')
        this.load.image('backActive', 'backActive.png')
        this.load.image('backDisable', 'backDisable.png')
        this.load.image('heart', 'heart.png')
        this.load.image('club', 'club.png')
        this.load.image('diamond', 'diamond.png')
        this.load.image('spade', 'spade.png')
    }

    create() {
        //Бэкграунд для игры
        const background = this.add.image(config.scale.width / 2, (config.scale.height - 120) / 2, 'backTable')

        //Рисуем карты и сохраняем текстуры
        for (let i = 0; i < 4; i++) {
            for (let j = 2; j < 15; j++) {
                this.createCardTexture(i, j)
            }
        }

        //Формируем инфоблоки и кнопки бонуса и настройки
        this.commonUIContainer = new CommonUI(this, 0, 0, 'topInfoBlock', 'setting', 'bonus')

        //Создаем инфоблоки дилера и игрока
        this.dealerCardsInfoBlock = new CardsInfoBlock(this, 65, 390, 'Dealer', 'gridBackgroundActive', 'gridBackgroundDisable')

        this.playerCardsInfoBlock = new CardsInfoBlock(this, 65, 780, 'Player', 'gridBackgroundActive', 'gridBackgroundDisable')

        //Создаем карты дилера и игрока
        this.dealerCardsGroup = this.add.group()
        for (let i = 0; i < 5; i++) {
            const card = new Card(this, 100 + i * 180, 500, 'backActive', 'backDisable')
            this.dealerCardsGroup.add(card)
        }

        this.playerCardsGroup = this.add.group()
        for (let i = 0; i < 5; i++) {
            const card = new Card(this, 100 + i * 180, 890, 'backActive', 'backDisable')
            this.playerCardsGroup.add(card)
        }

        //Создаем кнопки настройки суммы и инфоблок суммы
        this.stakeUIContainer = new StakeUI(this, 0, 1350, 'change', 'placeBet', 'stakeButton')

        //Формируем кнопки еще и стоп
        this.chooseUIContainer = new ChooseUI(this, 0, config.scale.height + 300, 'hitButton', 'standButton')

        //Формируем кнопки повтора и настройки
        this.finalUIContainer = new FinalUI(this, 0, config.scale.height + 300, 'repeatBetButton', 'changeStakeButton')

        //Формируем результирующее сообщение
        this.resultInfoBlock = new ResultInfoBlock(this, 0, 0)
    }

    update() {
        //console.log(game.loop.actualFps)
    }

    startGame() {
        this.updateUI('start') //Выезжают кнопки hit и stand, ui ставки уезжает вбок
        this.updateTextTopInfo('Take your move!') //Обновляем текст в инфоблоке
        this.updateBalance(-this.stake) //Обновляем баланс
        this.setPlayerBackgroundActive() //Подсвечиваем обводку поля игрока
        this.setPlayerCardBackgroundActive(0, 5) //Подсвечиваем рубашки карт игрока

        //Показываем первые две карты дилера и игрока
        this.hitPlayerCards(() => {
            this.hitPlayerCards(() => {
            })
        })
        this.hitDealerCards(() => {
            this.hitDealerCards(() => {
            })
        })
    }

    finishGame() {
        this.updateRepeatStakeValue(this.stake) //Обновляем сумму в кнопке repeat
        this.updateUI('finish') //Появляются кнопки repeat и change, кнопки hit и stand уезжают вбок

        this.setPlayerBackgroundDisable() //Снимаем подсветку с поля игрока
        this.setDealerBackgroundDisable() //Снимаем подсветку с поля дилера

        this.setPlayerCardsBackgroundDisable(0, 5) //Снимаем подсветку с рубашки карт игрока
        this.setDealerCardsBackgroundDisable(0, 5) //Снимаем подсветку с рубашки карт дилера

        const result = this.getResult()

        if (result == 'Win! 🎉') {
            const winSum = this.stake * 2

            this.updateTextTopInfo([
                'You have won:',
                `${winSum} RUB!`
            ])
            this.updateWinBalance(winSum)

            this.resultInfoBlock.updateWinText(result)
        }
        if (result == 'Draw 🗿') {
            this.updateTextTopInfo(`Refund`)

            this.resultInfoBlock.updateText(result)
        }
        if (result == 'Lose 🙄') {
            this.updateTextTopInfo(`Try again!`)

            this.resultInfoBlock.updateText(result)
        }
    }

    standChoose() {
        this.setDealerBackgroundActive() //Подсвечиваем подсветку рубашки карт дилера
        this.setDealerCardsBackgroundActive(this.dealerOpenCardsCount, 5) //Подсвечиваем поле дилера

        this.setPlayerBackgroundDisable() //Снимаем подсветку с рубашки карт игрока
        this.setPlayerCardsBackgroundDisable(this.playerOpenCardsCount, 5) //Снимаем подсветку с поля игрока

        const hitDealer = () => {
            if (this.dealerValue >= 21 || this.dealerOpenCardsCount == 5) {
                this.finishGame()
            } else {
                if (this.dealerValue < 17) this.hitDealerCards(hitDealer)
                else this.finishGame()

            }
        }

        hitDealer();

    }

    repeatChoose() {
        this.updateUI('repeat') //Появляются кнопки hit и stand, кнопки repeat и change уезжают вбок

        this.clearGameField(() => { //Очищаем поле игры
            this.updateTextTopInfo('Take your move!') //Обновляем текст в инфоблоке
            this.updateBalance(-this.stake) //Обновляем баланс

            this.setPlayerCardBackgroundActive(0, 5) //Подсвечиваем рубашки карт игрока
            this.setPlayerBackgroundActive() //Подсвечиваем обводку поля игрока

            this.hitPlayerCards(() => {
                this.hitPlayerCards(() => {
                })
            })
            this.hitDealerCards(() => {
                this.hitDealerCards(() => {
                })
            })
        })

    }

    changeChoose() {
        this.updateUI('change') //Появляется ui ставки, кнопки repeat и change уезжают вбок

        this.clearGameField(() => {
            this.updateTextTopInfo('Make your bet!') //Обновляем текст в инфоблоке
        })
    }

    clearGameField(onCompleteCallback) {
        for (let i = 0; i < this.dealerOpenCardsCount; i++) {
            this.dealerCardsGroup.children.entries[i].flipFront(() => {

            })
        }
        for (let i = 0; i < this.playerOpenCardsCount; i++) {
            this.playerCardsGroup.children.entries[i].flipFront(() => {
                if (i == this.playerOpenCardsCount - 1) {
                    this.dealerValue = 0
                    this.playerValue = 0

                    this.playerOpenCardsCount = 0
                    this.dealerOpenCardsCount = 0

                    this.dealerCardsInfoBlock.setValueDisable()
                    this.playerCardsInfoBlock.setValueDisable()

                    onCompleteCallback()
                }
            })
        }
    }


    getResult() {
        const lose = 'Lose 🙄'
        const draw = 'Draw 🗿'
        const win = 'Win! 🎉'

        if (this.playerValue <= 21) {
            const result = this.playerValue - this.dealerValue

            if (result > 0) return win;
            else if (result == 0) return draw;
            else if (this.dealerValue > 21) return win;
            else return lose
        }
        else return lose
    }

    updateUI(stage) {
        switch (stage) {
            case 'start': {
                this.stakeUIContainer.hideUI(() => {
                    this.chooseUIContainer.showUI()
                })
            }
                break;

            case 'finish': {
                this.chooseUIContainer.hideUI(() => {
                    this.finalUIContainer.showUI()
                })
            }
                break;

            case 'repeat': {
                this.resultInfoBlock.hide()

                this.finalUIContainer.hideUI(() => {
                    this.chooseUIContainer.showUI()
                })
            }
                break;

            case 'change': {
                this.resultInfoBlock.hide()
                
                this.finalUIContainer.hideUI(() => {
                    this.stakeUIContainer.showUI()
                })
            }
                break;
        }

    }

    hitPlayerCards(onCompleteCallback) {
        this.chooseUIContainer.list[0].setDisableState()
        this.chooseUIContainer.list[1].setDisableState()

        //Получаю данные о номинале карты и обновляю счетчик игрока
        const randomPlayerValue = getRandomValue()

        this.playerCardsGroup.children.entries[this.playerOpenCardsCount]
            .setFrontTexture(`${randomPlayerValue}_${getRandomSuit()}`)
        this.playerCardsGroup.children.entries[this.playerOpenCardsCount]
            .flipBack(() => {
                this.chooseUIContainer.list[0].setActiveState()
                this.chooseUIContainer.list[1].setActiveState()

                this.updateValue(randomPlayerValue, 'player')
                this.playerOpenCardsCount++

                if (this.playerOpenCardsCount > 4) {
                    if (this.playerValue > 21) this.finishGame()
                    else this.standChoose()
                } else {
                    if (this.playerValue > 21) this.finishGame()
                    if (this.playerValue == 21) this.standChoose()
                }

                onCompleteCallback()
            })

    }

    hitDealerCards(onCompleteCallback) {  //добавить задержку
        //Получаю данные о номинале карты и обновляю счетчик дилера
        const randomDealerValue = getRandomValue()

        this.dealerCardsGroup.children.entries[this.dealerOpenCardsCount]
            .setFrontTexture(`${randomDealerValue}_${getRandomSuit()}`)
        this.dealerCardsGroup.children.entries[this.dealerOpenCardsCount]
            .flipBack(() => {
                this.updateValue(randomDealerValue, 'dealer')
                this.dealerOpenCardsCount++

                onCompleteCallback()
            })

    }

    updateValue(value, role) {
        //Обновляю кол-во очков в счетчиках на актуальное
        let previousValue, currentValue

        switch (value) {
            case 11:
                value = 2;
                break;
            case 12:
                value = 3;
                break;
            case 13:
                value = 4;
                break;
            case 14:
                value = 11;
                break;
        }

        if (role == 'player') {
            previousValue = this.playerValue
            currentValue = this.playerValue + value

            this.playerValue += value
            this.playerCardsInfoBlock.updateText(previousValue, currentValue)
        } else {
            previousValue = this.dealerValue
            currentValue = this.dealerValue + value

            this.dealerValue += value
            this.dealerCardsInfoBlock.updateText(previousValue, currentValue)
        }
    }

    updateStake(sum) {
        if (this.stake > 0) {
            this.stake += sum
            this.stakeUIContainer.list[3].updateText(this.stake, this)
        }
        else {
            if (this.stake < sum) this.stake += sum
        }
    }

    updateBalance(value) {
        const previousValue = this.balance
        const currentValue = this.balance + value
        this.balance += value
        this.commonUIContainer.list[3].updateBalanceText(previousValue, currentValue)
    }

    updateWinBalance(value) {
        const previousValue = this.balance
        const currentValue = this.balance + value
        this.balance += value
        this.commonUIContainer.list[3].updateBalanceWinText(previousValue, currentValue)
    }

    updateTextTopInfo(text) {
        this.commonUIContainer.list[0].updateText(text)
    }

    setPlayerBackgroundActive() {
        this.playerCardsInfoBlock.setBackgroundActive()
    }

    setPlayerBackgroundDisable() {
        this.playerCardsInfoBlock.setBackgroundDisable()
    }

    setDealerBackgroundActive() {
        this.dealerCardsInfoBlock.setBackgroundActive()
    }

    setDealerBackgroundDisable() {
        this.dealerCardsInfoBlock.setBackgroundDisable()
    }

    setPlayerCardBackgroundActive(startIndex, finishIndex) {
        for (let i = startIndex; i < finishIndex; i++) {
            this.playerCardsGroup.children.entries[i].setBackgroundActive()
        }
    }

    setDealerCardsBackgroundActive(startIndex, finishIndex) {
        for (let i = startIndex; i < finishIndex; i++) {
            this.dealerCardsGroup.children.entries[i].setBackgroundActive()
        }
    }

    setPlayerCardsBackgroundDisable(startIndex, finishIndex) {
        for (let i = startIndex; i < finishIndex; i++) {
            this.playerCardsGroup.children.entries[i].setBackgroundDisable()
        }
    }

    setDealerCardsBackgroundDisable(startIndex, finishIndex) {
        for (let i = startIndex; i < finishIndex; i++) {
            this.dealerCardsGroup.children.entries[i].setBackgroundDisable()
        }
    }

    updateRepeatStakeValue(sum) {
        this.finalUIContainer.list[0].updateStakeValue(sum)
    }

    createCardTexture(i, j) {
        //Определем масть
        let suit, color
        switch (i) {
            case 0:
                suit = 'spade'
                color = '#000000'
                break;

            case 1:
                suit = 'club'
                color = '#000000'
                break;

            case 2:
                suit = 'heart'
                color = '#FF0000'
                break;

            case 3:
                suit = 'diamond'
                color = '#FF0000'
                break;
        }

        //Опеределем номинал карты
        let value = j
        let textValue
        switch (j) {
            case 11:
                textValue = 'J';
                break;
            case 12:
                textValue = 'Q';
                break;
            case 13:
                textValue = 'K';
                break;
            case 14:
                textValue = 'A';
                break;

            default:
                textValue = j.toString()
                break;
        }

        const back = this.add.graphics()
        back.fillStyle(0xFFFFFF, 1)
        back.fillRoundedRect(0, 0, 160, 220, 10)

        const font = {
            fontFamily: 'Inter',
            fontSize: 64,
            fill: color
        }

        const text = this.add.text(0, 0, textValue, font)

        const suitImage = this.add.sprite(0, 0, suit)
            .setOrigin(0)

        const cardTexture = this.add.renderTexture(0, 0, 160, 220)
        cardTexture.draw(back, 0, 0)
        cardTexture.draw(text, 20, 10)
        cardTexture.draw(suitImage, 32, 100)
        cardTexture.saveTexture(`${value}_${suit}`)

        back.destroy()
        text.destroy()
        suitImage.destroy()
        cardTexture.destroy()
    }


}

function getRandomSuit() {
    const suit = [
        'spade',
        'club',
        'heart',
        'diamond'
    ]

    return suit[Math.floor(Math.random() * 4)]
}

function getRandomValue() {
    return Math.floor(Math.random() * 12 + 2)
}