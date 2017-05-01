//- imports
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
/////////////////////////////////////////////////

//- build
module.exports = {
	entry: [
		"bootstrap-webpack!./bootstrap.config.js",
		"./app/app.js"
	],
	output: {
		path: './build',
		filename: 'build.js'
	},
	module: {
		loaders: [
			// vue
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot|ico)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
			},
      {
				test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      },
			{
				test: /\.html$/,
				loader: 'vue-html'
			}
		]
	},
	plugins: [
		// new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // }),
		// new webpack.optimize.UglifyJsPlugin({
		// 		compressor: {
		// 				warnings: false
		// 		},
		// 		mangle: true
		// }),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"windows.jQuery": "jquery"
		}),
		new ExtractTextPlugin("build.css")
	],
	resolve:{
		alias: {
			'vue$': 'vue/dist/vue.js',
			'background-check': 'background-check/background-check.min.js',
			'vue-material-css': 'vue-material/dist/vue-material.css'
  	}
	}
}
/////////////////////////////////////////////////
