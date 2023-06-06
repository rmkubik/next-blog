const attachGameView = (containerElement, app) => {
  const gameElement = document.createElement("div");

  gameElement.style.position = "absolute";
  gameElement.style.left = 0;
  gameElement.style.top = 0;
  gameElement.style.zIndex = -1;

  containerElement.append(gameElement);

  gameElement.append(app.view);

  /* eslint-disable no-param-reassign */
  app.view.style.position = "absolute";
  app.view.style.top = 0;
  app.view.style.left = 0;
  /* eslint-enable no-param-reassign */

  return gameElement;
};

export default attachGameView;
