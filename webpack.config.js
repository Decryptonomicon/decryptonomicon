module.exports = {
  context: __dirname,
  entry:  [
    "bootstrap-webpack!./src/bootstrap/bootstrap.config.jsconfig",
    "./src/css/app.less",
    "./src/app"
  ],
  output: {
    path: __dirname + '/decryptonomicon.github.io/assets/',
    filename: 'client-bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread', 'babel-plugin-rewire', 'babel-plugin-transform-object-assign'],
        },
      },
    ],
  },

  externals: { jquery: "jQuery" }
};
