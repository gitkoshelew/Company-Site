module.exports = {
  sourceMap: true,
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: ['>1%', 'last 10 versions', 'Firefox ESR'],
      flexbox: 'no-2009',
    },
    cssnano: {},
  },
};
