import Phaser from "phaser";
import { transformFullWidthElement } from "@helpers/transformFullWidthElement";
import { centerElement } from "@helpers/centerElement";

import { config } from "../../config";

export class Finish extends Phaser.Scene {
  constructor() {
    super("Finish");
  }

  init() {
    this.elements = {};
    this.texts = {};

    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  create(data) {
    this.score = data.score;

    this.addBackground();
    this.addTexts();
    this.setScoreText();

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
    config.finishSettings.texts.forEach((text) => {
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

  setScoreText() {
    this.texts.finishText.setText(
      `${this.texts.finishText.text} ${this.score}`
    );
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.width = width;
    this.height = height;

    transformFullWidthElement(this, this.elements.background);
    centerElement(this, this.elements.background);

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
