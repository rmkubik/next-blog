const createBall = async ({ app, engine }) => {
  const { Body, Bodies, Composite } = await import("matter-js");
  const PIXI = await import("pixi.js");

  const graphics = new PIXI.Graphics();

  graphics.pivot.set(0.5, 0.5);

  app.stage.addChild(graphics);

  const radius = 12;
  const ball = {
    body: Bodies.circle(20, 20, radius),
    graphics,
    radius,
  };

  Body.setInertia(ball.body, Number.POSITIVE_INFINITY);
  ball.body.collisionFilter.category = 0x0_01;
  ball.body.collisionFilter.mask = 0x1_11;

  ball.graphics.beginFill("#FF6961");
  ball.graphics.drawCircle(0, 0, ball.radius);
  ball.graphics.endFill();

  Composite.add(engine.world, [ball.body]);

  return ball;
};

export default createBall;
