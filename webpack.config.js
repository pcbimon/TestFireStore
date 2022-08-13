module.exports = {
  entry: {
    index: './src/index.js',
    register: './src/register.js',
    user: './src/user.js'
  },
  output: {
    filename: '[name].js',
    // eslint-disable-next-line n/no-path-concat
    path: `${__dirname}/dist`
  },
  experiments: {
    topLevelAwait: true
  }
}
