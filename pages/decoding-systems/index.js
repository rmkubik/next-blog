import Link from "../../src/components/Link";
import Section from "../../src/components/Section";
import { getAllPageMetadata } from "../../src/services/posts";
import useSaveData from "../../src/services/systems/useSaveData";

const MAX_STARS = 3;

const countCurrentStars = (objects) => {
  return Object.values(objects).reduce((total, obj) => obj.stars + total, 0);
};

const countTotalStars = (objects) => {
  // Each object can get up to 3 stars
  return Object.values(objects).reduce((total) => total + 3, 0);
};

const Systems = ({ systems }) => {
  const { saveData, getSystem } = useSaveData();

  return (
    <div className="main">
      <Section>
        <h1>{"Decoding Systems"}</h1>
        <p>
          {
            "Interpret various systems of symbols. Figure out their rules and victory conditions."
          }
        </p>
      </Section>
      <Section>
        <p>{`${countCurrentStars(saveData.systems)} / ${countTotalStars(
          systems
        )} ⭐️`}</p>
      </Section>
      <div id="systems">
        {Object.entries(systems).map(([key, system]) => (
          <Section className="system-card" key={key}>
            {countCurrentStars(systems) >= (system.unlockCost || 0) ? (
              <>
                <h3>{system.title}</h3>
                <Link hideArrow hideDots to={`/decoding-systems/${system.key}`}>
                  <p className="system-icon">{system.icon}</p>
                </Link>
                <p>
                  {"⭐️".repeat(getSystem(system.key).stars) +
                    "◻️".repeat(MAX_STARS - getSystem(system.key).stars)}
                </p>
              </>
            ) : (
              <>
                <h3>{"???"}</h3>
                <p className="system-icon">{"🔒"}</p>
                <p>{`Unlock: ${system.unlockCost} ⭐️`}</p>
              </>
            )}
          </Section>
        ))}
      </div>
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

        #systems {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-gap: 1rem;

          :global(section) {
            padding: 1rem;
            text-align: center;
          }

          :global(a) {
            margin: 0;

            &:hover :global(.square-aspect-ratio) {
              transform: scale(1.05);
              transition: 200ms ease-out;
            }
          }

          :global(h3) {
            margin-top: 0;
          }

          :global(p) {
            margin-top: 1rem;
            margin-bottom: 0;
          }
        }

        .system-icon {
          font-size: 6rem;

          &:hover {
            cursor: pointer;
            transform: scale(1.05);
            transition: 200ms ease-out;
          }
        }

        :global(.system-card) {
          display: flex;
          flex-direction: column;

          & > *:nth-child(2) {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
};

export const getStaticProps = async () => {
  const systems = await getAllPageMetadata("decoding-systems");

  return {
    props: {
      systems,
    },
  };
};

export default Systems;
