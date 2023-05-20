import difference from "./difference";
import scale from "./scale";

const onMouseUp =
  ({ Body, containerBoundingRect, ball, dragPosRef, dragPrompt }) =>
  (e) => {
    e.preventDefault();

    if (!dragPosRef.current) {
      return;
    }

    dragPrompt?.remove();

    // eslint-disable-next-line no-param-reassign
    dragPosRef.current = {
      x: e.clientX - containerBoundingRect.x,
      y: e.clientY - containerBoundingRect.y,
    };

    const diff = difference(ball.body.position, dragPosRef.current);

    Body.applyForce(
      ball.body,
      ball.body.position,
      // eslint-disable-next-line no-warning-comments
      scale(diff, 0.0001) // TODO: put a max speed here
    );

    // eslint-disable-next-line no-param-reassign
    dragPosRef.current = undefined;
    document.body.style.cursor = "inherit";
  };

export default onMouseUp;
