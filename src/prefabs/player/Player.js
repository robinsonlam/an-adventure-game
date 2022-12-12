import * as Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, id) {
    let playerId = `Player_${id}`;
    super(scene, x, y, playerId);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.world.enable(this);
    
    this.playerId = playerId;
    this.setCollideWorldBounds(true);
    this.setScale(2, 2);
  }
}