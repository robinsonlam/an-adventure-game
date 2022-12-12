import * as Phaser from 'phaser';
import SandboxScene from './scenes/sandbox/SandboxScene';

const config = {
    name: 'app',
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [SandboxScene],
};

window.game = new Phaser.Game(config);

