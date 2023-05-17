import { pickRandomlyFromArray } from "../utils";

const createObstacles = async ({ container, spanClassName, engine, app }) => {
  const { Bodies, Composite } = await import("matter-js");
  const PIXI = await import("pixi.js");

  const containerBoundingRect = container.getBoundingClientRect();

  const obstacleElements = container.querySelectorAll(`.${spanClassName}`);
  const obstacles = [];

  for (const obstacleElement of obstacleElements) {
    const obstacleBoundingRect = obstacleElement.getBoundingClientRect();
    const body = Bodies.rectangle(
      obstacleBoundingRect.x -
        containerBoundingRect.x +
        obstacleBoundingRect.width / 2,
      obstacleBoundingRect.y -
        containerBoundingRect.y +
        obstacleBoundingRect.height / 2,
      obstacleBoundingRect.width,
      obstacleBoundingRect.height
      // { isStatic: true }
    );

    body.restitution = 0.8;
    body.collisionFilter.category = 0x0_10;
    body.collisionFilter.mask = 0x0_11;

    const graphics = new PIXI.Graphics();

    graphics.pivot.set(0.5, 0.5);

    graphics.beginFill(
      pickRandomlyFromArray([
        "#3c42c4",
        "#6e51c8",
        "#a065cd",
        "#ce79d2",
        "#d68fb8",
        "#dda2a3",
        "#eac4ae",
        "#f4dfbe",
      ])
    );

    graphics.alpha = 0.6;
    graphics.drawRect(
      -obstacleBoundingRect.width / 2,
      -obstacleBoundingRect.height / 2,
      obstacleBoundingRect.width,
      obstacleBoundingRect.height
    );
    graphics.endFill();

    app.stage.addChild(graphics);

    obstacleElement.style.display = "inline-block";
    obstacleElement.style.transformOrigin = "center";

    obstacles.push({
      body,
      element: obstacleElement,
      graphics,
      height: obstacleBoundingRect.height,
      startPos: {
        x:
          obstacleBoundingRect.x -
          containerBoundingRect.x +
          obstacleBoundingRect.width / 2,
        y:
          obstacleBoundingRect.y -
          containerBoundingRect.y +
          obstacleBoundingRect.height / 2,
      },
      width: obstacleBoundingRect.width,
    });
  }

  Composite.add(
    engine.world,
    obstacles.map((obstacle) => obstacle.body)
  );

  return obstacles;
};

export default createObstacles;
