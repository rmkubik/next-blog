const onMouseDown =
  ({ Query, containerBoundingRect, ball, dragPosRef }) =>
  (e) => {
    e.preventDefault();

    const clickPos = {
      x: e.clientX - containerBoundingRect.x,
      y: e.clientY - containerBoundingRect.y,
    };

    // Did the player click on the ball?
    if (!Query.point([ball.body], clickPos).length) {
      return;
    }

    // eslint-disable-next-line no-param-reassign
    dragPosRef.current = {
      x: e.clientX - containerBoundingRect.x,
      y: e.clientY - containerBoundingRect.y,
    };

    document.body.style.cursor = "grabbing";
  };

export default onMouseDown;
