export const addSprite = (game, sprite, settings) => {
  const { x = 0, y = 0 } = settings;

  const element = game.add.sprite(x, y, sprite);

  return element;
};
