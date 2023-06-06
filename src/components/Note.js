import {
  autoUpdate,
  offset,
  shift,
  useFloating,
  arrow,
} from "@floating-ui/react-dom";
import { useEffect, useRef, useState } from "react";

const Note = ({ icon = "🤔", children }) => {
  const [showing, setShowing] = useState(false);
  const popOverRef = useRef(null);
  // eslint-disable-next-line unicorn/no-null
  const [arrowEl, setArrowEl] = useState(null);
  const { refs, floatingStyles, middlewareData } = useFloating({
    middleware: [
      offset(10),
      // flip(),
      shift({ padding: 8 }),
      arrow({
        element: arrowEl,
      }),
    ],
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    if (!showing) {
      return undefined;
    }

    const handler = (e) => {
      if (e.target !== popOverRef.current) {
        setShowing(false);
      }
    };

    const openEvent = new Event("note-open", { bubbles: true });

    popOverRef.current.dispatchEvent(openEvent);

    document.addEventListener("click", handler);
    document.addEventListener("note-open", handler);

    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("note-open", handler);
    };
  }, [showing]);

  const handleOpen = (e) => {
    if (!showing) {
      e.stopPropagation();
    }

    setShowing(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setShowing(false);
  };

  return (
    <>
      <span>
        <span
          className="opener"
          onClick={handleOpen}
          onKeyDown={handleOpen}
          ref={refs.setReference}
          role="button"
          tabIndex="0"
        >
          {icon}
        </span>
        {showing ? (
          <span
            className="content"
            ref={(element) => {
              popOverRef.current = element;
              refs.setFloating(element);
              // console.log(element);
            }}
            style={floatingStyles}
          >
            <span
              className="closer"
              onClick={handleClose}
              onKeyDown={handleClose}
              role="button"
              tabIndex="0"
            >{`❌`}</span>
            <span className="arrow" ref={setArrowEl} />
            {children}
          </span>
        ) : undefined}
      </span>
      <style jsx>{`
        span {
          position: relative;
          cursor: pointer;
          display: inline-block;
          font-size: 15px;
          text-shadow: 2px 2px 0 black;

          &.opener {
            font-family: emoji;
            position: relative;
            top: -0.4em;
            ${showing ? "filter: grayscale(90%);" : ""}
          }

          &.closer {
            float: right;
          }

          &.content {
            display: block;
            position: absolute;

            /* top: 29px;
            left: -10px; */

            top: 0;
            left: 0;

            padding: 12px;
            min-width: 250px;
            max-width: 400px;
            z-index: 1;

            cursor: auto;
            font-size: 18px;
            text-shadow: none;

            background-color: white;
            border: 2px solid black;
            box-shadow: black 4px 4px;

            & .arrow {
              border-bottom: 10px solid black;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              position: absolute;
              left: ${
                // eslint-disable-next-line unicorn/no-null
                middlewareData.arrow?.x !== null &&
                middlewareData.arrow?.x !== undefined
                  ? `${middlewareData.arrow.x}px`
                  : ""
              };
              top: ${
                // eslint-disable-next-line unicorn/no-null
                middlewareData.arrow?.y !== null &&
                middlewareData.arrow?.y !== undefined
                  ? `${middlewareData.arrow.y}px`
                  : "-12px"
              };
            }
          }
        }
      `}</style>
    </>
  );
};

export default Note;
