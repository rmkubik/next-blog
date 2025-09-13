import { Children, cloneElement, useEffect, useMemo, useState } from "react";

import Button from "./Button";
import IconButton from "./IconButton";

const EXPAND_DURATION = 250;

const Item = ({
  level,
  // We need hideAt to be used by Item's parent StretchText
  // This is pretty funky, but works well enough for a weird component
  // like this one.
  // eslint-disable-next-line no-unused-vars
  hideAt,
  instant,
  currentLevel,
  isExpanded,
  children,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const isChildrenString = typeof children === "string";

  useEffect(() => {
    if (isExpanded) {
      if (instant || level === 0 || !isChildrenString) {
        setExpandedIndex(children.length);

        return;
      }

      const interval = setInterval(() => {
        setExpandedIndex((index) => {
          if (index >= children.length) clearInterval(interval);

          return index + 1;
        });
      }, EXPAND_DURATION / children.length);
    } else {
      if (instant || level === 0 || !isChildrenString) {
        setExpandedIndex(0);

        return;
      }

      const interval = setInterval(() => {
        setExpandedIndex((index) => {
          if (index <= 0) {
            clearInterval(interval);

            return 0;
          }

          return index - 1;
        });
      }, EXPAND_DURATION / children.length);
    }
  }, [isExpanded, children, instant, level, isChildrenString]);

  return (
    <>
      <span
        className={`${isExpanded ? "expanded" : ""} ${
          currentLevel === level && level !== 0 ? "currentLevel" : ""
        }`}
      >
        {isChildrenString ? children.slice(0, expandedIndex) : children}
      </span>
      <style jsx>{`
        span {
          display: ${isChildrenString ? "inline" : "none"};
          opacity: 0;
          // Keep synced with EXPAND_DURATION
          transition: opacity 250ms;
        }

        .expanded {
          display: inline;
          opacity: 1;
        }

        .currentLevel {
          background-color: lemonchiffon;
        }
      `}</style>
    </>
  );
};

const StretchText = ({ level, children }) => {
  const [stretchLevel, setStretchLevel] = useState(level ?? 0);

  const maxLevel = useMemo(() => {
    let currentMaxLevel = 0;

    Children.forEach(children, (child) => {
      if (child.props.level > currentMaxLevel)
        currentMaxLevel = child.props.level;
    });

    return currentMaxLevel;
  }, [children]);

  const isAtMaxLevel = stretchLevel === maxLevel;
  const isAtMinLevel = stretchLevel === 0;

  const stretchedChildren = useMemo(
    () =>
      Children.map(children, (child) => {
        if (child.type !== Item)
          throw new Error(
            "StretchText children must use the StretchText.Item component."
          );

        return cloneElement(child, {
          ...child.props,
          currentLevel: stretchLevel,
          isExpanded:
            stretchLevel >= child.props.level &&
            (child.props.hideAt ? stretchLevel < child.props.hideAt : true),
        });
      }),
    [children, stretchLevel]
  );

  return (
    <>
      <div className="container">
        <div className="buttons">
          <IconButton
            disabled={isAtMinLevel}
            label="Fully shrink button"
            onClick={() => {
              if (isAtMinLevel) return;
              setStretchLevel(0);
            }}
            type="button"
          >
            {"⏮"}
          </IconButton>
          <Button
            className="shrink"
            disabled={isAtMinLevel}
            onClick={() => {
              if (isAtMinLevel) return;
              setStretchLevel(stretchLevel - 1);
            }}
            type="button"
          >
            ⮕shrink⬅
          </Button>
          <Button
            className="stretch"
            disabled={isAtMaxLevel}
            onClick={() => {
              if (isAtMaxLevel) return;
              setStretchLevel(stretchLevel + 1);
            }}
            type="button"
          >
            ⬅stretch⮕
          </Button>
          <IconButton
            disabled={isAtMaxLevel}
            label="Fully expand button"
            onClick={() => {
              if (isAtMaxLevel) return;
              setStretchLevel(maxLevel);
            }}
            type="button"
          >
            {"⏭"}
          </IconButton>
        </div>
        <div>{stretchedChildren}</div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .buttons {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          gap: 8px;

          :global(.shrink) {
            letter-spacing: -0.8px;
          }

          :global(.stretch) {
            letter-spacing: 1.65px;
          }
        }
      `}</style>
    </>
  );
};

StretchText.Item = Item;
export default StretchText;
