import Phaser from "phaser";
import { transformFullWidthElement } from "@helpers/transformFullWidthElement";
import { centerElement } from "@helpers/centerElement";
import { Targets } from "../prefabs/Targets";
import { scoreModel } from "../models/ScoreModel";
import { scenes } from "../../constants";

import { config } from "../../config";

export class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.elements = {};
    this.texts = {};

    this.timeLeft = 3;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  create() {
    this.addBackground();

    this.targets = new Targets(this);
    this.startGame();
    this.addScore();
    this.addTimeLeftText();
    this.handleEvents();

    this.startTimeTick();

    this.scale.on("resize", this.resize, this);
    this.resize();
  }

  startGame() {
    this.targets.createTarget();
  }

  addBackground() {
    const background = this.add.sprite(
      window.innerWidth / 2,
      window.innerHeight / 2,
      "background"
    );

    background.setInteractive();
    this.add.existing(background);

    background.on("pointerdown", this.handleFail.bind(this));

    this.elements.background = background;
  }

  handleEvents() {
    this.events.on("click", (targetData) => {
      scoreModel.increaseScore(targetData.ms);
      this.texts.scoreText.setText(scoreModel.score);

      const msText = this.add.text(
        targetData.x,
        targetData.y,
        targetData.ms + "ms",
        config.gameSettings.msTextStyle
      );

      const timer = this.time.addEvent({
        delay: 1000,
        callback: () => {
          msText.destroy();
          timer.remove();
        },
        callbackScope: this,
      });
    });

    this.events.on("fail", this.handleFail.bind(this));
  }

  addScore() {
    const { x, y, scoreTextStyle } = config.modelSettings;
    this.texts.scoreText = this.add.text(
      x,
      y,
      scoreModel.score,
      scoreTextStyle
    );
  }

  addTimeLeftText() {
    const { x, y, textStyle } = config.gameSettings.timeLeft;
    this.texts.timeLeftText = this.add.text(
      x,
      y,
      this.timeLeft + " sec",
      textStyle
    );
  }

  handleFail() {
    const failSound = this.sound.add("fail");
    failSound.play();

    scoreModel.reduceScore();
    this.texts.scoreText.setText(scoreModel.score);
  }

  startTimeTick() {
    this.gameTimer = this.time.addEvent({
      delay: 1000,
      callback: this.handleGameTick,
      callbackScope: this,
      loop: true,
    });
  }

  handleGameTick() {
    this.timeLeft -= 1;
    if (this.timeLeft === -1) {
      this.targets.resetTimer();
      this.gameTimer.remove();
      this.targets.removeAllListeners();
      this.scene.start(scenes.finish, { score: scoreModel.score });
    } else {
      this.texts.timeLeftText.setText(this.timeLeft + " sec");
    }
  }

  resize() {
    if (!this.scene.isVisible(scenes.game)) {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.width = width;
    this.height = height;

    transformFullWidthElement(this, this.elements.background);
    centerElement(this, this.elements.background);
  }
}
