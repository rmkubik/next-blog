import createImage from "../Image";

const SquareImage = ({ children, src = "", alt, slug, ...rest }) => {
  const Image = createImage({
    imageDir: "projects",
    slug,
  });

  return (
    <>
      <div className="square-aspect-ratio">
        <div className="inner center">
          <Image alt={alt} src={src} {...rest} />
          <div className="overlay" />
        </div>
      </div>
      <style jsx>{`
        :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          box-shadow: inset 0 0 16px #222;
        }

        .center {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .square-aspect-ratio {
          position: relative;

          &:before {
            display: block;
            content: "";
            width: 100%;
            padding-top: (1 / 1) * 100%;
          }

          > .inner {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default SquareImage;
