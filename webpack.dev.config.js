const path = require('path');
const dotenv = require('dotenv-webpack');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output:{
    path: path.join(__dirname,"public"),
    filename: "bundle.js",
    publicPath:'/',
  },

  module:{
    rules:[
      //regla para archivos js y jsx.
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader:"babel-loader",
      },
      //regla para cargar archivos css.
      {
        test: /\.css$/,
        use:["style-loader", "css-loader","postcss-loader"]
      },
      
      //regla para archivos svg
      {
        test:/\.svg?$/,
        use: ["@svgr/webpack","file-loader"],
      },
      //regla para archivos gif, png, jpeg,etc.
      {
        test: /\.(png|gif|jpe?g)$/i,
        use:[
          "file-loader",
          {loader: "image-webpack-loader",
          options:{
            bypassOnDebug:true,
            disable:true,
          },
        },
        ]
      },
    ]
  },
  resolve:{
    extensions:[".js",".jsx"],
  },
  performance:{
    hints: process.env.NODE_ENV === "production" ? "error":false,
    maxEntrypointSize: 580000,
    maxAssetSize:580000,
  },
  devServer: {
    proxy: {
      "/api": {
       target: "http://127.0.0.1:8080",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
    historyApiFallback: true,
    hot:true,
    static: path.resolve(__dirname, "public"),
  },
  plugins:[
    new dotenv()
  ]
};