var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsPlugin = require("stats-webpack-plugin");
var loadersByExtension = require("../config/loadersByExtension");
var port = 2992;

module.exports = function(options) {
  var entry;

  if (options.development) {
    entry = {
      resources: [
        'webpack-dev-server/client?http://0.0.0.0:' + port,
        'webpack/hot/only-dev-server',
        './client/index',
        './sass/style.scss'
      ]
    };
  } else {
    entry = {
      resources: [
        './client/index',
        './sass/style.scss'
      ]
    }
  }

  var loaders = {
    "js": {
      loaders: options.development ? ["react-hot", "babel-loader"] : ["babel-loader"],
      include: path.join(__dirname, "..", "client")
    },
    "ts|tsx": {
      loaders: ['react-hot', 'ts-loader']
    },
    "png|eot|svg|ttf|woff|woff2": {
      loaders: ["file-loader"]
    },
    "gif": {
      loaders: ["url-loader"],
      output: { "publicPath": "/" }
    },
    "scss": {
      loaders: ["style-loader", "css-loader", "sass-loader"]
    }
  };

  var stylesheetLoaders = {
    "css": 'css-loader'
  };

  var publicPath = options.development
    ? "http://localhost:" + port + "/_assets/"
    : "/_assets/";

  var plugins = [
    new webpack.PrefetchPlugin("react"),
    new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
    new StatsPlugin(path.join(__dirname, "..", "build", options.development ? "stats-dev.json" : "stats.json"), {
      chunkModules: true
    })
  ];

  Object.keys(stylesheetLoaders).forEach(function(ext) {
    var stylesheetLoader = stylesheetLoaders[ext];
    if(Array.isArray(stylesheetLoader)) stylesheetLoader = stylesheetLoader.join("!");
    if(options.separateStylesheet) {
      stylesheetLoaders[ext] = ExtractTextPlugin.extract("style-loader", stylesheetLoader);
    } else {
      stylesheetLoaders[ext] = "style-loader!" + stylesheetLoader;
    }
  });

  if(options.separateStylesheet) {
    plugins = plugins.concat([
      new ExtractTextPlugin("[name].css", {
        allChunks: true
      })
    ]);
  }

  if(options.minimize) {
    plugins = plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin()
    ]);
  }

  if(options.minimize) {
    plugins = plugins.concat([
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.NoErrorsPlugin()
    ]);
  }

  if (options.development) {
    plugins = plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __DEVELOPMENT__: true,
        __DEVPANEL__: options.devPanel
      })
    ]);
  } else {
    plugins = plugins.concat([new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      __DEVPANEL__: false
    })]);
  }

  return {
    entry: entry,
    output: {
      path: path.join(__dirname, "..", "build", options.development ? "development" : "public"),
      publicPath: publicPath,
      filename: options.development ? "[id].js" : "[name].js",
      chunkFilename: "[id].js",
      sourceMapFilename: "debugging/[file].map",
      pathinfo: options.debug
    },
    target: 'web',
    module: {
      loaders: loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders))
    },
    devtool: options.devtool,
    debug: options.debug,
    resolveLoader: {
      root: path.join(__dirname, '..', "node_modules")
    },
    resolve: {
      root: path.join(__dirname, "..", "app"),
      modulesDirectories: ['node_modules'],
      extensions: ["", ".web.js", ".js", ".jsx", ".ts", ".tsx", ".scss"]
    },
    plugins: plugins,
    devServer: {
      stats: {
        cached: false
      }
    }
  };
};
