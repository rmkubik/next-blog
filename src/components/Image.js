const createImage = ({ imageDir, slug }) => {
  const Image = ({ children, src, alt, ...rest }) => {
    const relativeStartStripped = src.replace(/^.\//u, "");

    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={alt}
          src={`/images/${imageDir}/${slug}/${relativeStartStripped}`}
          {...rest}
        />
        <style jsx>{`
          img {
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
            display: block;
          }
        `}</style>
      </>
    );
  };

  return Image;
};

export default createImage;
