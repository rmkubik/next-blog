import Link from "../src/components/Link";
import Section from "../src/components/Section";
import Footer from "../src/components/Footer";
import { getMdxSourceBySlugs } from "../src/services/posts";
import createImage from "../src/components/Image";
import Icon from "../src/components/Icon";

const Home = ({ posts, projects }) => {
  return (
    <div className="main">
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a
        aria-hidden="true"
        href="https://mastodon.gamedev.place/@rmkubik"
        // eslint-disable-next-line react/no-invalid-html-attribute
        rel="me"
        tabIndex="-1"
      />
      <Section>
        <h1>{"Hi, I make games and websites"}</h1>
        <p>{"Usually with JavaScript and React."}</p>
        <p>
          {"Scroll down to see some of my games or check out my "}
          <Link hideDots to="/work">
            work history
          </Link>{" "}
          {" to see some websites."}
        </p>
      </Section>
      <div className="projects">
        {projects.map((project) => {
          const Image = createImage({
            imageDir: "projects",
            slug: project.slug,
          });

          return (
            <Section key={project.frontmatter.title}>
              <div>
                <h3>{project.frontmatter.title}</h3>
                <p>{project.frontmatter.description}</p>
                <Link to={`project/${project.slug}`}>{"More details"}</Link>
                <div className="image-container">
                  {project.frontmatter.images?.map((src) => (
                    <Image
                      alt={project.frontmatter.title}
                      key={src}
                      src={src}
                    />
                  ))}
                </div>
              </div>
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
            padding: 2rem;

            :global(.image-container) {
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-gap: 1rem;

              margin-top: 2rem;

              // screen size xs
              @media (max-width: 500px) {
                grid-template-columns: 1fr;
              }

              :global(img) {
                max-width: 100%;

                // For some reason, "height: 100%" wasn't
                // working in Safari. Replacing it with
                // min/max height 100% does work in both
                // Chrome and Safari... Eesh.
                max-height: 100%;
                min-height: 100%;
                object-fit: cover;
              }
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

          // screen size md
          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }

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
  const featuredProjectSlugs = ["island-maker", "wildfire-swap", "twilioquest"];
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
