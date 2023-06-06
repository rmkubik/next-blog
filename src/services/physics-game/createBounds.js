const createBounds = async (container, engine) => {
  const { Bodies, Composite } = await import("matter-js");

  const containerBoundingRect = container.getBoundingClientRect();

  const boundsThickness = 100;

  const bounds = [
    // top bound
    Bodies.rectangle(
      containerBoundingRect.width / 2,
      -boundsThickness / 2,
      containerBoundingRect.width + boundsThickness * 2,
      boundsThickness,
      { isStatic: true }
    ),
    // bottom bound
    Bodies.rectangle(
      containerBoundingRect.width / 2,
      containerBoundingRect.height + boundsThickness / 2,
      containerBoundingRect.width + boundsThickness * 2,
      boundsThickness,
      { isStatic: true }
    ),
    // right bound
    Bodies.rectangle(
      containerBoundingRect.width + boundsThickness / 2,
      containerBoundingRect.height / 2,
      boundsThickness,
      containerBoundingRect.height + boundsThickness * 2,
      { isStatic: true }
    ),
    // left bound
    Bodies.rectangle(
      -boundsThickness / 2,
      containerBoundingRect.height / 2,
      boundsThickness,
      containerBoundingRect.height + boundsThickness * 2,
      { isStatic: true }
    ),
  ];

  bounds.forEach((bound) => {
    // eslint-disable-next-line no-param-reassign
    bound.restitution = 0.8;
    // eslint-disable-next-line no-param-reassign
    bound.collisionFilter.category = 0x1_00;
    // eslint-disable-next-line no-param-reassign
    bound.collisionFilter.mask = 0x0_01;
  });

  Composite.add(engine.world, bounds);

  return bounds;
};

export default createBounds;
