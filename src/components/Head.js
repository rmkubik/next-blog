import NextHead from "next/head";

const Head = ({
  currentUrl,
  description,
  previewImage,
  siteName,
  title,
  twitterHandle,
}) => {
  return (
    <NextHead>
      {title && <title>{title}</title>}
      <link href="/favicon.ico" rel="icon" />

      {/* Twitter specific tags */}
      <meta
        content={`@${twitterHandle}`}
        key="twsite"
        property="twitter:site"
      />
      <meta
        content={`@${twitterHandle}`}
        key="twhandle"
        property="twitter:creator"
      />
      <meta content="summary" key="twcard" property="twitter:card" />

      {/* Open graph tags */}
      <meta content={currentUrl} key="ogUrl" property="og:url" />
      <meta content={previewImage} key="ogimage" property="og:image" />
      <meta content={siteName} key="ogsitename" property="og:site_name" />
      <meta content={title} key="ogtitle" property="og:title" />
      <meta content={description} key="ogdesc" property="og:description" />
    </NextHead>
  );
};

export default Head;
