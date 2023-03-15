import Phaser from "phaser";
import { transformFullWidthElement } from "@helpers/transformFullWidthElement";
import { centerElement } from "@helpers/centerElement";
import { LoadingBar } from "../preload-objects/LoadingBar";
import { scenes } from "../../constants";

import { config } from "../../config";

export class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  init() {
    this.elements = {};

    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  preload() {
    this.addBackground();
    this.preloadAssets();
    this.addLoadingBar();

    this.handleLoadProgress();

    this.scale.on("resize", this.resize, this);

    this.resize();
  }

  create() {
    this.scene.start(scenes.start);
  }

  preloadAssets() {
    console.log(config.gameResources);
    config.gameResources.forEach((res) => {
      this.load[res.type](res.key, res.url);
    });
  }

  addBackground() {
    this.elements.background = this.add.sprite(
      window.innerWidth / 2,
      window.innerHeight / 2,
      "background"
    );
  }

  addLoadingBar() {
    this.elements.loadingBar = new LoadingBar(
      this,
      config.preloaderSettings.loadingBar.style
    );
  }

  handleLoadProgress() {
    this.load.on("fileprogress", (_, value) => {
      this.progressValue = value;
      const loadingBarSettings = this.getLoadingBarSettings();
      this.elements.loadingBar.showProgressBar(loadingBarSettings);
    });
  }

  getLoadingBarSettings() {
    const { scaleX, scaleY } = config.preloaderSettings.loadingBar;

    return {
      x: this.width / 2 - (this.width * scaleX) / 2,
      y: this.height / 2 - (this.height * scaleY * this.progressValue) / 2,
      width: this.width * scaleX,
      height: this.height * scaleY * this.progressValue,
    };
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.width = width;
    this.height = height;

    transformFullWidthElement(this, this.elements.background);
    centerElement(this, this.elements.background);

    const loadingBarSettings = this.getLoadingBarSettings();
    this.elements.loadingBar.showProgressBar(loadingBarSettings);
  }
}
