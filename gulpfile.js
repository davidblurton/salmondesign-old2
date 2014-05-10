var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var path = require('path');
var tinylr = require('tiny-lr');
var WritableStream = require('stream').Writable;

var outputDir = 'content/themes/salmondesign/assets/dist';
var watching = false;

// Paths
var paths = {
  scripts: 'content/themes/salmondesign/assets/js/*.js',
  sass: 'content/themes/salmondesign/assets/sass/**/*.scss',
};

var devnull = function () {
  var stream = new WritableStream({
    objectMode: true
  });
  stream._write = function (chunk, encoding, callback) {
    callback();
  };
  return stream;
};

var liveReloadifWatching = function () {
  if (watching) {
    return livereload();
  } else {
    return devnull();
  }
};

// Compile Sass
gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(prefix(
      "last 1 version", "> 1%", "ie 8", "ie 7"
    ))
    .pipe(gulp.dest(outputDir + '/css'))
    .pipe(minifycss())
    .pipe(gulp.dest(outputDir + '/css'))
    .pipe(liveReloadifWatching());
});

// Uglify JS
gulp.task('uglify', function () {
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(uglify({
      outSourceMap: false
    }))
    .pipe(gulp.dest(outputDir + '/js'))
    .pipe(liveReloadifWatching());
});

// Watch files
gulp.task('watch', function (event) {
  gulp.watch(paths.sass, ['sass']);

  watching = true;
});

gulp.task('server', function () {      
  nodemon({
    script: 'server.js'
  });
});

gulp.task('build', ['sass', 'uglify']);
gulp.task('default', ['build', 'watch', 'server']);