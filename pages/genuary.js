/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useState } from "react";
import { stripIndent } from "common-tags";

import Section from "../src/components/Section";
import { H2 } from "../src/components/headings";
import { pickRandomlyFromArray, randIntBetween } from "../src/services/utils";

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

const Day = ({ day, sketch, desc, sketchString, withP5 }) => {
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

    setP(new p5(withP5 ? sketch(p5) : sketch));
  }, [p5, sketch, withP5]);

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
      <Day
        day={6}
        desc="Lights on/off"
        sketch={(p) => {
          let isLit = false;

          p.setup = () => {
            const canvas = p.createCanvas(400, 400, p.WEBGL);

            canvas.parent("day-6-container");

            p.background(0);
            p.noLoop();
          };

          p.draw = () => {
            p.orbitControl();

            if (isLit === true) {
              p.lights();
            }

            p.box();
          };

          p.doubleClicked = () => {
            isLit = !isLit;
          };
        }}
        sketchString={`
          let isLit = false;

          p.setup = () => {
            const canvas = p.createCanvas(400, 400, p.WEBGL);

            canvas.parent("day-6-container");

            p.background(0);
            p.noLoop();
          };

          p.draw = () => {
            p.orbitControl();

            if (isLit === true) {
              p.lights();
            }

            p.box();
          };

          p.doubleClicked = () => {
            isLit = !isLit;
          };
        `}
      />
      <Day
        day={7}
        desc="Boolean algebra"
        sketch={(p) => {
          const circles = [];

          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-7-container");

            p.blendMode(p.MULTIPLY);
            p.noLoop();
          };

          p.draw = () => {
            circles.forEach(({ x, y, w, h, color }) => {
              switch (color) {
                case "red":
                  p.stroke("rgb(255,0,0)");
                  p.fill("rgba(255,0,0, 0.5)");

                  break;
                case "yellow":
                  p.stroke("rgb(255,255,0)");
                  p.fill("rgba(255,255,0, 0.5)");

                  break;
                case "blue":
                  p.stroke("rgb(0,0,255)");
                  p.fill("rgba(0,0,255, 0.5)");

                  break;
                default:
                  break;
              }

              p.ellipse(x, y, w, h);
            });
          };

          p.mouseClicked = () => {
            circles.push({
              color: pickRandomlyFromArray(["red", "yellow", "blue"]),
              h: 125,
              w: 125,
              x: p.mouseX,
              y: p.mouseY,
            });
          };
        }}
        sketchString={`
          const circles = [];

          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-7-container");

            p.blendMode(p.MULTIPLY);
            p.noLoop();
          };

          p.draw = () => {
            circles.forEach(({ x, y, w, h, color }) => {
              switch (color) {
                case "red":
                  p.stroke("rgb(255,0,0)");
                  p.fill("rgba(255,0,0, 0.5)");

                  break;
                case "yellow":
                  p.stroke("rgb(255,255,0)");
                  p.fill("rgba(255,255,0, 0.5)");

                  break;
                case "blue":
                  p.stroke("rgb(0,0,255)");
                  p.fill("rgba(0,0,255, 0.5)");

                  break;
                default:
                  break;
              }

              p.ellipse(x, y, w, h);
            });
          };

          p.mouseClicked = () => {
            circles.push({
              color: pickRandomlyFromArray(["red", "yellow", "blue"]),
              h: 125,
              w: 125,
              x: p.mouseX,
              y: p.mouseY,
            });
          };
        `}
      />
      <Day
        day={8}
        desc="A City"
        sketch={(p) => {
          let heights = [];

          const buildingCount = 100;
          const cityWidth = 10;
          const buildingWidth = 50;

          const randHeights = () => {
            heights = Array.from({ length: buildingCount })
              .fill(0)
              .map(() =>
                pickRandomlyFromArray([
                  50, 50, 50, 50, 50, 60, 60, 60, 70, 70, 100, 120, 180,
                ])
              );
          };

          randHeights();

          p.setup = () => {
            const canvas = p.createCanvas(400, 400, p.WEBGL);

            canvas.parent("day-8-container");

            p.background(0);

            const cam = p.createCamera();

            cam.setPosition(600, -800, 600);
            cam.lookAt(0, 0, 0);

            p.setCamera(cam);

            p.noLoop();
          };

          p.draw = () => {
            p.background(0);
            p.orbitControl();
            p.lights();

            heights.forEach((height, index) => {
              p.resetMatrix();

              const row = Math.floor(index % cityWidth);
              const col = Math.floor(index / cityWidth);

              // center city on 0,0
              p.translate(
                -(cityWidth / 2) * buildingWidth,
                0,
                -(cityWidth / 2) * buildingWidth
              );

              // position building
              p.translate(
                buildingWidth * col,
                -height / 2,
                buildingWidth * row
              );

              p.box(buildingWidth, height, buildingWidth);
            });
          };

          p.doubleClicked = () => {
            randHeights();
          };
        }}
        sketchString={`
        let heights = [];

          const buildingCount = 100;
          const cityWidth = 10;
          const buildingWidth = 50;

          const randHeights = () => {
            heights = Array.from({ length: buildingCount })
              .fill(0)
              .map(() =>
                pickRandomlyFromArray([
                  50, 50, 50, 50, 50, 60, 60, 60, 70, 70, 100, 120, 180,
                ])
              );
          };

          randHeights();

          p.setup = () => {
            const canvas = p.createCanvas(400, 400, p.WEBGL);

            canvas.parent("day-8-container");

            p.background(0);

            const cam = p.createCamera();

            cam.setPosition(600, -800, 600);
            cam.lookAt(0, 0, 0);

            p.setCamera(cam);

            p.noLoop();
          };

          p.draw = () => {
            p.background(0);
            p.orbitControl();
            p.lights();

            heights.forEach((height, index) => {
              p.resetMatrix();

              const row = Math.floor(index % cityWidth);
              const col = Math.floor(index / cityWidth);

              // center city on 0,0
              p.translate(
                -(cityWidth / 2) * buildingWidth,
                0,
                -(cityWidth / 2) * buildingWidth
              );

              // position building
              p.translate(
                buildingWidth * col,
                -height / 2,
                buildingWidth * row
              );

              p.box(buildingWidth, height, buildingWidth);
            });
          };

          p.doubleClicked = () => {
            randHeights();
          };
        `}
      />
      <Day
        day={9}
        desc="Crazy automaton. Cellular automata with crazy rules."
        sketch={(p) => {
          let cells = [];

          const cellCount = 100;
          const gridWidth = 10;
          const cellWidth = 40;

          const randCells = () => {
            cells = Array.from({ length: cellCount })
              .fill(0)
              .map(() =>
                pickRandomlyFromArray([
                  { color: "red" },
                  { color: "red" },
                  { color: "red" },
                  { color: "red" },
                  { color: "blue" },
                ])
              );
          };

          randCells();

          const update = () => {
            cells = cells.map((cell, index) => {
              let count = 0;

              for (let i = 0; i < 5; i++) {
                if (cells[randIntBetween(0, cellCount)]?.color === "blue") {
                  count += 1;
                }
              }

              if (count > 2) {
                return { color: "red" };
              }

              if (index % 13 === 0 && Math.random() > 0.5) {
                return { color: "blue" };
              }

              if (cells[index - gridWidth]?.color === "blue") {
                return { color: "blue" };
              }

              if (cells[index - gridWidth - 2]?.color === "blue") {
                return { color: "blue" };
              }

              return { color: "red" };
            });
          };

          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-9-container");

            p.background(0);

            p.noLoop();
          };

          p.doubleClicked = () => {
            randCells();
          };

          p.draw = () => {
            if (p.frameCount % 10 === 0) {
              update();
            }

            p.background(0);

            cells.forEach(({ color }, index) => {
              switch (color) {
                case "red":
                  p.stroke("rgb(255,0,0)");
                  p.fill("rgba(255,0,0, 0.5)");

                  break;
                case "blue":
                  p.stroke("rgb(0,0,255)");
                  p.fill("rgba(0,0,255, 0.5)");

                  break;
                default:
                  break;
              }

              const row = Math.floor(index % gridWidth);
              const col = Math.floor(index / gridWidth);

              p.rect(cellWidth * col, cellWidth * row, cellWidth, cellWidth);
            });
          };
        }}
        sketchString={`
          let cells = [];

          const cellCount = 100;
          const gridWidth = 10;
          const cellWidth = 40;

          const randCells = () => {
            cells = Array.from({ length: cellCount })
              .fill(0)
              .map(() =>
                pickRandomlyFromArray([
                  { color: "red" },
                  { color: "red" },
                  { color: "red" },
                  { color: "red" },
                  { color: "blue" },
                ])
              );
          };

          randCells();

          const update = () => {
            cells = cells.map((cell, index) => {
              let count = 0;

              for (let i = 0; i < 5; i++) {
                if (cells[randIntBetween(0, cellCount)]?.color === "blue") {
                  count += 1;
                }
              }

              if (count > 2) {
                return { color: "red" };
              }

              if (index % 13 === 0 && Math.random() > 0.5) {
                return { color: "blue" };
              }

              if (cells[index - gridWidth]?.color === "blue") {
                return { color: "blue" };
              }

              if (cells[index - gridWidth - 2]?.color === "blue") {
                return { color: "blue" };
              }

              return { color: "red" };
            });
          };

          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-9-container");

            p.background(0);

            p.noLoop();
          };

          p.doubleClicked = () => {
            randCells();
          };

          p.draw = () => {
            if (p.frameCount % 10 === 0) {
              update();
            }

            p.background(0);

            cells.forEach(({ color }, index) => {
              switch (color) {
                case "red":
                  p.stroke("rgb(255,0,0)");
                  p.fill("rgba(255,0,0, 0.5)");

                  break;
                case "blue":
                  p.stroke("rgb(0,0,255)");
                  p.fill("rgba(0,0,255, 0.5)");

                  break;
                default:
                  break;
              }

              const row = Math.floor(index % gridWidth);
              const col = Math.floor(index / gridWidth);

              p.rect(cellWidth * col, cellWidth * row, cellWidth, cellWidth);
            });
        `}
      />
      <Day
        day={10}
        desc="Polar coordinates"
        sketch={(p) => {
          let direction = 1;
          let r = 50;
          let theta = 0;

          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-10-container");

            canvas.mouseClicked(() => {
              direction *= -1;
            });

            p.background(0);
            p.noLoop();
            p.angleMode(p.DEGREES);
          };

          p.draw = () => {
            p.background(0);
            p.fill("black");
            p.stroke("white");
            p.strokeWeight(1);
            p.translate(p.width / 2, p.height / 2);
            p.circle(0, 0, r * 2);

            p.strokeWeight(8);
            const x = p.cos(theta) * r;
            const y = p.sin(theta) * r;

            theta = theta + 1 * Number(direction);
            r += 0.1 * direction;

            p.point(x, y);
            p.stroke(0);
            p.fill("white");
            p.text(`r: ${r.toFixed(2)}`, -20, -10);
            p.text(`Θ: ${theta}`, -20, 10);
          };
        }}
        sketchString={`
          let direction = 1;
          let r = 50;
          let theta = 0;

          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-10-container");

            canvas.mouseClicked(() => {
              direction *= -1;
            });

            p.background(0);
            p.noLoop();
            p.angleMode(p.DEGREES);
          };

          p.draw = () => {
            p.background(0);
            p.fill("black");
            p.stroke("white");
            p.strokeWeight(1);
            p.translate(p.width / 2, p.height / 2);
            p.circle(0, 0, r * 2);

            p.strokeWeight(8);
            const x = p.cos(theta) * r;
            const y = p.sin(theta) * r;

            theta = theta + 1 * Number(direction);
            r += 0.1 * direction;

            p.point(x, y);
            p.stroke(0);
            p.fill("white");
            p.text(\`r: \${r.toFixed(2)}\`, -20, -10);
            p.text(\`Θ: \${theta}\`, -20, 10);
          };
        `}
      />
      <Day
        day={11}
        desc="Quine. A computer program that outputs exactly its own source code. Unfortunately, my sites minifier kinda clobbers this one, but I don't feel like sorting that out for just this page!"
        // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
        sketch={function sketch11(p) {
          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-11-container");
            p.background(0);
            p.fill("white");
            p.noLoop();
          };

          p.draw = () => {
            p.text(sketch11.toString(), 20, 20);
          };
        }}
        sketchString={`
        function sketch11(p) {
          p.setup = () => {
            const canvas = p.createCanvas(400, 400);

            canvas.parent("day-11-container");
            p.background(0);
            p.fill("white");
            p.noLoop();
          };

          p.draw = () => {
            p.text(sketch11.toString(), 20, 20);
          };
        }
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
