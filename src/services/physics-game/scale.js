const scale = (vector, scalar) => {
  return {
    x: vector.x * scalar,
    y: vector.y * scalar,
  };
};

export default scale;
