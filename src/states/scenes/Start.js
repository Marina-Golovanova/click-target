import Phaser from "phaser";
import { scenes } from "../../constants";
import { transformFullWidthElement } from "@helpers/transformFullWidthElement";
import { centerElement } from "@helpers/centerElement";
import { transformElement } from "@helpers/transformElement";

import { config } from "../../config";

export class Start extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  init() {
    this.elements = {};
    this.texts = {};

    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  create() {
    this.addBackground();
    this.addTarget();
    this.addTexts();

    this.startTextAnimation();

    this.scale.on("resize", this.resize, this);
    this.resize();
  }

  addBackground() {
    this.elements.background = this.add.sprite(
      window.innerWidth / 2,
      window.innerHeight / 2,
      "background"
    );
  }

  addTexts() {
    config.startSettings.texts.forEach((text) => {
      const { origin = 0.5, align = "center", alpha = 1 } = text;
      this.texts[text.name] = this.add.text(
        this.width * text.x,
        this.height * text.y,
        text.text,
        text.textStyle
      );
      this.texts[text.name].setOrigin(origin);
      this.texts[text.name].setAlign(align);
      this.texts[text.name].setAlpha(alpha);

      this.texts[text.name].textData = {
        needAlignCenterX: text.needAlignCenterX,
        needAlignCenterY: text.needAlignCenterY,
        transform: text.transformText,
      };
    });
  }

  addTarget() {
    this.elements.target = this.add.sprite(
      this.width / 2,
      this.height / 2,
      "target"
    );

    this.elements.target.textData = {
      needAlignCenterX: config.startSettings.target.needAlignCenterX,
      needAlignCenterY: config.startSettings.target.needAlignCenterY,
    };

    this.setTargetTween();
  }

  setTargetTween() {
    this.elements.targetTween = this.tweens.add({
      targets: this.elements.target,
      displayWidth: this.elements.target.displayWidth * 1.2,
      displayHeight: this.elements.target.displayHeight * 1.2,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });
  }

  startTextAnimation() {
    this.tweens.add({
      targets: this.texts.explanationText,
      alpha: 1,
      duration: 1000,
      onComplete: () => {
        this.tweens.add({
          delay: 1000,
          targets: this.texts.tapText,
          alpha: 1,
          duration: 1000,
          callbackScope: this,
          onComplete: this.setStartEvents,
        });
      },
    });
  }

  setStartEvents() {
    this.input.on("pointerdown", () => {
      this.scene.start(scenes.game);
    });
  }

  resize() {
    if (!this.scene.isVisible(scenes.start)) {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    this.width = width;
    this.height = height;

    transformFullWidthElement(this, this.elements.background);
    centerElement(this, this.elements.background);

    this.elements.targetTween.stop();
    transformElement(this, this.elements.target, config.startSettings.target);
    centerElement(this, this.elements.target);
    this.setTargetTween();

    Object.keys(this.texts).forEach((name) => {
      if (this.texts[name].textData) {
        if (
          this.texts[name].textData.needAlignCenterX ||
          this.texts[name].textData.needAlignCenterY
        ) {
          centerElement(
            this,
            this.texts[name],
            this.texts[name].textData.needAlignCenterX,
            this.texts[name].textData.needAlignCenterY
          );
        }

        if (this.texts[name].textData.transform) {
          const currentTextSettings = this.texts[name].textData.transform.find(
            (set) => set.bounds[0] < width && (set.bounds[1] || width) >= width
          );
          this.texts[name].setText(currentTextSettings.text);
        }
      }
    });
  }
}
