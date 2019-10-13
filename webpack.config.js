const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const pkg = require('./package.json')
const data = require('./src/data.json')

const globals = new webpack.DefinePlugin({
  'APP_VERSION': JSON.stringify(pkg.version),
})

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'web',
  entry: {
    polyfill: 'babel-polyfill',
    app: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: path.join('dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true,
    port: 9000,
    writeToDisk: true,
  },
  plugins: [
    globals,
    new HtmlWebpackPlugin({
      title: pkg.description,
      data,
      template: 'src/index.html',
      hash: true,
      cache: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets/images',
        to: 'assets/images'
      },
      // {
      //   from: 'src/assets/fonts',
      //   to: 'assets/fonts'
      // }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,

        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              hmr: process.env.NODE_ENV === 'development',
            },
          },
         {
           // This loader resolves url() and @imports inside CSS
           loader: "css-loader",
         },
         {
           // Then we apply postCSS fixes like autoprefixer and minifying
           loader: "postcss-loader"
         },
         {
           // First we transform SASS to standard CSS
           loader: "sass-loader",
           options: {
             implementation: require("sass")
           }
         }
       ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[contenthash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts'
            }
          }
        ]
      },
    ]
  }
}

module.exports = config
