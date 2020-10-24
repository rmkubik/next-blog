const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "md", "mdx"],
  webpack: (config, { isServer }) => {
    const supportedImageExtentsions = [".png", ".jpg", ".gif"];
    const postsDirName = "posts";
    const outputDirectory = path.join(__dirname, "public", "images");

    /**
     * Copy images from the posts directory into the next.js
     * public directory so they can be server statically.
     */
    config.plugins.push(
      new CleanWebpackPlugin({
        // dry: true,
        // verbose: true,
        cleanOnceBeforeBuildPatterns: [
          path.join(outputDirectory, postsDirName),
        ],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(
              __dirname,
              postsDirName,
              "**",
              `*[${supportedImageExtentsions.join("|")}]`
            ),
            to: outputDirectory,
          },
        ],
      })
    );

    return config;
  },
});
