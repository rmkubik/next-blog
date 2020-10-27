const Seedling = ({ inline }) =>
  inline ? (
    <span>🌱</span>
  ) : (
    <p>
      <span>🌱</span> This page is just a seedling. It's a rough and unfinished
      thought. <span>🌱</span>
    </p>
  );
const Growing = ({ inline }) =>
  inline ? (
    <span>🌿</span>
  ) : (
    <p>
      <span>🌿</span> This page is growing. It's becoming more structured and
      thought out. <span>🌿</span>
    </p>
  );
const Mature = ({ inline }) =>
  inline ? (
    <span>🌳</span>
  ) : (
    <p>
      <span>🌳</span> This page is mature. It represents a polished thought or
      concept. <span>🌳</span>
    </p>
  );

export { Seedling, Growing, Mature };
