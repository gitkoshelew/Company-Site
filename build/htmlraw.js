exports.generateHtmlPlugins = function(env, folder = '') {
  const components = 'pages';
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const fs = require('fs');
  const path = require('path');
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

  var pages = [];

  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false
    });
  });

  return pages;
};
