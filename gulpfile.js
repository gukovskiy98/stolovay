const gulp = require('gulp'),
  babel = require('gulp-babel'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-terser'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  browserSync = require('browser-sync').create(),
  webp = require('gulp-webp'),
  webpHtml = require('gulp-webp-html'),
  webpCss = require('gulp-webpcss'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  fileInclude = require('gulp-file-include'),
  del = require('del'),
  plumber = require('gulp-plumber'),
  tinify = require('gulp-tinify'),
  rename = require('gulp-rename'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  streamify = require('gulp-streamify'),
  ghPages = require('gulp-gh-pages');

const path = {
  build: {
    html: "build/",
    css: "build/css/",
    js: "build/js/",
    img: "build/img/",
    fonts: "build/fonts/",
  },
  src: {
    html: "src/*.html",
    css: "src/scss/style.scss",
    js: "src/js/main.js",
    img: "src/img/**/*.*",
    fonts: "src/fonts/**/*.*",
  },
  watch: {
    html: "src/**/*.html",
    css: "src/scss/**/*.scss",
    js: "src/js/**/*.js",
    img: "src/img/**/*.*",
    fonts: "src/fonts/**/*.*",
  },
  clean: "./build/",
  lightClean: [
    "./build/**/*.*",
    "!./build/img/**/*.*",
    "!./build/fonts/**/*.*",
  ],
};

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "./build/",
    },
    port: 9876,
    notify: false,
  });
}

function html() {
  return gulp
    .src(path.src.html)
    .pipe(fileInclude())
    .pipe(webpHtml())
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
}

function css() {
  return gulp
    .src(path.src.css)
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      prefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: false,
        grid: true,
      })
    )
    .pipe(
      webpCss({
        webpClass: ".webp",
        noWebpClass: ".no-webp",
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
}

function js() {
  return (
    browserify(path.src.js)
      .bundle()
      .pipe(source("main.js"))
      .pipe(plumber())
      .pipe(
        streamify(
          babel({
            presets: ["@babel/preset-env"],
          })
        )
      )
      .pipe(gulp.dest(path.build.js))
      .pipe(streamify(uglify()))
      .pipe(rename({ suffix: ".min" }))
      .pipe(gulp.dest(path.build.js))
      .pipe(browserSync.stream())
  );
}

function images() {
  return gulp
    .src(path.src.img)
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(gulp.dest(path.build.img))
    .pipe(gulp.src(path.src.img))
    .pipe(tinify("2LC9tnWf2sDVj2hHtD3TD5Ftt8xr39pH"))
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());
}

function fonts() {
  return gulp
    .src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(gulp.dest(path.build.fonts))
    .pipe(gulp.src(path.src.fonts))
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.build.fonts))
    .pipe(browserSync.stream());
}

function clean() {
  return del(path.clean);
}

function lightClean() {
  return del(path.lightClean);
}

function watchFiles() {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.css, css);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.img, images);
  gulp.watch(path.watch.fonts, fonts);
}

function deploy() {
  return gulp.src('./build/**/*').pipe(ghPages());
}

const start = gulp.parallel(
  gulp.series(clean, gulp.parallel(html, css, js, images, fonts)),
  watchFiles,
  browsersync
);

// quickStart - not refreshing images and fonts
const quickStart = gulp.parallel(
  gulp.series(lightClean, gulp.parallel(html, css, js)),
  watchFiles,
  browsersync
);

exports.html = html;
exports.clean = clean;
exports.lightClean = lightClean;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.start = start;
exports.quickStart = quickStart;
exports.default = start;
exports.deploy = deploy;