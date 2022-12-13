import * as Phaser from 'phaser';

import PLAYER_SPRITE from '@assets/mystic_woods_sprites/characters/player.png';
import Player from '@prefabs/player/Player';

let PLAYER_1_ID = 'PLAYER_1'

export default class SandboxScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SandboxScene' });
    }

    preload() {
        // * Load Character
        this.load.spritesheet(PLAYER_1_ID, PLAYER_SPRITE, { frameWidth: 48, frameHeight: 48 });
    }

    create() {
        this.player = new Player(this, 100, 450, PLAYER_1_ID)

        // Animation set
        this.anims.create({
            key: 'walk-up',
            frames: this.anims.generateFrameNumbers(PLAYER_1_ID, { start: 30, end: 35 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'walk-side',
            frames: this.anims.generateFrameNumbers(PLAYER_1_ID, { start: 24, end: 29 }),
            frameRate: 8,
            repeat: -1
        });
        
        this.anims.create({
            key: 'walk-down',
            frames: this.anims.generateFrameNumbers(PLAYER_1_ID, { start: 18, end: 23 }),
            frameRate: 8,
            repeat: -1
        });

        // Animation set - stand
        this.anims.create({
            key: 'stand-up',
            frames: this.anims.generateFrameNumbers(PLAYER_1_ID, { start: 12, end: 17 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'stand-side',
            frames: this.anims.generateFrameNumbers(PLAYER_1_ID, { start: 6, end: 11 }),
            frameRate: 8,
            repeat: -1
        });
        
        this.anims.create({
            key: 'stand-down',
            frames: this.anims.generateFrameNumbers(PLAYER_1_ID, { start: 0, end: 5 }),
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
        } else {
            this.player.setVelocityX(0);
        }
    }
}