import gulp from "gulp";
import browserify from "browserify";
import tsify from "tsify";
import babelify from "babelify";
import watchify from "watchify";
import source from "vinyl-source-stream";

var lp = require("gulp-load-plugins")({
  lazy: true
});


gulp.task("vendor:fonts", () => {
  const src = ["node_modules/font-awesome/fonts/*"];
  const dest = "public/fonts";

  return gulp.src(src)
    .pipe(gulp.dest(dest));
});

gulp.task('build:css', () => {
  const componentScssSrc = [
    "!src/stylesheets/main.scss",
    "src/js/**/*.scss"
  ];

  const src = ["src/stylesheets/main.scss"];

  const dest = "public/css";

  var sass = lp.sass();

  var autoprefixer = lp.autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  });

  var injectComponents = lp.inject(gulp.src(componentScssSrc, {read: false}), {
    relative: true,
    starttag: '/* inject:imports */',
    endtag: '/* endinject */',
    transform: function (filePath) {
      return '@import "' + filePath + '";';
    }
  });

  return gulp.src(src)
    .pipe(lp.plumber())
    .pipe(injectComponents)
    .pipe(sass)
    .pipe(autoprefixer)
    .pipe(lp.cssnano())
    .pipe(gulp.dest(dest))
    .pipe(lp.livereload());
});


gulp.task("build:js", () => {

  const browserifyConfig = {
    // change this for production - sourcemaps will be produced when debug is enabled.
    debug: true,
    // extensions to process
    extensions: [".ts", ".tsx"],
    // path the the root tsx file
    entries: ["src/js/main.tsx"]
  };

  const babelifyConfig = {
    extensions: browserifyConfig.extensions
  };

  const bundleName = "bundle.js";
  const destination = "public/js";

  const b = browserify(browserifyConfig);

  b.plugin(tsify);
  b.transform(babelify.configure(babelifyConfig));

  return watchify(b)
    .bundle()
    .on('error', (error) => {
      console.error(error.toString())
    })
    .pipe(source(bundleName))
    .pipe(gulp.dest(destination))
    .pipe(lp.livereload());
});

gulp.task("html", () => {
  const src = "src/html/index.html";
  const dest = "public";

  return gulp.src(src).pipe(gulp.dest(dest));
});

gulp.task("default", ["vendor:fonts", "build:css", "build:js", "html"], () => {
  lp.livereload({
    start: true
  });

  gulp.watch(["src/html/**"], ["html"]);
  gulp.watch(["src/stylesheets/**/*.scss", "src/**/*.scss"], ["build:css"]);
  gulp.watch(["src/**/*.tsx", "src/**/*.ts", "src/**/*.js"], ["build:js"]);
});