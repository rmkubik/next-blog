const Seedling = ({ inline }) =>
  inline ? (
    <span aria-hidden role="img">
      {"🌱"}
    </span>
  ) : (
    <p>
      <span aria-hidden role="img">
        {"🌱"}
      </span>
      {" This page is just a seedling. It's a rough and unfinished thought. "}
      <span aria-hidden role="img">
        {"🌱"}
      </span>
    </p>
  );
const Growing = ({ inline }) =>
  inline ? (
    <span aria-hidden role="img">
      {"🌿"}
    </span>
  ) : (
    <p>
      <span aria-hidden role="img">
        {"🌿"}
      </span>
      {" This page is growing. It's becoming more structured and thought out. "}
      <span aria-hidden role="img">
        {"🌿"}
      </span>
    </p>
  );
const Mature = ({ inline }) =>
  inline ? (
    <span aria-hidden role="img">
      {"🌳"}
    </span>
  ) : (
    <p>
      <span aria-hidden role="img">
        {"🌳"}
      </span>
      {" This page is mature. It represents a polished thought or concept. "}
      <span aria-hidden role="img">
        {"🌳"}
      </span>
    </p>
  );

export { Seedling, Growing, Mature };
