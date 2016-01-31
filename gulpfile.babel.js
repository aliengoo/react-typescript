import gulp from "gulp";
import browserify from "browserify";
import tsify from "tsify";
import babelify from "babelify";
import watchify from "watchify";
import source from "vinyl-source-stream";

var l = require("gulp-load-plugins")({
  lazy: true
});

const config = {
  browserify: {
    debug: true,
    extensions: [".ts", ".tsx"],
    entries: ["src/main.tsx"]
  },
  js: {
    watch: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.js"],
    dest: "public/js"
  }
};


gulp.task("build:js", () => {
  const b = browserify(config.browserify);
  b.plugin(tsify);
  b.transform(babelify.configure({extensions: config.browserify.extensions}));
  return watchify(b)
    .bundle()
    .on('error', (error) => {
      console.error(error.toString())
    })
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(config.js.dest))
    .pipe(l.livereload());
});

gulp.task("default", ["build:js"], () => {
  l.livereload({
    start: true
  });

  gulp.watch(config.js.watch, ["build:js"]);
});