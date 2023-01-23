import React from "react";

const createVideo = ({ imageDir, slug }) => {
  const Video = ({ children, src, alt, ...rest }) => {
    const sourceFixedChildren = React.Children.map(children, (child) => {
      if (child.type === "source") {
        const relativeStartStripped = child.props.src.replace(/^.\//u, "");
        const newSrc = `/videos/${imageDir}/${slug}/${relativeStartStripped}`;

        return React.cloneElement(child, {
          ...child.props,
          src: newSrc,
        });
      }

      return child;
    });

    return (
      <>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video controls {...rest}>
          {sourceFixedChildren}
        </video>
        <style jsx>{`
          video {
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
            display: block;
          }
        `}</style>
      </>
    );
  };

  return Video;
};

export default createVideo;
