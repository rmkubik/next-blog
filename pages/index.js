import Link from "../src/components/Link";
import Section from "../src/components/Section";
import Center from "../src/components/Center";
import { getAllPosts, getMdxSourceBySlug } from "../src/services/posts";

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

const Home = ({ posts, projects }) => {
  return (
    <div className="main">
      <Section>
        <h1>{"Hi, I make games"}</h1>
        <p>{"Usually with JavaScript."}</p>
        <p>
          {
            "Below are some of the better projects I've made by myself or in teams. A lot of them were made for game jams. A few of them are longer term personal or work projects."
          }
        </p>
      </Section>
      <div className="projects">
        {projects.map((project) => {
          const imageSrc =
            typeof project.frontmatter.thumbnail === "object"
              ? project.frontmatter.thumbnail.src
              : project.frontmatter.thumbnail;

          return (
            <Section key={project.frontmatter.title}>
              <h3>{project.frontmatter.title}</h3>
              <Image
                alt={project.frontmatter.title}
                slug={project.slug}
                src={imageSrc}
              />
            </Section>
          );
        })}
      </div>
      <Section>
        <h2>{"I write a bit too"}</h2>
        <p>
          {"Most of my writing is "}
          <Link hideDots to="/blog">
            {"posted on my blog"}
          </Link>
          {
            ". A lot of my posts are more informational pieces on specific topics or solutions to problems I've run into. Below are some of the more thought out and interesting posts."
          }
        </p>
      </Section>
      <div className="writing">
        {posts.map((post) => {
          return (
            <Section key={post.frontmatter.title}>
              <h3>{post.frontmatter.title}</h3>
              <Link
                to={`/blog/${post.slug}`}
              >{`Check out this ${post.readingTime}`}</Link>
            </Section>
          );
        })}
      </div>
      <Section>
        <Center>{"👋"}</Center>
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

        .projects {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 1rem;

          :global(section) {
            padding: 1rem;
            text-align: center;
          }
        }

        .writing {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;

          :global(section) {
            display: flex;
            flex-direction: column;
            padding: 2rem;

            :global(a) {
              margin-top: auto;
            }
          }
        }
      `}</style>
    </div>
  );
};

export const getStaticProps = async () => {
  const projects = await getAllPosts("projects");
  const featuredPostSlugs = [
    "wildfire-swap-inspiration",
    "deliberate-game-jamming",
    "wildfire-swap-design-pillars",
    "eslint-internal-state",
    "showcases-season-retrospective",
  ];
  const postPromises = featuredPostSlugs.map(async (slug) => {
    const { frontmatter, readingTime } = await getMdxSourceBySlug(
      "posts",
      slug,
      {}
    );

    return {
      frontmatter,
      readingTime,
      slug,
    };
  });
  const posts = await Promise.all(postPromises);

  return {
    props: {
      posts,
      projects,
    },
  };
};

export default Home;
