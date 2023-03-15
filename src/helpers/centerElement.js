export const centerElement = (game, el, onlyX, onlyY) => {
  if (onlyX) {
    el.x = game.width / 2;
    return;
  }

  if (onlyY) {
    el.y = game.height / 2;
    return;
  }

  el.x = game.width / 2;
  el.y = game.height / 2;
};
