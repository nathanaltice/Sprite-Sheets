// Nathan Altice
// Created: 4/11/23
// Updated: 1/13/24
// A simple demo that illustrates texture atlas animation
// Robot sprites by pzUH: https://opengameart.org/content/the-robot-free-sprite

class Demo extends Phaser.Scene {
    constructor() {
        super('demoScene')
    }

    preload() {
        // load texture atlas
        this.load.atlas('robot', 'assets/robotsheet.png', 'assets/robotsheet.json')
    }

    create() {
        // define animations
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('robot', {
                prefix: 'Idle (',
                start: 1,
                end: 10,
                suffix: ')'
            }),
            frameRate: 15,
            repeat: -1      // loop animation
        })

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('robot', {
                prefix: 'Run (',
                start: 1,
                end: 8,
                suffix: ')'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'slide',
            frames: this.anims.generateFrameNames('robot', {
                prefix: 'Slide (',
                start: 1,
                end: 10,
                suffix: ')'
            }),
            frameRate: 15,
            repeat: -1 
        })

        // add robot
        this.robot = this.add.sprite(config.width/2, config.height/2, 'robot', 'Idle (1)')

        // enable keyboard cursor control
        cursors = this.input.keyboard.createCursorKeys()

        // instruction text
        document.getElementById('info').innerHTML = 'Left/Right: Run | Down: Slide'
    }

    update() {
        if (cursors.right.isDown) {
            this.robot.resetFlip()             // make sure sprite isn't flipped
            this.robot.play('run', true)       // 'true' makes sure the anim won't re-trigger if it's already playing
        } else if (cursors.left.isDown) {
            this.robot.setFlip(true, false)    // flip sprite on x-axis
            this.robot.play('run', true)
        } else if (cursors.down.isDown) {
            this.robot.play('slide', true)
        } else {
            this.robot.play('idle', true)      // if no input, set to idle
        }
    }
}

config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.AUTO,
    height: 640,
    width: 640,
    scene: [ Demo ]
}

const game = new Phaser.Game(config)
let cursors