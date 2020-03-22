import 'phaser';
import { Physics } from 'phaser';


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
  }

export default class GameScene extends Phaser.Scene
{

    private paddle: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body }
    private ball: Phaser.GameObjects.Ellipse & { body: Phaser.Physics.Arcade.Body }

    lives = 3
    scoreText: Phaser.GameObjects.Text

    isGameStarted = false

  
    constructor ()
    {
        super('sceneConfig');
    }

    preload ()
    {
        
    }

    create () {
      // Paddle
      this.paddle = this.add.rectangle(400, 550, 100, 10, 0xFFFFFF) as any
      this.physics.add.existing(this.paddle)
      this.paddle.body.setCollideWorldBounds(true)
      this.paddle.body.setImmovable(true)

      // Ball
      this.ball = this.add.ellipse(400, 535, 15, 15, 0xFFFFFF) as any
      this.physics.add.existing(this.ball)
      this.ball.body.setCollideWorldBounds(true)
      this.ball.body.bounce.setTo(1, 1);
      setTimeout(() => {
        this.ball.body.setVelocity(Phaser.Math.Between(-100, 100),-400)
        this.isGameStarted = true
      }, 5000)
      
      // Score
      this.scoreText = this.add.text(400, 500, `Lives: ${this.lives}`)

      // Colliders
      this.physics.add.collider(this.paddle, this.ball, this.paddleHitBall, undefined, this)



      
    }


    update() {
      const cursorKeys = this.input.keyboard.createCursorKeys()

      if (cursorKeys.right.isDown) {
        this.movePaddleAndOrBall('right')
      } else if (cursorKeys.left.isDown) {
        this.movePaddleAndOrBall('left')

      } else {
        this.movePaddleAndOrBall()
      }

      this.ballHitWorldBottom()
    }



    movePaddleAndOrBall(direction?: 'left'|'right') {
      if (direction === 'left') {
        if (this.isGameStarted) {
          this.paddle.body.setVelocityX(-500)
        } else {
          this.paddle.body.setVelocityX(-500)
          this.ball.body.setVelocityX(-500)
        }

      } else if (direction === 'right') {
        if (this.isGameStarted) {
          this.paddle.body.setVelocityX(500)

        } else {
          this.paddle.body.setVelocityX(500)
          this.ball.body.setVelocityX(500)
        }

      } else if (!direction) {
        if (this.isGameStarted) {
          this.paddle.body.setVelocityX(0)

        } else {
          this.paddle.body.setVelocityX(0)
          this.ball.body.setVelocityX(0)

        }
      }

      
    }

    paddleHitBall() {
      // randomize the trajectory of the ball when you hit it
      this.ball.body.setVelocity(Phaser.Math.Between(-100, 100), -300)
    }

    ballHitWorldBottom() {
      if (this.ball.body.blocked.down) {
        this.lives -= 1
        this.updateScoreText()
      }
      this.hasLives()

    }

    hasLives() {
      if (this.lives === 0) {
        console.warn('dead')
        this.lives = 3
      }
    }

    updateScoreText() {
      this.scoreText.setText(`Lives: ${this.lives}`)
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: GameScene,
    physics: {
        default: 'arcade',
        arcade: {
          debug: true,
        },
      },
     
}

const game = new Phaser.Game(config)
