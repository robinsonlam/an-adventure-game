import * as Phaser from 'phaser';

import PLAYER_SPRITE from '@assets/mystic_woods_sprites/characters/player.png';
import Player from '@prefabs/player/Player';

let PLAYER_1_ID = 'PLAYER_1'

const getDirectionalKeys = ({ cursors, inputKeys }) => {
    return {
        up: cursors.up.isDown || inputKeys.up.isDown,
        down: cursors.down.isDown || inputKeys.down.isDown,
        left: cursors.left.isDown || inputKeys.left.isDown,
        right: cursors.right.isDown || inputKeys.right.isDown,
    }
}

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

        // Animation set - walk
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

        // Animation set - idle
        this.anims.create({
            key: 'idle-up',
            frames: this.anims.generateFrameNumbers(PLAYER_1_ID, { start: 12, end: 17 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'idle-side',
            frames: this.anims.generateFrameNumbers(PLAYER_1_ID, { start: 6, end: 11 }),
            frameRate: 8,
            repeat: -1
        });
        
        this.anims.create({
            key: 'idle-down',
            frames: this.anims.generateFrameNumbers(PLAYER_1_ID, { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        
        // Animation set - attack
        this.anims.create({
            key: 'attack-up',
            frames: this.anims.generateFrameNumbers(PLAYER_1_ID, { start: 48, end: 51 }),
            frameRate: 12,
            repeat: 1
        });

        this.anims.create({
            key: 'attack-side',
            frames: this.anims.generateFrameNumbers(PLAYER_1_ID, { start: 42, end: 45 }),
            frameRate: 12,
            repeat: 1
        });
        
        this.anims.create({
            key: 'attack-down',
            frames: this.anims.generateFrameNumbers(PLAYER_1_ID, { start: 36, end: 39 }),
            frameRate: 12,
            repeat: 1
        });

        // * Bind Player Animations to Keyboard
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.mouse.capture = true;

        this.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })

        this.player.anims.play('idle-down', true);
        this.player.facingDirection = 'down';
    }

    update() {    
        const playerVelocityY = 120;
        const playerVelocityX = 160;

        let idleY = false;
        let idleX = false;

        let directionKeys = getDirectionalKeys({ cursors: this.cursors, inputKeys: this.inputKeys });
        let playerAnim = this.player.anims;

        if (this.input.activePointer.leftButtonDown()) {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            
            if (this.player.facingDirection === 'up') {
                playerAnim.play('attack-up', true);
            } else if (this.player.facingDirection === 'down') {
                playerAnim.play('attack-down', true);
            } else if (this.player.facingDirection === 'left' || this.player.facingDirection === 'right') {
                playerAnim.play('attack-side', true);
            }
        } else {
            // * Check Player Keyboard Actions
            if (directionKeys.up) {
                this.player.setVelocityY(-playerVelocityY);
                playerAnim.play('walk-up', true);

                this.player.facingDirection = 'up';
            } else if (directionKeys.down) {
                this.player.setVelocityY(playerVelocityY);
                playerAnim.play('walk-down', true);

                this.player.facingDirection = 'down';
            } else {
                idleY = true;
                this.player.setVelocityY(0);
            }
            
            if (directionKeys.right) {
                this.player.setVelocityX(playerVelocityX);
                playerAnim.play('walk-side', true);
                this.player.facingDirection = 'right';
                this.player.flipX = false;
            } else if (directionKeys.left) {
                this.player.setVelocityX(-playerVelocityX);
                playerAnim.play('walk-side', true);
                this.player.facingDirection = 'left';
                this.player.flipX = true;
            } else {
                idleX = true;
                this.player.setVelocityX(0);
            }


            if (idleX && idleY) {
                if (this.player.facingDirection === 'up') {
                    playerAnim.play('idle-up', true);
                } else if (this.player.facingDirection === 'down') {
                    playerAnim.play('idle-down', true);
                } else {
                    playerAnim.play('idle-side', true);
                }
            }
        }

    }
}