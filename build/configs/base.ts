import { generatePath as path } from '../tools'
import { vendor, app } from '../entry'
import { ContextReplacementPlugin } from 'webpack'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin

const chunkOrder = [ 'vendor', 'app' ]

export const baseConfig = {
  context: path`${'app'}`,

  entry: { vendor, app },

  output: {
    path: path`${'dist'}`,
    publicPath: '/',
    filename: '[name].js',
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.styl', '.ogg']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript',
            query: {
              tsconfig: './tsconfig.webpack.json'
            },
          },
          'angular2-template',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html/,
        loader: 'html',
        exclude: /node_modules/,
      },
      {
        test: /\.svg/,
        loader: 'raw',
      },
      {
        test: /\.css$/,
        loaders: [
          'to-string',
          'css',
        ],
        exclude: /vendor|node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css',
        ],
        include: /vendor|node_modules/
      },
      {
        test: /\.ogg$/,
        loader: 'file',
      },
    ]
  },

  plugins: [
    // necessary due to https://github.com/angular/angular/issues/11580
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path`${'app'}`
    ),
    new ForkCheckerPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
      chunksSortMode: (chunk1, chunk2) => {
        const c1i = chunkOrder.indexOf(chunk1.names[0])
        const c2i = chunkOrder.indexOf(chunk2.names[0])

        if(c1i < c2i)
          return -1
        else if(c1i === c2i)
          return chunk1.id < chunk2.id ? -1 : 1
        else
          return 1
      }
    })
  ]
}
