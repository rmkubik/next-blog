/* eslint-disable react/no-unescaped-entities */

import Footer from "../src/components/Footer";
import Section from "../src/components/Section";
import Icon from "../src/components/Icon";
import Center from "../src/components/Center";
import NoSsrIslandMakerEmbed from "../src/components/projects/NoSsrIslandMakerEmbed";
import Grid from "../src/components/Grid";
import Link from "../src/components/Link";
import PlayButton from "../src/components/physics-game/PlayButton";
import spanifyReactChildren from "../src/services/physics-game/spanifyReactChildren";

const SpanifiedSection = spanifyReactChildren(Section, "obstacle");

const Projects = () => {
  return (
    <div className="main">
      <SpanifiedSection className="relative-section">
        <div className="header-with-button">
          <h1>I'm looking for work!</h1>
          <PlayButton />
        </div>
        <p>
          <strong>Hi! I'm Ryan. </strong>
          I've been a software engineer for seven years.
        </p>
        <p>
          I'm looking for senior+ roles where I am primarily doing{" "}
          <strong>front end web development.</strong>
        </p>
        <p>
          I relish iterating on{" "}
          <strong>rich interactive web applications </strong> with quick user
          feedback cycles.
        </p>
        <p>
          At Twilio, I led a cross-functional team shipping monthly educational
          technical content. I built features to support 30,000+ new developers’
          learning in response to feedback and analytics.
        </p>
        <p>
          At Nike, I worked on a highly tested, performant web app handling
          millions of visitors a month from all over the globe.
        </p>
      </SpanifiedSection>
      <Section className="work-overview">
        <h2>
          <Icon>{"🛠"}</Icon> Work Overview
        </h2>
        <p>
          I'm comfortable with front end web dev and game development. I
          frequently use React, JavaScript, TypeScript, Electron, Firebase, and
          Node.js.
        </p>
        <h3>Recent work experience</h3>
        <h4>
          <Icon>{"🧩"}</Icon> Andrews McMeel Universal
          <span>Dec. 2022 - Present</span>
        </h4>
        <p> Software Engineer & Designer | Part-Time Contract, Remote</p>
        <p>
          Designing and building a logic puzzle game for{" "}
          <a href="https://www.puzzlesociety.com/">The Puzzle Society</a> using
          React, mobx-state-tree, and TypeScript.
        </p>
        <p>
          <Icon>{"👇"}</Icon> <a href="#puzzle-society">Learn More</a>
        </p>
        <h4>
          <Icon>{"🛡"}</Icon> Twilio <span>Oct. 2022 - Feb. 2023</span>
        </h4>
        <p>Technical Lead | Full-Time, Remote</p>
        <p>
          Led cross-functional team creating educational role playing game,{" "}
          <a href="https://www.fastcompany.com/90687508/twilioquest-play-game-learn-to-code">
            TwilioQuest
          </a>
          , that taught people how to code.
        </p>
        <p style={{ fontStyle: "italic" }}>
          Staff Software Engineer | Full-Time, Remote{" "}
          <span
            style={{
              float: "right",
              fontStyle: "normal",
              fontWeight: "bold",
            }}
          >
            Jun. 2019 - Oct. 2022
          </span>
        </p>
        <p>
          Primary technical contributor to TwilioQuest. Built with React,
          Phaser, and Electron to ship to desktop. Also created numerous
          supporting services with front and backend tech.
        </p>
        <p>
          <Icon>{"👇"}</Icon> <a href="#twilioquest">Learn More</a>
        </p>
        <h4>
          <Icon>{"👟"}</Icon> Nike <span>Jan. 2018 - May 2019</span>
        </h4>
        <p>Software Engineer | Full Time, Portland, OR</p>
        <p>
          Built unified UX user lifecycle (login, registration, etc.) JavaScript
          library for all Nike digital properties. It handled millions of users
          a month in dozens of locales. We worked with teams across Nike's web
          and mobile applications to implement this library.
        </p>
        <p>
          <Icon>{"👇"}</Icon> <a href="#nike">Learn More</a>
        </p>
        <h3>Questions?</h3>
        <p>
          <Icon>{"👇"}</Icon> <a href="#contact">Reach out to me! Say hi!</a>
        </p>
        <p>
          <Icon>{"👀"}</Icon>{" "}
          <a href="https://linkedin.com/in/ryankubik">
            See more work history on LinkedIn
          </a>
        </p>
      </Section>
      <Section>
        <h2 id="puzzle-society">
          <Icon>{"🧩"}</Icon> The Puzzle Society{" "}
          <span>Dec. 2022 - Present</span>
        </h2>
        <p>
          The Puzzle Society is a logic and word puzzle site with games like:
          USA TODAY Crossword, WonderWord, Sudoku, Jumble, and more!
        </p>
        <h3>My work</h3>
        <p>
          I'm currently working on a part time contract for The Puzzle Society
          building and designing a new logic game. I'm working with{" "}
          <strong>React, mobx-state-tree, and TypeScript.</strong>
        </p>
        <p>
          This project is not yet released, so I cannot share more details at
          this time! But, hopefully it'll be live soon!
        </p>
        <p>
          <Icon>{"👀"}</Icon>{" "}
          <a href="https://www.puzzlesociety.com/">
            Learn more about The Puzzle Society
          </a>
        </p>
      </Section>
      <Section>
        <h2 id="twilioquest">
          <Icon>{"🛡"}</Icon> TwilioQuest <span>Jun. 2019 - Feb. 2023</span>
        </h2>
        <p>
          TwilioQuest was an educational video game designed to teach a new
          generation of developers how to change the world with code.
        </p>
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          height="315"
          src="https://www.youtube.com/embed/oNuB_GYqkR4"
          title="YouTube video player"
          width="560"
        />
        <h3>My work</h3>
        <p>
          I worked on TwilioQuest for almost 4 years. I was primarily building
          the TwilioQuest engine using{" "}
          <strong>React, JavaScript, and Electron.</strong> I also created
          supporting services and scripts using{" "}
          <strong>Node.js, Firebase, and GitHub Actions.</strong>
        </p>
        <p>
          Since it was a small team, I did all sorts of non development tasks
          too. From lesson planning educational content to helping new learners
          in Discord.
        </p>
        <h4>Architected Content Extension System</h4>
        <p>
          When I joined the team, content in TwilioQuest was siloed alongside
          core game logic. This made it challenging for anyone not a core
          developer to contribute educational content.
        </p>
        <p>
          I architected and implemented an extension system to separate content
          and <strong>open source</strong> it. This allowed for community
          authored extensions and 3rd party collaborations with companies like
          Cloudinary. We also got a lot of additional benefits from community
          contributions to our newly open sourced content.
        </p>
        <p>
          <a href="https://twilioquest.github.io/extension-docs/guide/architecture.html">
            Read more about the extension system's architecture.
          </a>
        </p>
        <h4>Technical Lead Promotion</h4>
        <p>
          I was promoted to tech lead by the time I left. I was responsible for
          coordinating content from myself, an artist, and content developer.
          Additionally, I managed a contractor developer team that supported our
          secondary services.
        </p>
        <h3>More info</h3>
        <p>
          Here's{" "}
          <a href="https://www.twilio.com/blog/new-art-new-tools-and-new-adventures-twilioquest-version-32-available-today">
            the announcement post
          </a>{" "}
          for where we totally overhauled TwilioQuest's graphics and implemented
          an open source authoring tool system for the community.
        </p>
        <p>
          Here's{" "}
          <a href="https://www.twilio.com/blog/twilioquest-content-authoring">
            a post I wrote post
          </a>{" "}
          highlighting cool extensions created by our community, a gallery to
          show off those extensions, and an extension created by a dev partner
          at Cloudinary.
        </p>
      </Section>
      <Section>
        <h2>
          <Icon>{"🔥"}</Icon> Wildfire Swap <span>Apr. 2018 - Mar. 2021</span>
        </h2>
        <p>
          Wildfire Swap is a self published puzzle game I made that received
          positive reception on Steam.
        </p>
        <Center>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Wildfire swap gameplay, showing a grid of trees and fires swapping around to avoid burning the houses down"
            src="/images/projects/wildfire-swap/wildfire-swap-gameplay-1.gif"
            style={{ maxWidth: "100%" }}
          />
        </Center>
        <p>
          Swap tiles, fight fires! Consider your moves carefully: fire spreads
          fast, and an out-of-control fire is unstoppable.
        </p>
        <h3>My Work</h3>
        <p>
          I built Wildfire Swap as a desktop app with{" "}
          <strong>JavaScript, React, Redux, Phaser, and Electron.</strong>
        </p>
        <p>
          I led the development, design, and prototyping of Wildfire Swap. I
          coordinated with my dev partner, Drew Gingerich, who did puzzle design
          and artwork for the game.
        </p>
        <h3>More info</h3>
        <p>
          <Icon>{"🔥"}</Icon>{" "}
          <a href="https://wildfire.fun/">Official homepage and presskit</a>
        </p>
        <p>
          <Icon>{"📖"}</Icon>{" "}
          <Link to="/blog/wildfire-swap-inspiration">
            Wildfire Swap: A puzzle game inspired by fires in the Pacific
            Northwest
          </Link>
          While showing Wildfire Swap to folks, I've gotten recurring questions
          about what inspired this game. This post dives into that inspiration
          story and looks at...
        </p>
        <p>
          <Icon>{"📖"}</Icon>{" "}
          <Link to="/blog/wildfire-swap-design-pillars">
            Using Design Pillars to Keep Wildfire Swap's Development on Track
          </Link>
          Design pillars are the 3-5 core ordered ideas, concepts, or emotions
          that our game should embody...
        </p>
        <Center>
          <iframe
            frameBorder="0"
            height="190"
            src="https://store.steampowered.com/widget/1216030/"
            style={{
              margin: "2rem 0",
            }}
            title="Steam Wildfire Swap embed"
            width="646"
          />
        </Center>
      </Section>
      <Section>
        <h2>
          <Icon>{"🏝"}</Icon> Island Maker <span>Feb. 2022 - Sep. 2022</span>
        </h2>
        <p>
          Island Maker is a strategy game I created in 2022 for a game jam. I
          shipped a few updates after the original launch. It got some YouTube
          coverage and over 25,000 plays.
        </p>
        <Center>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Screenshot of a randomly generate island map made of hexagon tiles"
            src="/images/projects/island-maker/first-build-screenshot.png"
            style={{ width: "90%" }}
          />
        </Center>
        <p>
          Build a thriving colony one building at a time. Click to place
          buildings in the right locations will generate new ones. Keep placing
          buildings until you run out. Your goal is to reach the highest
          population possible on your island.
        </p>
        <h3>My work</h3>
        <p>
          I used an asset pack for the graphics, but built and designed
          everything else in Island Maker with{" "}
          <strong>JavaScript and React.</strong>
        </p>
        <h3>More info</h3>
        <p>
          <Icon>{"📖"}</Icon>{" "}
          <a href="https://rmkubik.itch.io/island-maker/devlog/416186/working-on-a-big-update">
            Working on a big update!
          </a>
          I'm very happy with how the current version of Island Maker has turned
          out. It's been a treat to see y'all get into sharing high scores and
          completing the journal...
        </p>
        <p>
          <Icon>{"📖"}</Icon>{" "}
          <a href="https://rmkubik.itch.io/island-maker/devlog/429762/big-300-update-new-levels-and-buildings">
            Big 3.0.0 Update! New levels and buildings!
          </a>
          Over the past couple months, I've been working on this update to make
          Island Maker even better. I hope you enjoy the changes...
        </p>
        <p>
          <NoSsrIslandMakerEmbed />
        </p>
      </Section>
      <Section>
        <h2 id="nike">
          <Icon>{"👟"}</Icon> Nike <span>Jan. 2018 - May. 2019</span>
        </h2>
        <p>
          My team built a user lifecycle (login, registration, etc.) JavaScript
          library that was the gateway to all Nike digital applications.
        </p>
        <p>
          The library was translated and internationalized to meet the needs of
          people and regulators all across the world.
        </p>
        <h3>My work</h3>
        <p>
          I worked on various features in a complicated JavaScript application.
        </p>
        <p>
          I helped maintain a high test coverage with a robust unit and
          acceptance test suite.
        </p>
        <p>I wrote custom ESLint rules for our team's specific needs.</p>
        <p>
          I led a large code base migration using an Abstract Syntax Tree
          library JSCodeShift.
        </p>
        <p>
          I helped plan a transition from a custom JavaScript component library
          to React.
        </p>
        <h3>Mode info</h3>
        <p>
          <Icon>{"📖"}</Icon>{" "}
          <Link to="/blog/eslint-internal-state">
            Create a Custom ESLint Rule: Automatically Share Your Team's
            Institutional Knowledge
          </Link>
          Open-sourced rules allow teams to customize ESLint for their specific
          requirements. However, sometimes a rule doesn't exist or work in quite
          the right way for your use case. This article explores how to create
          custom ESLint rules for your team's unique situation...
        </p>
      </Section>
      <Section>
        <h2>Game jams & prototypes</h2>
        <p>
          I make a lot of little games in my free time, usually with JavaScript.
        </p>
        <Grid columns="2">
          {/* eslint-disable @next/next/no-img-element */}
          <img
            alt="A white grid with a blue background"
            src="https://img.itch.zone/aW1nLzExMjgxNjM0LnBuZw==/315x250%23c/r8lzRz.png"
            style={{
              margin: "0 auto",
              maxWidth: "100%",
            }}
          />
          <img
            alt="An ocean scene in pixel art with the title Grim Repair"
            src="https://img.itch.zone/aW1nLzI5NDcyODAucG5n/315x250%23c/DoD%2BkR.png"
            style={{
              margin: "0 auto",
              maxWidth: "100%",
            }}
          />
          <img
            alt="A wild west landscape with the title Trainsmission!"
            src="https://img.itch.zone/aW1hZ2UvMjE4NjA2LzEwMzE5NDAucG5n/315x250%23c/4jfBtF.png"
            style={{
              margin: "0 auto",
              maxWidth: "100%",
            }}
          />
          <img
            alt="A grid that looks a bit like classic Minesweeper, with new symbols"
            src="https://img.itch.zone/aW1nLzMwNzkxODAucG5n/315x250%23c/C8w21U.png"
            style={{
              margin: "0 auto",
              maxWidth: "100%",
            }}
          />
          {/* eslint-enable @next/next/no-img-element */}
        </Grid>
        <p>
          You can check them out on{" "}
          <a href="https://rmkubik.itch.io/">my Itch.io profile</a>.
        </p>
      </Section>
      <Section>
        <h2>Writing</h2>
        <p>
          I've been publishing post on various technical and non-technical
          topics on my personal blog for a few years. I've selected a few of
          them below.
        </p>
        <p>
          <Icon>{"📖"}</Icon> <Link to="/blog">Read more posts</Link>
        </p>
      </Section>
      <Section>
        <h2>JS13k 2021: Rocket Jockey Postmortem</h2>
        <p>
          The JS13k jam is one of my favorite game jams. The challenge is to
          make a game in JavaScript, in under 13kb over the course of a month. I
          really enjoy the explicit challenge of making something small in
          JavaScript. I love the language, and this jam challenges me to use
          lighter parts of the ecosystem...
        </p>
        <p>
          <Icon>{"👀"}</Icon>{" "}
          <Link to="/blog/js13k-2021-rocket-jockey">Read more</Link>
        </p>
      </Section>
      <Section>
        <h2>useKeyPress: Respond to user key presses in React</h2>
        <p>
          Dealing with keyboard events in React can be tricky to figure out at
          first. I had a project recently where I wanted to trigger some code in
          response to a user's key presses. I ended up responding to their
          events with a combination of useEffect and document.addEventListener
          in a useKeyPress custom hook...
        </p>
        <p>
          <Icon>{"👀"}</Icon> <Link to="/blog/use-key-press">Read more</Link>
        </p>
      </Section>
      <Section>
        <h2 id="contact">
          <Icon>{"💬"}</Icon>
          {" Get in touch with me"}
        </h2>
        <p>
          <Icon>{"🐣"}</Icon>{" "}
          <a href="https://twitter.com/ryrykubes">{"DM me on Twitter"}</a>
        </p>
        <p>
          <Icon>{"📧"}</Icon>{" "}
          <a href="mailto:rmkubik@me.com">{"rmkubik@me.com"}</a>
        </p>
        <p>
          <Icon>{"💬"}</Icon>{" "}
          <a href="https://www.linkedin.com/in/ryankubik/">
            {"Message me on LinkedIn"}
          </a>
        </p>
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

          h2 {
            span:last-child {
              float: right;
              font-size: 1.2rem;
            }
          }
        }

        :global(.work-overview) {
          h4 {
            margin-bottom: 0;

            span {
              float: right;
            }
          }

          h4 + p {
            font-style: italic;
            margin-top: 0.5rem;
          }
        }

        :global(.relative-section) {
          position: relative;
        }

        .header-with-button {
          display: flex;
          flex-direction: row;

          h1 {
            flex: 1;
          }

          :global(button) {
            margin-top: -1.5rem;
            margin-right: -3.5rem;

            width: fit-content;
            height: fit-content;

            // screen size xs
            @media (max-width: 500px) {
              margin-top: -0.5rem;
              margin-right: -1.5rem;
            }

            // screen size 2xs
            @media (max-width: 375px) {
              margin-top: -0.5rem;
              margin-right: -0.5rem;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;

/* eslint-enable react/no-unescaped-entities */
