const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const pkg = require('./package.json')
const data = require('./src/data.json')

const IS_PROD = process.env.NODE_ENV === 'production'
const BASE_PATH = IS_PROD ? 'https://www2.afrobananarepublic.com/true-music/' : '/'

const babelProdPlugins = [ 'transform-remove-console' ]

const globals = new webpack.DefinePlugin({
  'process.env.APP_VERSION': JSON.stringify(pkg.version),
  'process.env.BASE_PATH': JSON.stringify(BASE_PATH),
})

const config = {
  mode: IS_PROD ? 'production' : 'development',
  target: 'web',
  entry: {
    polyfill: 'babel-polyfill',
    app: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: BASE_PATH,
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
      base: BASE_PATH,
      cache: true,
      data,
      hash: true,
      minify: true,
      template: 'src/index.html',
      title: pkg.description,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets/images',
        to: 'assets/images'
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: IS_PROD ? babelProdPlugins : [],
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
              name: '[contenthash].[ext]',
              outputPath: 'assets/images'
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
