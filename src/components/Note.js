import { useEffect, useRef, useState } from "react";

const Note = ({ icon = "🤔", children }) => {
  const [showing, setShowing] = useState(false);
  const popOverRef = useRef();

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
          role="button"
          tabIndex="0"
        >
          {icon}
        </span>
        {showing ? (
          <span className="content" ref={popOverRef}>
            <span
              className="closer"
              onClick={handleClose}
              onKeyDown={handleClose}
              role="button"
              tabIndex="0"
            >{`❌`}</span>
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

            top: 29px;
            left: -10px;

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

            &::before {
              content: " ";
              border-bottom: 10px solid black;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              position: absolute;
              top: -12px;
            }
          }
        }
      `}</style>
    </>
  );
};

export default Note;
