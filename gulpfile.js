const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

const browserSync = require('browser-sync');
// ====================
// html
// ====================
function minifyHtml() {
  return gulp
    .src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('./public'));
}
exports.minifyHtml = minifyHtml;

// ====================
//sass
// ====================

function compileSass() {
  return gulp
    .src('./src/sass/main.scss', { sourcemaps: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 5 version'))
    .pipe(cleanCss())
    .pipe(gulp.dest('./public/css', { sourcemaps: '.' }));
}
exports.compileSass = compileSass;

// ====================
// js
// ====================
function minifyJs() {
  return gulp
    .src('./src/js/*.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(gulp.dest('./public/js', { sourcemaps: '.' }));
}
exports.minifyJs = minifyJs;

// ====================
// image
// ====================

function minifyImg() {
  return gulp
    .src('./src/images/*.{png,jpg}')
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(gulp.dest('./public/images'));
}
exports.minifyImg = minifyImg;

// ====================
// webp
// ====================

function webpImg() {
  return gulp
    .src('./public/images/*.{png,jpg}')
    .pipe(webp())
    .pipe(gulp.dest('./public/images'));
}
exports.webpImg = webpImg;

// ====================
// video/webm copy
// ====================

function copyVideo(cb) {
  gulp.src('./src/images/*.{mp4,webm}').pipe(gulp.dest('./public/images'));
  cb();
}

exports.copyVideo = copyVideo;

// ====================
// run
// ====================
exports.run = gulp.series(
  minifyHtml,
  compileSass,
  minifyJs,
  minifyImg,
  webpImg,
  copyVideo
);

// =========================
// browserSync server task
// =========================
function server(cb) {
  browserSync.init({
    server: {
      baseDir: './public',
    },
  });
  cb();
}
exports.server = server;

// ====================
// browserSync reload task
// ====================
function reload(cb) {
  browserSync.reload();
  cb();
}
exports.reload = reload;
// ====================
// watch
// ====================

function watch() {
  gulp.watch('./src/*.html', gulp.series(minifyHtml, reload));
  gulp.watch(
    ['./src/sass/*.scss', './src/js/*.js'],
    gulp.series(compileSass, minifyJs, reload)
  );
  gulp.watch(
    './src/images/*.{png,jpg,mp4,webm}',
    gulp.series(minifyImg, webpImg, copyVideo)
  );
}
exports.watch = watch;

// ====================
// default
// ====================

exports.default = gulp.series(
  minifyHtml,
  compileSass,
  minifyJs,
  minifyImg,
  webpImg,
  copyVideo,
  server,
  watch
);
