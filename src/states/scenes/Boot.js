import Phaser from "phaser";
import { scenes } from "../../constants";

export class Boot extends Phaser.Scene {
  constructor(resources) {
    super("Boot");
    this.resources = resources;
  }

  preload() {
    this.resources.forEach((res) => {
      this.load.image(res.key, res.url);
    });
  }

  create() {
    this.scene.start(scenes.preload);
  }
}
