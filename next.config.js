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
    /**
     * Copy images from the posts directory into the next.js
     * public directory so they can be server statically.
     */

    const supportedImageExtentsions = [".png", ".jpg", ".gif"];
    const postsDirName = "posts";
    const outputDirectory = path.join(__dirname, "public", "images");

    config.plugins.push(
      // Clean out previously loaded images in case there are changes
      new CleanWebpackPlugin({
        // dry: true,
        // verbose: true,
        cleanOnceBeforeBuildPatterns: [
          path.join(outputDirectory, postsDirName),
        ],
      }),
      // Copy images from posts dir to public dir
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
