const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'js/scripts-main.js',
		publicPath: ''
	},
	module: {
		rules: [
			{ // тут описываются правила
				test: /\.js$/, // регулярное выражение, которое ищет все js файлы
				use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
				exclude: /node_modules/ // исключает папку node_modules
			},
			{
				test: /\.(woff|woff2|ttf|otf)$/i,
				use: [
				  {
					loader: 'file-loader',
					options: {
						name: 'fonts/geometria/[name].[ext]'
					}
				  }
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
				  {
					loader: 'file-loader',
					options: {
						name: 'images/[name].[ext]'
					}
				  },
					{
						loader: 'image-webpack-loader',
						options: {
						  bypassOnDebug: true, // webpack@1.x
						  disable: true, // webpack@2.x and newer
						}
					}
				]
			},
			{
				test: /\.css$/i,
				use: [
					(isDev ? 'style-loader' : {loader: MiniCssExtractPlugin.loader, options: {
							publicPath: '../' // path to director where assets folder is located
						}
					}),
					{
						loader: 'css-loader',
						options: { importLoaders: 1 }
					},
					'postcss-loader'
				] // к этим файлам нужно применить эти пакеты
			}
		]
	},
	plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles-main.css'
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/gi,
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
					preset: ['default'],
			},
			canPrint: true
	   }),
		new HtmlWebpackPlugin({
			inject: false, // стили НЕ нужно прописывать внутри тегов
			hash: true, // для страницы нужно считать хеш
			template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
			filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
		}),
		new HtmlWebpackPlugin({
			inject: false, // стили НЕ нужно прописывать внутри тегов
			hash: true, // для страницы нужно считать хеш
			template: './src/pages/listing.html', // откуда брать образец для сравнения с текущим видом проекта
			filename: 'listing.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
		}),
		new HtmlWebpackPlugin({
			inject: false, // стили НЕ нужно прописывать внутри тегов
			hash: true, // для страницы нужно считать хеш
			template: './src/pages/summary.html', // откуда брать образец для сравнения с текущим видом проекта
			filename: 'summary.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
		}),
		new HtmlWebpackPlugin({
			inject: false, // стили НЕ нужно прописывать внутри тегов
			hash: true, // для страницы нужно считать хеш
			template: './src/pages/vacancy.html', // откуда брать образец для сравнения с текущим видом проекта
			filename: 'vacancy.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
		}),
		new HtmlWebpackPlugin({
			inject: false, // стили НЕ нужно прописывать внутри тегов
			hash: true, // для страницы нужно считать хеш
			template: './src/pages/default.html', // откуда брать образец для сравнения с текущим видом проекта
			filename: 'default.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
		}),
		// new HtmlWebpackPlugin({
		// 	inject: false, // стили НЕ нужно прописывать внутри тегов
		// 	hash: true, // для страницы нужно считать хеш
		// 	template: './src/pages/organistation.html', // откуда брать образец для сравнения с текущим видом проекта
		// 	filename: 'organistation.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
		// }),
		new WebpackMd5Hash(),
		new webpack.DefinePlugin({
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	   })
    ]
}