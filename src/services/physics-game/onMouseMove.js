const onMouseMove =
  ({ Query, containerBoundingRect, ball, dragPosRef }) =>
  (e) => {
    e.preventDefault();

    const clickPos = {
      x: e.clientX - containerBoundingRect.x,
      y: e.clientY - containerBoundingRect.y,
    };

    // eslint-disable-next-line unicorn/prefer-ternary
    if (Query.point([ball.body], clickPos).length) {
      document.body.style.cursor = "grab";
    } else {
      document.body.style.cursor = "inherit";
    }

    if (!dragPosRef.current) {
      return;
    }

    // eslint-disable-next-line no-param-reassign
    dragPosRef.current = {
      x: e.clientX - containerBoundingRect.x,
      y: e.clientY - containerBoundingRect.y,
    };
  };

export default onMouseMove;
