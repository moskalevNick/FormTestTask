const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
	entry: './src/index.tsx',

	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		port: 3001,
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},

			{
				test: /\.s(a|c)ss$/,
				exclude: /node_modules/,
				use: [
					production ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							sourceMap: !production,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: !production,
						},
					},
				],
			},

			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline',
			},
		],
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.scss'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html'),
			favicon: './public/favicon.ico',
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: production ? '[name].[contenthash].css' : '[name].css',
		}),
	],
	output: {
		filename: '[name].js',
		filename: production ? '[name].[contenthash].js' : '[name].js',
	},
	mode: production ? 'production' : 'development',
};
