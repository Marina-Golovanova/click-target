export class LoadingBar {
  constructor(scene, styleSettings) {
    this.scene = scene;

    this.style = styleSettings;

    this.progressBar = this.scene.add.graphics();
  }

  showProgressBar(settings) {
    this.progressBar
      .clear()
      .fillStyle(this.style.color, this.style.alpha)
      .fillRect(settings.x, settings.y, settings.width, settings.height);
  }
}
