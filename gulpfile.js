//@ts-check
var gulp = require("gulp");
var webpack = require("webpack");
var path = require("path");
var fs = require("fs");
var DeepMerge = require("deep-merge");
var nodemon = require("nodemon");

var deepmerge = DeepMerge(function (target, source, key) {
  if (target instanceof Array) {
    return [].concat(target, source);
  }
  return source;
});

// generic

var defaultConfig = {
  module: {
    // loaders: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/
    //   },
    // ],
  },
};

if (process.env.NODE_ENV !== "production") {
  //defaultConfig.devtool = '#eval-source-map';
  defaultConfig.devtool = "source-map";
  // defaultConfig.debug = true;
}

function config(overrides) {
  return deepmerge(defaultConfig, overrides || {});
}

// backend

var nodeModules = fs.readdirSync("node_modules").filter(function (x) {
  return [".bin"].indexOf(x) === -1;
});

var backendConfig = config({
  entry: ["webpack/hot/signal.js", "./server.js"],
  target: "node",
  output: {
    path: path.join(__dirname, "build"),
    filename: "backend.js",
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  externals: [
    function (context, request, callback) {
      var pathStart = request.split("/")[0];
      if (
        nodeModules.indexOf(pathStart) >= 0 &&
        request != "webpack/hot/signal.js"
      ) {
        return callback(null, "commonjs " + request);
      }
      callback();
    },
  ],
  recordsPath: path.join(__dirname, "build/_records"),
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();'),
    new webpack.HotModuleReplacementPlugin({ quiet: true }),
  ],
});

// tasks

function onBuild(done) {
  return function (err, stats) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log(stats.toString());
    }

    if (done) {
      done();
    }
  };
}

gulp.task("backend-build", function (done) {
  webpack(backendConfig).run(onBuild(done));
});

gulp.task("backend-watch", function (done) {
  var firedDone = false;
  webpack(backendConfig).watch(100, function (err, stats) {
    if (!firedDone) {
      firedDone = true;
      done();
    }

    nodemon.restart();
  });
});

gulp.task("build", gulp.series("backend-build"));
gulp.task("watch", gulp.series("backend-watch"));

gulp.task(
  "run",
  gulp.series("backend-watch", function () {
    nodemon({
      execMap: {
        js: "node",
      },
      script: path.join(__dirname, "build/backend"),
      ignore: ["*"],
      watch: ["foo/"],
      ext: "noop",
    }).on("restart", function () {
      console.log("Patched!");
    });
  })
);
