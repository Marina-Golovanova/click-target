export const transformElement = (game, el, settings) => {
  const maxWidth = settings.maxWidth
    ? Math.min(game.width * settings.scale, settings.maxWidth)
    : game.width * settings.scale;

  const width = settings.minWidth
    ? Math.max(maxWidth, settings.minWidth)
    : maxWidth;

  el.displayWidth = width;
  el.displayHeight = (el.displayWidth * el.height) / el.width;
};
