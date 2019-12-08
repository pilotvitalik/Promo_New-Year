const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');
const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: []
})

module.exports = new Promise((resolve, reject) => {	
  resolve(buildWebpackConfig)
})