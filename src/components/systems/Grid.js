import { mapMatrix, getDimensions } from "functional-game-utils";

// eslint-disable-next-line no-empty-function
const noop = () => {};

const Grid = ({ tiles, onTileClick = noop }) => {
  const { width, height } = getDimensions(tiles);

  return (
    <div className="grid">
      {mapMatrix(
        (tile, location) => (
          <button
            key={JSON.stringify(location)}
            onClick={() => onTileClick(tile, location)}
            type="button"
          >
            {tile}
          </button>
        ),
        tiles
      )}
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-rows: ${"2em ".repeat(height)};
          grid-template-columns: ${"3em ".repeat(width)};

          margin: 0 auto;
          width: fit-content;

          button {
            display: inline-block;
            text-align: center;

            border: none;
            background: none;

            &:hover {
              cursor: pointer;
              background: aliceblue;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Grid;
