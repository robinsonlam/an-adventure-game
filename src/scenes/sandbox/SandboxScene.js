import * as Phaser from 'phaser';

import PLAYER from '@assets/mystic_woods_sprites/characters/player.png';

export default class SandboxScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SandboxScene' });
  }

  preload() {
    // * Load Character
    this.load.spritesheet('player', PLAYER, { frameWidth: 48, frameHeight: 48 });
  }

  create() {
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(2, 2);

        // Animation set
        this.anims.create({
            key: 'walk-up',
            frames: this.anims.generateFrameNumbers('player', { start: 30, end: 35 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk-side',
            frames: this.anims.generateFrameNumbers('player', { start: 24, end: 29 }),
            frameRate: 8,
            repeat: -1
        });
        
        this.anims.create({
            key: 'walk-down',
            frames: this.anims.generateFrameNumbers('player', { start: 18, end: 23 }),
            frameRate: 8,
            repeat: -1
        });

        // * Bind Player Animations to Keyboard
        this.cursors = this.input.keyboard.createCursorKeys();
    }

  update() {    
    const playerVelocityY = 120;
    const playerVelocityX = 160;

    // * Check Player Keyboard Actions
    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-playerVelocityY);
        this.player.anims.play('walk-up', true);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(playerVelocityY);
        this.player.anims.play('walk-down', true);
    } else {
        this.player.setVelocityY(0);
    }
    
    if (this.cursors.right.isDown) {
        this.player.setVelocityX(playerVelocityX);
        this.player.anims.play('walk-side', true);
        this.player.flipX = false;
    } else if (this.cursors.left.isDown) {
        this.player.setVelocityX(-playerVelocityX);
        this.player.anims.play('walk-side', true);
        this.player.flipX = true;
    } else  {
        this.player.setVelocityX(0);
    }
  }
}