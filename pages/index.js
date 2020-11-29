import Section from "../src/components/Section";
import { getAllPosts } from "../src/services/posts";

const Image = ({ children, src = "", alt, slug, ...rest }) => {
  const relativeStartStripped = src.replace(/^.\//u, "");

  return (
    <>
      <div className="square-aspect-ratio">
        <div className="inner center">
          <img
            alt={alt}
            src={`/images/projects/${slug}/${relativeStartStripped}`}
            {...rest}
          />
          <div className="overlay" />
        </div>
      </div>
      <style jsx>{`
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          box-shadow: inset 0 0 16px #222;
        }

        .center {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .square-aspect-ratio {
          position: relative;

          &:before {
            display: block;
            content: "";
            width: 100%;
            padding-top: (1 / 1) * 100%;
          }

          > .inner {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      `}</style>
    </>
  );
};

const Project = ({ project }) => {
  const imageSrc =
    typeof project.frontmatter.thumbnail === "object"
      ? project.frontmatter.thumbnail.src
      : project.frontmatter.thumbnail;
  const bgColor = project.frontmatter.thumbnail.bgColor || "#d3e2eb";
  const titleColor = project.frontmatter.thumbnail.titleColor || "inherit";

  return (
    <>
      <li>
        <div className="logo">{project.frontmatter.title}</div>
        <div className="label">
          <Image
            alt={project.frontmatter.title}
            slug={project.slug}
            src={imageSrc}
          />
        </div>
      </li>
      <style jsx>{`
        li {
          padding: 1rem;
          background-color: #d3e2eb;
          border-radius: 6px;
          border-top-right-radius: 22px;

          border: 3px outset #738e9e;
          background-image: url("/images/french-stucco.png");

          box-shadow: 2px 2px 8px #222;

          &:hover {
            transition: ease-out 200ms;
            transition-property: all;
            transform: scale(1.1);
            cursor: pointer;
            box-shadow: 2px 2px 16px #222;
          }
        }

        .logo {
          height: 1.8rem;
          box-shadow: inset 0 0 14px #222;
          margin-bottom: 1rem;
          border-radius: 12px;

          border: 3px inset #738e9e;

          background-color: #eee;
          background-image: url("/images/white-brushed.png");

          text-align: center;
          color: #222;
          line-height: 1.8rem;
        }

        .label {
          margin-bottom: 1rem;
          margin: 0.3rem;

          border: 3px inset #738e9e;

          h3 {
            font-size: 1.3rem;
            margin: 0;
            margin-bottom: 1rem;
          }
        }
      `}</style>
      <style jsx>{`
        .label {
          background-color: ${bgColor};

          h3 {
            color: ${titleColor};
          }
        }
      `}</style>
    </>
  );
};

const Home = ({ projects }) => {
  return (
    <div className="main">
      <Section>
        <h1>{"Hi!"}</h1>
        <p>{"I make video games, usually with JavaScript."}</p>
      </Section>
      <Section>
        <h2>{"Some of my projects"}</h2>
        <ul>
          {projects.map((project, index) => (
            <Project key={index} project={project} />
          ))}
        </ul>
      </Section>
      <style jsx>{`
        .main {
          h1 {
            margin-bottom: 2rem;
          }

          & > :global(*:first-child) {
            margin-bottom: 2rem;

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
