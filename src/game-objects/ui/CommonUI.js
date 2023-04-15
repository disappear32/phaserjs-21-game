import TopInfoBlock from '../info/TopInfoBlock.js'
import Footer from '../info/Footer.js'
import SettingButton from '../buttons/SettingButton.js'
import BonusButton from '../buttons/BonusButton.js'

export default class CommonUI extends Phaser.GameObjects.Container {
    topInfo
    footer
    setting_button
    bonus_button

    constructor(scene, x, y, key_top, key_setting, key_bonus) {
        const topInfoBlock = new TopInfoBlock(scene, 265, 0, key_top)
        const setting_button = new SettingButton(scene, 65, 65, key_setting)
        const bonus_button = new BonusButton(scene, 895, 65, key_bonus)
        const footer = new Footer(scene, 0, 1800)

        super(scene, x, y, [topInfoBlock, setting_button, bonus_button, footer])

        this.setDepth(2)
        scene.add.existing(this)

        this.topInfo = this.list[0]
        this.footer = this.list[3]
        this.setting_button = this.list[1]
        this.bonus_button = this.list[2]
    }
    
}