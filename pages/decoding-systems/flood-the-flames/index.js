import { useEffect, useState } from "react";
import randomSeed from "random-seed";
import {
  fillMatrix,
  constructArray,
  updateMatrix,
  getLocation,
  mapMatrix,
  getNeighbors,
  getCrossDirections,
} from "functional-game-utils";
import { pipe } from "ramda";

import Section from "../../../src/components/Section";
import Grid from "../../../src/components/systems/Grid";
import { randomString } from "../../../src/services/utils";

import metadata from "./metadata";

const SEED_LENGTH = 12;
const WIDTH = 9;
const HEIGHT = 11;

const floodTile = (location) => (tiles) => {
  const tile = getLocation(tiles, location);

  if (tile === "🌱") {
    const newTiles = updateMatrix(location, "🌊", tiles);

    return newTiles;
  }

  return tiles;
};

const spreadFlames = (tiles) => {
  return mapMatrix((tile, location) => {
    if (tile === "🌊") {
      return tile;
    }

    const neighborLocations = getNeighbors(getCrossDirections, tiles, location);
    const neighbors = neighborLocations.map(getLocation(tiles));

    return neighbors.some((neighbor) => neighbor === "🔥") ? "🔥" : tile;
  }, tiles);
};

const countPlants = (tiles) => {
  let total = 0;

  // misuse mapMatrix, there's not forEach or reduce yet
  mapMatrix((tile) => {
    if (tile === "🌱") {
      total += 1;
    }
  }, tiles);

  return total;
};

const generateInitialTiles = (seed) => {
  const height = HEIGHT;
  const width = WIDTH;

  const rand = randomSeed.create(seed);

  const initialEmptyTiles = fillMatrix(
    {
      height,
      width,
    },
    "🌱"
  );

  const startingFireLocations = constructArray(() => {
    return {
      col: rand.intBetween(0, width - 1),
      row: rand.intBetween(0, height - 1),
    };
  }, 3);

  const initialTiles = startingFireLocations.reduce(
    (currentTiles, location) => updateMatrix(location, "🔥", currentTiles),
    initialEmptyTiles
  );

  return initialTiles;
};

const FloodTheFlames = ({ initialSeed }) => {
  const [seed, setSeed] = useState(initialSeed);
  const [tiles, setTiles] = useState([["a"]]);

  useEffect(() => {
    const initialTiles = generateInitialTiles(seed);

    setTiles(initialTiles);
  }, [seed, setTiles]);

  return (
    <div className="main">
      <Section>
        <h1>{metadata.title}</h1>
        <p className="seed">
          <span>{"Seed: "}</span>
          <span>{seed}</span>
          <span className="button-bar">
            <button
              className="refresh"
              onClick={() => {
                const initialTiles = generateInitialTiles(seed);

                setTiles(initialTiles);
              }}
              type="button"
            >
              <span aria-label="regenerate seed" role="img">
                {"🔄"}
              </span>
            </button>
            <button
              className="new"
              onClick={() => {
                setSeed(randomString(SEED_LENGTH));
              }}
              type="button"
            >
              <span aria-label="regenerate seed" role="img">
                {"🆕"}
              </span>
            </button>
          </span>
        </p>
      </Section>
      <Section className="grid">
        <Grid
          onTileClick={(_, location) => {
            const newTiles = pipe(floodTile(location), spreadFlames)(tiles);

            setTiles(newTiles);
          }}
          tiles={tiles}
        />
        <p className="count">{countPlants(tiles)}</p>
      </Section>
      <style jsx>{`
        .main {
          h1 {
            margin-bottom: 2rem;
          }

          :global(> *) {
            margin-bottom: 2rem;
          }

          & > :global(*:first-child) {
            h1 {
              margin-bottom: 1rem;
            }

            p {
              margin-bottom: 0;
            }
          }
        }

        .button-bar {
          margin: 0 0.5rem;

          button {
            border: none;
            background: none;
            padding: 0;
            margin: 0;
            margin-right: 0.5rem;

            &:hover {
              cursor: pointer;
            }
          }
        }

        .refresh {
        }

        .seed {
          & > *:first-child {
            font-weight: bold;
          }

          & > *:nth-child(2) {
            font-family: "Courier New", Courier, monospace;
            font-size: 1.3rem;

            width: ${SEED_LENGTH}em;
          }
        }

        .count {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export const getStaticProps = () => {
  /*
   * Calculate seed here so that SSR has same value as
   * first load.
   */
  const initialSeed = randomString(SEED_LENGTH);

  return {
    props: {
      initialSeed,
    },
  };
};

export default FloodTheFlames;
