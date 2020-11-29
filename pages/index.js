import Section from "../src/components/Section";
import { getAllPosts } from "../src/services/posts";
import Cartridge from "../src/components/projects/Cartridge";

const Home = ({ projects }) => {
  return (
    <div className="main">
      <Section>
        <h1>{"Hi!"}</h1>
        <p>{"I make video games, usually with JavaScript."}</p>
      </Section>
      <Section>
        <h2>{"I make games"}</h2>
      </Section>
      <ul>
        {projects.map((project) => (
          <Cartridge key={project.slug} project={project} />
        ))}
      </ul>
      <Section>
        <h2>{"I write a bit too"}</h2>
      </Section>
      <ul className="writing">
        <li>
          <h3>
            {
              "Wildfire Swap: A puzzle game inspired by fires in the Pacific Northwest"
            }
          </h3>
          <p>
            {
              "Wildfire Swap is a puzzle game about swapping tiles to prevent fires from burning down people's homes. While showing Wildfire Swap to folks, I've gotten recurring questions about what inspired this game. This post dives into that inspiration story and looks at where Wildfire Swap came from. The I..."
            }
          </p>
        </li>
        <li>
          <h3>
            {
              "Wildfire Swap: A puzzle game inspired by fires in the Pacific Northwest"
            }
          </h3>
          <p>
            {
              "Wildfire Swap is a puzzle game about swapping tiles to prevent fires from burning down people's homes. While showing Wildfire Swap to folks, I've gotten recurring questions about what inspired this game. This post dives into that inspiration story and looks at where Wildfire Swap came from. The I..."
            }
          </p>
        </li>
        <li>
          <h3>
            {
              "Wildfire Swap: A puzzle game inspired by fires in the Pacific Northwest"
            }
          </h3>
          <p>
            {
              "Wildfire Swap is a puzzle game about swapping tiles to prevent fires from burning down people's homes. While showing Wildfire Swap to folks, I've gotten recurring questions about what inspired this game. This post dives into that inspiration story and looks at where Wildfire Swap came from. The I..."
            }
          </p>
        </li>
      </ul>
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
              margin: 0;
            }
          }
        }

        ul {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 1rem;

          padding: 0;
          list-style: none;
        }

        .writing {
          li {
            background-image: url("/images/groovepaper.png");
            padding: 1rem;
            box-shadow: 4px 4px 16px black;
            background-color: #d3e2eb;
            border: 2px solid black;

            h3 {
              margin-top: 0;
            }

            &:hover {
              transition: ease-out 200ms;
              transition-property: all;
              transform: scale(1.1);
              cursor: pointer;
              box-shadow: 2px 2px 16px #222;
            }
          }
        }
      `}</style>
    </div>
  );
};

export const getStaticProps = async () => {
  const projects = await getAllPosts("projects");

  return {
    props: {
      projects,
    },
  };
};

export default Home;
