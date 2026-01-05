/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useState } from "react";
import { stripIndent } from "common-tags";

import Section from "../src/components/Section";
import { H2 } from "../src/components/headings";

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

  const id = `day-${day}-container`;

  useEffect(() => {
    if (!p5) return;

    setP(new p5(sketch));
  }, [p5, sketch]);

  return (
    <Section className="day">
      <H2>Day {day}</H2>
      <p className="desc">{desc}</p>
      <div className="container">
        <div>
          <div className="canvas-container" id={id} />
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
        <p>
          These sketches were created with <a href="https://p5js.org/">p5.js</a>
          .
        </p>
      </Section>
      <Day
        day={1}
        desc="One color, one shape"
        sketch={(p) => {
          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-1-container");

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

            canvas.parent("day-1-container");

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

            canvas.parent("day-2-container");

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

            canvas.parent("day-2-container");

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

            canvas.parent("day-3-container");

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

            canvas.parent("day-3-container");

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
      <Day
        day={4}
        desc="Lowres"
        sketch={(p) => {
          let capture;

          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-4-container");

            p.background(0);

            p.noLoop();
            p.noSmooth();

            capture = p.createCapture(p.VIDEO);
            capture.size(50, 50);
            capture.hide();
          };

          p.draw = () => {
            p.scale(8);
            p.image(capture, 0, 0, 50, 50);
            p.filter(p.POSTERIZE);
          };
        }}
        sketchString={`
          let capture;

          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-4-container");

            p.background(0);

            p.noLoop();
            p.noSmooth();

            capture = p.createCapture(p.VIDEO);
            capture.size(50, 50);
            capture.hide();
          };

          p.draw = () => {
            p.scale(8);
            p.image(capture, 0, 0, 50, 50);
            p.filter(p.POSTERIZE);
          };
        `}
      />
      <Day
        day={5}
        desc="Write “Genuary”. Avoid using a font."
        sketch={(p) => {
          const frames = [
            () => p.ellipse(65, 325, 80, 80), // G
            () => p.ellipse(120, 270, 60, 60), // e
            () => p.ellipse(165, 225, 60, 60), // n
            () => p.ellipse(210, 180, 60, 60), // u
            () => p.ellipse(255, 135, 60, 60), // a
            () => p.ellipse(300, 90, 60, 60), // r
            () => p.ellipse(345, 45, 60, 60), // y
            // G
            () => {
              p.triangle(65, 325, 75, 275, 115, 315);
            },

            // e
            () => {
              p.translate(112, 262);
              p.rotate(-p.QUARTER_PI);
              p.ellipse(0, 0, 30, 15);
            },
            () => {
              p.triangle(123, 280, 143, 245, 153, 265);
            },

            // n
            () => {
              p.translate(165, 225);
              p.rotate(-p.QUARTER_PI);
              p.ellipse(0, 14, 36, 48);
            },
            () => {
              p.translate(165, 225);
              p.rotate(-p.QUARTER_PI);
              p.translate(0, -22);
              p.triangle(8, -15, -15, -20, -15, 12);
            },

            // u
            () => {
              p.translate(210, 180);
              p.rotate(-p.QUARTER_PI);
              p.ellipse(0, -14, 36, 48);
            },

            // a
            () => {
              p.translate(255, 135);
              p.rotate(-p.QUARTER_PI);
              p.ellipse(0, 0, 36, 36);
            },
            () => {
              p.translate(255, 135);
              p.rotate(-p.QUARTER_PI);
              p.translate(18, 12);
              p.triangle(0, 0, 10, 20, -10, 20);
            },

            // r
            () => {
              p.translate(300, 90);
              p.rotate(-p.QUARTER_PI);
              p.ellipse(8, 12, 42, 50);
            },
            () => {
              p.translate(300, 90);
              p.rotate(-p.QUARTER_PI);
              p.translate(-20, -50);
              p.triangle(0, 40, 10, 20, -10, 20);
            },

            // y
            () => {
              p.translate(345, 45);
              p.rotate(-p.QUARTER_PI);
              p.ellipse(0, -12, 40, 40);
            },
            () => {
              p.translate(345, 45);
              p.rotate(-p.QUARTER_PI);
              p.translate(-2, 16);
              p.triangle(0, 0, -30, -10, -30, 10);
            },
          ];

          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-5-container");

            p.background(0);
            p.noLoop();
          };

          p.draw = () => {
            frames[Math.floor(p.frameCount * 0.05)]?.();
          };
        }}
        sketchString={`
          const frames = [
            () => p.ellipse(65, 325, 80, 80), // G
            () => p.ellipse(120, 270, 60, 60), // e
            () => p.ellipse(165, 225, 60, 60), // n
            () => p.ellipse(210, 180, 60, 60), // u
            () => p.ellipse(255, 135, 60, 60), // a
            () => p.ellipse(300, 90, 60, 60), // r
            () => p.ellipse(345, 45, 60, 60), // y
            // G
            () => {
              p.triangle(65, 325, 75, 275, 115, 315);
            },

            // e
            () => {
              p.translate(112, 262);
              p.rotate(-p.QUARTER_PI);
              p.ellipse(0, 0, 30, 15);
            },
            () => {
              p.triangle(123, 280, 143, 245, 153, 265);
            },

            // n
            () => {
              p.translate(165, 225);
              p.rotate(-p.QUARTER_PI);
              p.ellipse(0, 14, 36, 48);
            },
            () => {
              p.translate(165, 225);
              p.rotate(-p.QUARTER_PI);
              p.translate(0, -22);
              p.triangle(8, -15, -15, -20, -15, 12);
            },

            // u
            () => {
              p.translate(210, 180);
              p.rotate(-p.QUARTER_PI);
              p.ellipse(0, -14, 36, 48);
            },

            // a
            () => {
              p.translate(255, 135);
              p.rotate(-p.QUARTER_PI);
              p.ellipse(0, 0, 36, 36);
            },
            () => {
              p.translate(255, 135);
              p.rotate(-p.QUARTER_PI);
              p.translate(18, 12);
              p.triangle(0, 0, 10, 20, -10, 20);
            },

            // r
            () => {
              p.translate(300, 90);
              p.rotate(-p.QUARTER_PI);
              p.ellipse(8, 12, 42, 50);
            },
            () => {
              p.translate(300, 90);
              p.rotate(-p.QUARTER_PI);
              p.translate(-20, -50);
              p.triangle(0, 40, 10, 20, -10, 20);
            },

            // y
            () => {
              p.translate(345, 45);
              p.rotate(-p.QUARTER_PI);
              p.ellipse(0, -12, 40, 40);
            },
            () => {
              p.translate(345, 45);
              p.rotate(-p.QUARTER_PI);
              p.translate(-2, 16);
              p.triangle(0, 0, -30, -10, -30, 10);
            },
          ];

          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-5-container");

            p.background(0);
            p.noLoop();
          };

          p.draw = () => {
            frames[Math.floor(p.frameCount * 0.05)]?.();
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

            @media (max-width: 750px) {
              flex-direction: column;
            }

            :global(.canvas-container) {
              max-width: 400px;
              max-height: 400px;

              margin-bottom: 0.5rem;
            }

            :global(canvas) {
              width: 100% !important;
              height: 100% !important;
            }

            :global(pre) {
              font-size: 0.9rem;
              border: 1px solid black;
              padding: 0.5rem;
              margin: 0;
              flex: 1;
              overflow: scroll;
              max-height: 600px;
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
