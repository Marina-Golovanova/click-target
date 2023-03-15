import { Target } from "./target";

export class Targets extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.scene = scene;

    this.timer = this.scene.time.addEvent({
      delay: 750,
      callback: this.tick,
      callbackScope: this,
      loop: true,
    });
  }

  createTarget() {
    let target = this.getFirstDead();

    if (!target) {
      target = Target.generate(this.scene);
      this.add(target);
    } else {
      target.reset();
    }

    target.grow();
  }

  tick() {
    this.createTarget();
  }

  resetTimer() {
    this.timer.remove();
  }
}
