const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

let imageWebpackOptions = {
  optipng: {
    optimizationLevel: production ? 7 : 2,
  },
  mozjpeg: {
    quality: production ? 40 : 95,
  },
  pngquant: {
    quality: production ? "60-80" : 95,
    speed: production ? 4 : 10,
  },
};

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new ExtractTextPlugin('styles.css'),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(obj|glsl)$/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: imageWebpackOptions,
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['.js', '.json', '.css', '.glsl', '.ts', '.obj',],
  },
  devtool: production ? 'source-map' : 'inline-source-map',
};
