const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const fileInclude = require("gulp-file-include");
const browserSync = require("browser-sync").create();

// Paths
const paths = {
  scss: "./scss/all.scss",
  css: "./css",
  js: "./js/*.js",
  html: "./html/*.html",
  dest: "./",          // Destination folder for processed HTML
};

// Compile SCSS
function compileSass() {
  return gulp
    .src(paths.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
}

// Process HTML with File Include
function processHtml() {
  return gulp
    .src(paths.html)
    .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
}

// Serve and Watch
function serve() {
  browserSync.init({
    server: paths.dest, // Serve from the "dist" directory
  });

  gulp.watch(paths.scss, compileSass); // Watch SCSS files
  gulp.watch(paths.html, processHtml); // Watch HTML files with partials
  gulp.watch(paths.js).on("change", browserSync.reload); // Reload JS
}

// Tasks
exports.sass = compileSass;
exports.html = processHtml;
exports.serve = gulp.series(gulp.parallel(compileSass, processHtml), serve);