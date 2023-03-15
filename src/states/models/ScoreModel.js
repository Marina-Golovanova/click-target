import { config } from "../../config";

class ScoreModel {
  constructor() {
    this.score = 0;
  }

  increaseScore(ms) {
    const scoreSettings = config.modelSettings.scoreTable.find(
      (it) => ms >= it.bounds[0] && ms <= it.bounds[1]
    );

    if (scoreSettings) {
      this.score += scoreSettings.score;
    }
  }

  reduceScore() {
    this.score -= 3;
  }
}

export const scoreModel = new ScoreModel();
