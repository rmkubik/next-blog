import NextHead from "next/head";

import useAnalytics from "../services/useAnalytics";

const Head = ({
  currentUrl,
  description,
  previewImage,
  siteName,
  title,
  twitterHandle,
}) => {
  useAnalytics();

  return (
    <NextHead>
      {title && <title>{title}</title>}
      <link href="/favicon.ico" rel="icon" />

      {/* Twitter specific tags */}
      {twitterHandle && (
        <meta
          content={`@${twitterHandle}`}
          key="twsite"
          property="twitter:site"
        />
      )}
      {twitterHandle && (
        <meta
          content={`@${twitterHandle}`}
          key="twhandle"
          property="twitter:creator"
        />
      )}
      <meta content="summary" key="twcard" property="twitter:card" />

      {/* Open graph tags */}
      {currentUrl && (
        <meta content={currentUrl} key="ogUrl" property="og:url" />
      )}
      {previewImage && (
        <meta content={previewImage} key="ogimage" property="og:image" />
      )}
      {siteName && (
        <meta content={siteName} key="ogsitename" property="og:site_name" />
      )}
      {title && <meta content={title} key="ogtitle" property="og:title" />}
      {description && (
        <meta content={description} key="ogdesc" property="og:description" />
      )}

      {/* Blog RSS feed*/}
      {currentUrl && currentUrl.includes("blog") && (
        <link
          href="https://ryankubik.com/blog/rss.xml"
          rel="alternate"
          title="Ryan Kubik's Blog RSS Feed"
          type="application/rss+xml"
        />
      )}

      <script
        async
        data-goatcounter="https://rmkubik.goatcounter.com/count"
        data-goatcounter-settings='{"allow_local": false}'
        src="//gc.zgo.at/count.js"
      />
    </NextHead>
  );
};

export default Head;
