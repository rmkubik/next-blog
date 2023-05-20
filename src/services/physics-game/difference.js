const difference = (a, b) => {
  const x = a.x - b.x;
  const y = a.y - b.y;

  return {
    x,
    y,
  };
};

export default difference;
