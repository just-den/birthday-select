const path = require('path')
const isDevelopment = process.env.NODE_ENV === 'development'
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 


module.exports = {
  entry: {
    app: './src/birthday-select.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'birthday-select.min.js'
  },
  optimization: {
    minimize: true,
  },
   module:{
      rules:[
         { 
         	test: /\.js$/, 
         	exclude: /node_modules/, 
         	loader: "babel-loader" 
         }
      ]
   },
   plugins: [ 
      new CleanWebpackPlugin(),
   ],
    resolve: {        
      extensions: ['.js', '.json']     
    },
};