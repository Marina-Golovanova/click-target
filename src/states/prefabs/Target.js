export class Target extends Phaser.GameObjects.Sprite {
  constructor(scene, data) {
    super(scene, data.x, data.y, "target");

    this.scene = scene;
    this.init();
  }

  static generateAttributes(scene) {
    const x = Phaser.Math.Between(100, scene.width - 100);
    const y = Phaser.Math.Between(100, scene.height - 100);
    return { x, y };
  }

  static generate(scene) {
    const targetAttributes = this.generateAttributes(scene);
    const target = new Target(scene, targetAttributes);
    target.setScale(0);

    return target;
  }

  init() {
    this.clicked = false;

    this.setInteractive(
      new Phaser.Geom.Circle(
        0 + this.width / 2,
        0 + this.height / 2,
        this.width / 2
      ),
      Phaser.Geom.Circle.Contains
    );
    this.scene.add.existing(this);

    this.on("pointerdown", () => {
      this.handleClick();
    });
  }

  handleClick() {
    if (this.clicked) {
      return;
    }

    const clickTargetSound = this.scene.sound.add("clickTarget");
    clickTargetSound.play();

    this.clicked = true;
    this.growTween.stop();

    const timer = this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.setAlive(false);
        timer.remove();
      },
      callbackScope: this,
    });

    const time = new Date() - this.timeStart;
    this.scene.events.emit("click", { ms: time, x: this.x, y: this.y });
  }

  grow() {
    this.growTween = this.scene.tweens.add({
      targets: this,
      scale: 1,
      duration: 2000,
      onStart: () => {
        this.timeStart = new Date();
      },
      onComplete: () => {
        this.setAlive(false);
        this.scene.events.emit("fail");
      },
    });
  }

  setAlive(status) {
    this.body.enable = status;
    this.setVisible(status);
    this.setActive(status);
  }

  reset() {
    this.clicked = false;
    const { x, y } = Target.generateAttributes(this.scene);
    this.x = x;
    this.y = y;
    this.setScale(0);
    this.setAlive(true);
    this.timeStart = new Date();
  }
}
