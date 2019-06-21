exports.pages = function(env){
  const globSync = require("glob").sync;
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  return globSync("src/html/views/*.html").map(fileName => {

    const options = {
      template: fileName.replace("src/", ""),
      inject: true,
      hash: true,
      filename: fileName.replace("src/html/views/", "")
    };

    if (env === 'development') {
      options.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      };
    }

    return new HtmlWebpackPlugin(options);
  })
}

