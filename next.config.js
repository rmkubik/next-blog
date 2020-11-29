const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/u,
  options: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
});

const createCopyWebpackPattern = (
  dirName,
  supportedImageExtensions,
  outputDirectory
) => {
  return {
    from: path.join(
      __dirname,
      dirName,
      "**",
      `*[${supportedImageExtensions.join("|")}]`
    ),
    to: outputDirectory,
  };
};

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "md", "mdx"],
  webpack: (config) => {
    /**
     * Copy images from the posts directory into the next.js
     * public directory so they can be server statically.
     */

    const supportedImageExtensions = [".png", ".jpg", ".gif", ".svg"];
    const postsDirName = "posts";
    const projectsDirName = "projects";
    const outputDirectory = path.join(__dirname, "public", "images");

    config.plugins.push(
      // Clean out previously loaded images in case there are changes
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.join(outputDirectory, postsDirName),
          path.join(outputDirectory, projectsDirName),
        ],
      }),
      // Copy images from posts dir to public dir
      new CopyWebpackPlugin({
        patterns: [
          createCopyWebpackPattern(
            postsDirName,
            supportedImageExtensions,
            outputDirectory
          ),
          createCopyWebpackPattern(
            projectsDirName,
            supportedImageExtensions,
            outputDirectory
          ),
        ],
      })
    );

    return config;
  },
});
