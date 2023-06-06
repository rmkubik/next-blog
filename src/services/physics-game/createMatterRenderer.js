const createMatterRenderer = async (engine, gameElement) => {
  const { Render } = await import("matter-js");

  const pixiCanvas = gameElement.querySelector("canvas");

  const render = Render.create({
    element: gameElement,
    engine,
    options: {
      background: "transparent",
      height: pixiCanvas.offsetHeight,
      width: pixiCanvas.offsetWidth,
      wireframeBackground: "transparent",
      wireframes: true, // Draw the shapes as solid colors
    },
  });

  Render.run(render);

  return render;
};

export default createMatterRenderer;
