import Phaser from "phaser";
import { Boot } from "./states/scenes/Boot";
import { Preload } from "./states/scenes/Preload";
import { Start } from "./states/scenes/Start";
import { Game } from "./states/scenes/Game";
import { Finish } from "./states/scenes/Finish";

import { config as gameConfig } from "./config";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [new Boot(gameConfig.preloadResources), Preload, Start, Game, Finish],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

new Phaser.Game(config);
