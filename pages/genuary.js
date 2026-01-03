/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useState } from "react";
import { stripIndent } from "common-tags";

import Section from "../src/components/Section";

const PlayButton = ({ p }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = useCallback(() => {
    if (isPlaying) {
      p.noLoop();
      setIsPlaying(false);
    } else {
      p.loop();
      setIsPlaying(true);
    }
  }, [p, isPlaying]);

  return (
    <>
      <button onClick={toggle} type="button">
        {isPlaying ? "⏹️" : "▶️"}
      </button>
      <style jsx>{`
        button {
          padding: 0.5rem;
          background-color: white;
          border: 1px solid black;
          box-shadow: 2px 2px black;
          cursor: pointer;

          &:hover {
            transform: scale(1.05);
            box-shadow: 3px 3px black;
          }

          &:focus {
            transform: scale(1);
            box-shadow: 2px 2px black;
          }
        }
      `}</style>
    </>
  );
};

const Day = ({ day, sketch, desc, sketchString }) => {
  const [p5, setP5] = useState(undefined);
  const [p, setP] = useState(undefined);
  const [sketchText, setSketchText] = useState(undefined);

  useEffect(() => {
    const loadP5 = async () => {
      // eslint-disable-next-line unicorn/no-await-expression-member
      const p5module = (await import("p5")).default;

      setP5(() => p5module);
    };

    loadP5();
  }, []);

  useEffect(() => {
    // const firstLineBreakIndex = sketchString.indexOf("\n");
    // const firstLine = sketchString.slice(0, firstLineBreakIndex);
    // const remainingLines = sketchString.slice(firstLineBreakIndex);
    // const finalText = `${firstLine}\n  ${stripIndent(remainingLines)}`;
    const finalText = stripIndent(sketchString);

    setSketchText(finalText);
  }, [sketchString]);

  const id = `day-${day}`;

  useEffect(() => {
    if (!p5) return;

    setP(new p5(sketch));
  }, [p5, sketch]);

  return (
    <Section className="day">
      <h2>Day {day}</h2>
      <p className="desc">{desc}</p>
      <div className="container">
        <div>
          <div id={id} />
          <PlayButton p={p} />
        </div>
        <pre>{sketchText}</pre>
      </div>
    </Section>
  );
};

const Genuary = () => {
  return (
    <>
      <Section>
        <h1>Genuary 2026</h1>
        <p>
          <a href="https://genuary.art/">Genuary</a> is an annual event where
          you write little bits of code that generate little bits of graphics.
        </p>
      </Section>
      <Day
        day={1}
        desc="One color, one shape"
        sketch={(p) => {
          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-1");

            p.background(0);

            p.noLoop();
          };

          p.draw = () => {
            p.circle(p.mouseX, p.mouseY, 50);
          };
        }}
        sketchString={`
          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-1");

            p.background(0);

            p.noLoop();
          };

          p.draw = () => {
            p.circle(p.mouseX, p.mouseY, 50);
          };
        `}
      />
      <Day
        day={2}
        desc="Twelve principles of animation"
        sketch={(p) => {
          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-2");

            p.background(0);

            p.noLoop();
          };

          p.draw = () => {
            p.background(0);

            p.push();
            p.translate(p.mouseX, p.mouseY);
            p.scale(1, (400 - p.mouseY) / 200 + 0.2);
            p.circle(0, 0, 50);
            p.pop();
          };
        }}
        sketchString={`
          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-2");

            p.background(0);

            p.noLoop();
          };

          p.draw = () => {
            p.background(0);

            p.push();
            p.translate(p.mouseX, p.mouseY);
            p.scale(1, (400 - p.mouseY) / 200 + 0.2);
            p.circle(0, 0, 50);
            p.pop();
          };
        `}
      />
      <Day
        day={3}
        desc="Fibonacci forever"
        sketch={(p) => {
          let frame = 0;

          const fib = (n) => {
            if (n <= 0) {
              return 0;
            } else if (n === 1) {
              return 1;
            }

            return fib(n - 1) + fib(n - 2);
          };

          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-3");

            p.background(0);

            p.noLoop();
          };

          p.draw = () => {
            frame++;

            const val = frame / 16;

            p.rect(fib(val), fib(val), fib(val), fib(val));
          };
        }}
        sketchString={`
          let frame = 0;

          const fib = (n) => {
            if (n <= 0) {
              return 0;
            } else if (n === 1) {
              return 1;
            }

            return fib(n - 1) + fib(n - 2);
          };

          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-3");

            p.background(0);

            p.noLoop();
          };

          p.draw = () => {
            frame++;

            const val = frame / 16;

            p.rect(fib(val), fib(val), fib(val), fib(val));
          };
        `}
      />
      <style jsx>{`
        :global(section.day) {
          padding: 0.5rem;
        }
        :global(section) {
          margin-bottom: 1rem;

          :global(h2) {
            margin-bottom: 0.5rem;
          }

          :global(.desc) {
            margin-top: 0.5rem;
            margin-bottom: 1.4rem;
            font-style: italic;
          }

          :global(.container) {
            display: flex;
            flex-direction: row;
            gap: 1rem;

            :global(pre) {
              font-size: 0.9rem;
              border: 1px solid black;
              padding: 0.5rem;
              margin: 0;
              flex: 1;
              overflow: scroll;
            }
          }
        }
      `}</style>
    </>
  );
};

export default Genuary;
/* eslint-enable new-cap */
/* eslint-enable no-param-reassign */
