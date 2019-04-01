module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: ['>1%', 'last 4 versions', 'Firefox ESR'],
      flexbox: 'no-2009'
    },
    cssnano: {}
  }
};
