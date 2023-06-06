const path = require("path");

// eslint-disable-next-line node/no-unpublished-require
const CopyWebpackPlugin = require("copy-webpack-plugin");
// eslint-disable-next-line node/no-unpublished-require
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

    const postsDirName = "posts";
    const projectsDirName = "projects";
    const publicDirectory = path.join(__dirname, "public");

    const supportedImageExtensions = [".png", ".jpg", ".gif", ".svg"];
    const imagesOutputDirectory = path.join(publicDirectory, "images");

    const supportedVideoExtensions = [".mp4"];
    const videosOutputDirectory = path.join(publicDirectory, "videos");

    config.plugins.push(
      // Clean out previously loaded images in case there are changes
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.join(imagesOutputDirectory, postsDirName),
          path.join(imagesOutputDirectory, projectsDirName),
          path.join(videosOutputDirectory, postsDirName),
          path.join(videosOutputDirectory, projectsDirName),
        ],
      }),
      // Copy images from posts dir to public dir
      new CopyWebpackPlugin({
        patterns: [
          createCopyWebpackPattern(
            postsDirName,
            supportedImageExtensions,
            imagesOutputDirectory
          ),
          createCopyWebpackPattern(
            projectsDirName,
            supportedImageExtensions,
            imagesOutputDirectory
          ),
          createCopyWebpackPattern(
            postsDirName,
            supportedVideoExtensions,
            videosOutputDirectory
          ),
          // createCopyWebpackPattern(
          //   projectsDirName,
          //   supportedVideoExtensions,
          //   videosOutputDirectory
          // ),
        ],
      })
    );

    return config;
  },
});
