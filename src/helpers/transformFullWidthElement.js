export const transformFullWidthElement = (game, el) => {
  if (game.width * (el.height / el.width) < game.height) {
    el.displayWidth = game.height * (el.width / el.height);
    el.displayHeight = game.height;
  } else {
    el.displayWidth = game.width;
    el.displayHeight = game.width * (el.height / el.width);
  }
};
