import 'phaser';

export default class GameOverScene extends Phaser.Scene
{
    loserText: Phaser.GameObjects.Text

    constructor ()
    {
        super('gameOverScene');
    }

    preload ()
    {
        
    }

    create () {
      this.loserText = this.add.text(400, 500, 'You suck!\nPress any key')
    }

    update() {
      this.input.keyboard.on('keydown', function (event) {
        this.scene.start('gameScene')
      }, this);
    }
}