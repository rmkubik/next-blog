import Link from "../src/components/Link";
import Section from "../src/components/Section";
import Footer from "../src/components/Footer";
import { getMdxSourceBySlugs } from "../src/services/posts";

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
      </Section>
      <div className="projects">
        {projects.map((project) => {
          const imageSrc =
            typeof project.frontmatter.thumbnail === "object"
              ? project.frontmatter.thumbnail.src
              : project.frontmatter.thumbnail;

          return (
            <Section key={project.frontmatter.title}>
              <Link hideDots to={`project/${project.slug}`}>
                <div className="row">
                  <div className="image-container">
                    <Image
                      alt={project.frontmatter.title}
                      slug={project.slug}
                      src={imageSrc}
                    />
                  </div>
                  <div>
                    <h3>{project.frontmatter.title}</h3>
                    <p>{project.summary}</p>
                  </div>
                </div>
              </Link>
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
              <p>{post.summary}</p>
              <Link
                to={`/blog/${post.slug}`}
              >{`Check out this ${post.readingTime}`}</Link>
            </Section>
          );
        })}
      </div>
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

        .projects {
          :global(section) {
            margin-bottom: 1rem;

            :global(.image-container) {
              height: fit-content;
              width: 300px;

              margin-right: 2rem;
            }
          }

          :global(.row) {
            display: flex;
            flex-direction: row;
            align-items: center;
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
  const featuredProjectSlugs = ["wildfire-swap", "twilioquest"];
  const projects = await getMdxSourceBySlugs("projects", featuredProjectSlugs);

  const featuredPostSlugs = [
    "wildfire-swap-inspiration",
    "js13k-2021-rocket-jockey",
    "most-influential-games",
  ];
  const posts = await getMdxSourceBySlugs("posts", featuredPostSlugs);

  return {
    props: {
      posts,
      projects,
    },
  };
};

export default Home;
