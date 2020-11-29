import Section from "../src/components/Section";
import { getAllPosts } from "../src/services/posts";

const Image = ({ children, src = "", alt, slug, ...rest }) => {
  const relativeStartStripped = src.replace(/^.\//u, "");

  return (
    <>
      <img
        alt={alt}
        src={`/images/projects/${slug}/${relativeStartStripped}`}
        {...rest}
      />
      <style jsx>{`
        img {
          max-width: 100%;
          margin-left: auto;
          margin-right: auto;
          display: block;
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
            <li key={index}>
              <h3>{project.frontmatter.title}</h3>
              <Image
                alt=""
                slug={project.slug}
                src={project.frontmatter.thumbnail}
              />
            </li>
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

          li {
            border: 2px solid black;
            border-radius: 4px;
            padding: 1rem;
            background-color: #d3e2eb;
          }

          h3 {
            font-size: 1.3rem;
            margin: 0;
            margin-bottom: 1rem;
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
