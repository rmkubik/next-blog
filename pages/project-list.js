import Footer from "../src/components/Footer";
import Section from "../src/components/Section";

const Projects = () => {
  return (
    <div className="main">
      <Section>
        <h1>{"A list of all my projects"}</h1>
        <p>
          {
            "I've made a lot of things over the years, and I want to keep track of them all."
          }
        </p>
        <ul>
          <li>{"Island Maker - February 2022"}</li>
          <li>{"Fruit Golf - January 2022"}</li>
          <li>{"Explore Your Area"}</li>
          <li>{"Making Magic"}</li>
          <li>{"Flood the Flames - April 2021"}</li>
          <li>{"Wildfire Swap - March 2021"}</li>
          <li>{"Status Code"}</li>
          <li>{"TwilioQuest"}</li>
          <li>{"Warships"}</li>
          <li>{"Make for the Waves"}</li>
          <li>{"Infinite Icons"}</li>
          <li>{"Hoisted v2"}</li>
          <li>{"Bombfinder RL"}</li>
          <li>{"Hexagonal Diplomacy"}</li>
          <li>{"Emoji Painter Codepen"}</li>
          <li>{"Ascii Night Sky Codepen"}</li>
          <li>{"Dungeon Generator Codepen"}</li>
          <li>{"Wave Function Collapse Generator Codepen"}</li>
          <li>{"The Kraken - MTG Boss Fight"}</li>
          <li>{"JavaScript Filter Quiz Codepen"}</li>
          <li>{"Robots vs. Aliens Twitter Bot"}</li>
          <li>{"JS13k Lost Entry"}</li>
          <li>{"Phaser Runner Lunch & Learn Presentation"}</li>
          <li>{"Devember 2017"}</li>
          <li>{"Advent of Code 2017"}</li>
          <li>{"7DRL Painter & Bugs"}</li>
          <li>{"Destructible"}</li>
          <li>{"TQ Retention Talk"}</li>
          <li>{"Wildfire Learning Talk for TQ Kickoff"}</li>
          <li>{"Shield OS Terminal"}</li>
          <li>{"Inventober 2020"}</li>
          <li>{"Advent of Code 2020"}</li>
          <li>{"Syntax.fm Sick Picks Aggregator"}</li>
          <li>{"Wandering Trails"}</li>
          <li>{"Bee Game"}</li>
          <li>{"Functional Game Utils"}</li>
          <li>{"Flappy Donut Phaser Workshop"}</li>
          <li>{"Deved Path RPG"}</li>
          <li>{"Donut.js Phaser Talk"}</li>
          <li>{"Social Media PIGSquad Talent Talk"}</li>
          <li>{"Make your own Tools PIGSquad Talent Talk"}</li>
          <li>{""}</li>
          <li>{"Knightly Love"}</li>
          <li>{"Shoé-mon"}</li>
          <li>{"Eclipse"}</li>
          <li>{"The Band You're Dealt"}</li>
          <li>{"The Jazzman"}</li>
          <li>{"Langanga"}</li>
          <li>{"Cake Defense Club"}</li>
          <li>{"Unstable"}</li>
          <li>{"A Social Network"}</li>
          <li>{"Grim Repair"}</li>
          <li>{"Get Hoisted"}</li>
          <li>{"Space Trash"}</li>
          <li>{"Round Table"}</li>
          <li>{"Emoji Tactics"}</li>
          <li>{"Feedback Nights"}</li>
          <li>{"r-k.io"}</li>
          <li>{"ryankubik.com in next.js"}</li>
          <li>{"ryankubik.com/blog in gatsby"}</li>
          <li>{"ryankubik.com in hyperapp"}</li>
          <li>{"ryankubik.com in PHP"}</li>
          <li>{"Wildfire"}</li>
          <li>{"Pico 8 Cowboy Game"}</li>
          <li>{"Trainsmission"}</li>
          <li>{"Lobsterbotomy"}</li>
          <li>{"Sweet & Spooky"}</li>
          <li>{"Diplomacy"}</li>
          <li>{"Pokemon Concentration"}</li>
          <li>{"Kenny.nl Pygame Platformer"}</li>
          <li>{"The Quest to Find All"}</li>
          <li>{"A* Pathfinding Demo"}</li>
          <li>{"Edit Every Damn Day Calendar"}</li>
          <li>{"Chunk Based Voxel Prototype"}</li>
          <li>{"LWJGL Tower Defense"}</li>
          <li>{"Unnamed Pirate Prototype"}</li>
        </ul>
      </Section>
      <Footer />
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
      `}</style>
    </div>
  );
};

export default Projects;
