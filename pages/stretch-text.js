import { stripIndents } from "common-tags";

import Link from "../src/components/Link";
import Section from "../src/components/Section";
import StretchText from "../src/components/StretchText";
import CodeBlock from "../src/components/CodeBlock";
import Note from "../src/components/Note";

const StretchTextPage = () => {
  return (
    <>
      <main>
        <Section>
          <h1>StretchText</h1>
          <p>
            I ran across the idea for{" "}
            <Link
              hideArrow
              hideDots
              to="https://en.wikipedia.org/wiki/StretchText"
            >
              StretchText
            </Link>{" "}
            from{" "}
            <Link
              hideArrow
              hideDots
              to="https://monoskop.org/images/4/4c/Wardrip-Fruin_Noah_Montfort_Nick_eds_The_New_Media_Reader.pdf"
            >
              The New Media Reader
            </Link>{" "}
            excerpt on{" "}
            <Link
              hideArrow
              hideDots
              to="https://en.wikipedia.org/wiki/Computer_Lib/Dream_Machines"
            >
              Computer Lib/Dream Machines
            </Link>{" "}
            by Ted Nelson.
          </p>
          <p>
            {
              'Ted\'s StretchText idea allows a reader to adjust the "depth" of a piece of writing. It would a reader to control how much information is on screen as a complement to scrolling.'
            }
          </p>
          <p>
            As you adjust the depth on a piece of text, or {'"stretch"'} it,
            more words appear in between the initial words to expand upon the
            ideas in the text.
          </p>
          <p>
            I thought it would be fun to try and craft a piece of StretchText.
            The header to my site seemed like an easy place to start.{" "}
            <Note icon="🙈">Please pardon the resume-esque writing!</Note>
          </p>
        </Section>
        <Section>
          <h1>{"Hi, I make games and websites"}</h1>
          <StretchText>
            <StretchText.Item level={4}>{"I'm u"}</StretchText.Item>
            <StretchText.Item hideAt={4} level={0}>
              U
            </StretchText.Item>
            <StretchText.Item level={0}>sually</StretchText.Item>
            <StretchText.Item level={4}>
              {" working on web apps with complex front ends professionally."}
            </StretchText.Item>
            <StretchText.Item level={5}>
              {
                " I've done this at large companies like Nike and Twilio as well as smaller startups."
              }
            </StretchText.Item>
            <StretchText.Item level={4}>
              {/* eslint-disable-next-line react/forbid-elements*/}
              <br />
              {/* eslint-disable-next-line react/forbid-elements*/}
              <br />
            </StretchText.Item>
            <StretchText.Item level={4}>
              {" I have over eight years experience"}
            </StretchText.Item>
            <StretchText.Item level={0}> with JavaScript</StretchText.Item>
            <StretchText.Item hideAt={3} instant level={1}>
              {" "}
            </StretchText.Item>
            <StretchText.Item level={3}>, but I reach f</StretchText.Item>
            <StretchText.Item level={1}>or TypeScript</StretchText.Item>
            <StretchText.Item level={3}>
              {" on new projects these days."}
            </StretchText.Item>
            <StretchText.Item level={3}>
              {
                " I've worked with a bunch of different front end tech like Next.js, Storybook, Electron, Phaser,"
              }
            </StretchText.Item>
            <StretchText.Item level={0}> and React</StretchText.Item>
            <StretchText.Item level={2}>.</StretchText.Item>
            <StretchText.Item level={5}>
              {/* eslint-disable-next-line react/forbid-elements*/}
              <br />
              {/* eslint-disable-next-line react/forbid-elements*/}
              <br />
            </StretchText.Item>
            <StretchText.Item level={2}>
              {" I also use Node.js for building full stack features"}
            </StretchText.Item>
            <StretchText.Item level={6}>
              {
                ". Features don't end where the user cannot see them and working across the stack is essential to deliver quality solutions"
              }
            </StretchText.Item>
            <StretchText.Item level={0}>.</StretchText.Item>
          </StretchText>
        </Section>
        <Section>
          <h2>{"Thoughts"}</h2>
          It turned out to be trickier than I imagined to author good
          StretchText! (And I {"don't"} think this is particularly good
          StretchText either.)
          <h3>{"Reader's"} controls</h3>
          <p>
            The controls for global depth {"don't"} really make sense in
            practice to me as a reader. I {"don't"} want to just broadly
            increase the depth of the entire section. I want to drill into
            specific topics I care about.
          </p>
          <p>
            {"It's"} especially hard to follow when words show up in different
            places in the section at once. This feels like a roller coaster
            ride. Where is new stuff going to pop up next?{" "}
            <Note>
              I guess this could be a positive for a certain kind of writing
              though! But it still feels more like a curated ride than the
              educational/empowering tool that Ted Nelson seemed to want
              StretchText to be.
            </Note>
          </p>
          <p>
            This sort of depth based stretching might make more sense if it only
            affected an area of text focused by the mouse for example. Then a
            reader would have more control over expanding only parts of the text
            that interested them.
          </p>
          <p>
            Stretching and shrinking text <em>is</em> really fun though. I
            wonder about a simpler version of this with just a single
            shrink/stretch level that you use per topic. It could be a fun way
            to create an outline.
          </p>
          <p>
            Some of the other stretch text related ideas{" "}
            <Link
              hideArrow
              hideDots
              to="https://billwadge.com/2022/02/24/stretchtext-or-bust-ted-nelsons-unrealized-vision/"
            >
              in this post
            </Link>{" "}
            seem interesting as well. They offer the reader a lot more control
            than a global depth gauge. Ideas like killing specific nodes or
            expanding others from a seed into a full idea.
          </p>
          <h3>Authoring the text</h3>
          <p>
            I found it really challenging to choose when to expand each section
            of text as an author.
          </p>
          <p>
            It makes sense that each depth level should expand on my background.
            So, I expanded a broad overview of various topics first. But, then I
            wanted to drill into each of those topics. So I added expansions to
            those sections in the next depth layers.
          </p>
          <p>
            So, now the expansion jumps back up and down the text and it feels
            hard to follow. I originally wrote several more short paragraphs
            that I cut because this already started to feel unwieldy.
          </p>
          <h3>Authoring ergonomics</h3>
          <p>
            I just wanted to focus on the user experience for this test. How
            does it feel to read StretchText? But I was surprised how confusing
            it was trying to keep this small amount of text making sense in my
            head.
          </p>
          <p>
            This is a snippet from the StretchText above. I used React
            components for this since my site is already React-based.
          </p>
          <CodeBlock className="language-jsx">
            {stripIndents`<StretchText.Item level={1}>or TypeScript</StretchText.Item>
            <StretchText.Item level={3}>
              {" "}on new projects these days.
            </StretchText.Item>
            <StretchText.Item level={3}>
              {" "}I've worked with a bunch of different front end tech like Next.js, Storybook, Electron, Phaser,
            </StretchText.Item>
            <StretchText.Item level={0}> and React</StretchText.Item>
            <StretchText.Item level={2}>.</StretchText.Item>`}
          </CodeBlock>
          <p>
            The <CodeBlock>level</CodeBlock> prop on each item controls at which
            level of depth the text will be shown. I authored the full text
            linearly in my notes and sliced it up into this structure.
          </p>
          <p>
            This is obviously a pretty confusing way to write. You cannot read
            the React components above and easily picture the output text at
            different levels. Or at least I could not!
          </p>
          <p>
            This article has some better{" "}
            <Link
              hideArrow
              hideDots
              to="https://billwadge.com/2022/02/24/stretchtext-or-bust-ted-nelsons-unrealized-vision/"
            >
              ideas about what authoring might look like
            </Link>
            , but I {"didn't"} want to implement for my mock up. I do think this
            would have been a lot easier to work with though.
          </p>
          <CodeBlock className="language-md">{`Kill text {and grow text} can make reading easier`}</CodeBlock>
          <p>
            I am still curious how it would feel with the nested blocks though.
            It felt really challenging to write many levels of nested content.
            Writing smaller thoughts that can be meaningfully expanded into
            longer thoughts without just adding fluff feels really tricky!
          </p>
          <h3>Extra jank</h3>
          <p>
            I also had to add some extra jank stuff if I wanted to make existing
            components of the text change. This <CodeBlock>hideAt</CodeBlock>{" "}
            prop got the job done, but was not very elegant to author with.
          </p>
          <CodeBlock className="language-jsx">{stripIndents`<StretchText.Item level={4}>I'm u</StretchText.Item>
            <StretchText.Item hideAt={4} level={0}>
              U
            </StretchText.Item>
            <StretchText.Item level={0}>sually</StretchText.Item>
            <StretchText.Item level={4}>
              {" "}working on web apps with complex front ends professionally.
            </StretchText.Item>`}</CodeBlock>
          <p>
            This is the ugly code needed to allow <strong>Usually</strong> to be
            lowercased to <strong>usually</strong> as the text stretches. So, at
            depth level `4` we hide the uppercase <strong>U</strong> and show
            the lowercase <strong>{"I'm u"}</strong> instead.
          </p>
          <p>
            I think you might just have to let go of this sort of thing if you
            were going to author a lot of StretchText. I wanted to expand one
            line of text into many paragraphs though, and there were many cases
            of this sort of sleight of hand.
          </p>
        </Section>
      </main>
      <style jsx>{`
        main {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
      `}</style>
    </>
  );
};

export default StretchTextPage;
