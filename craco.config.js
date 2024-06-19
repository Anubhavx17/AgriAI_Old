const webpack = require("webpack");

module.exports = {
  webpack: {
    alias: {
      timers: "timers-browserify",
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
    ],
  },
};
