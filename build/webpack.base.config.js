const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const СopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  public: path.join(__dirname, '../public'),
  assets: 'assets/'
}

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: `${PATHS.src}/index.js`,
  output: {
    path: PATHS.public,
    filename: `${PATHS.assets}js/[name].[hash].js`,
    publicPath: '/'
  },
  optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test: /node_modules/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.less$/,
        use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            {
             loader: 'css-loader',
             options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: { 
                sourceMap: true,
                config: {
                  path: './postcss.config.js'
                } 
              }
            },
            {
              loader: 'less-loader',
              options: { sourceMap: true }
            },
          ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
           name: '[name].[ext]'
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
           name: '[name].[ext]',
           outputPath: `${PATHS.assets}fonts`,
           publicPath: `${PATHS.assets}fonts`,
        }
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
	    filename: `${PATHS.assets}css/[name].[hash].css`
	  }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: './index.html'
    }),
    new СopyWebpackPlugin([
    {
      from: `${PATHS.src}/${PATHS.assets}img`,
      to: `${PATHS.assets}img`
    },{
      from: `${PATHS.src}/static`,
      to: `${PATHS.assets}static`
    },
    ])
  ],
}