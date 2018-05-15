const gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  merge = require('utils-merge'),
  named = require('vinyl-named'),
  plumber = require('gulp-plumber'),
  webpack = require('webpack-stream');

let config = require('./webpack.config');

gulp.task('lint', function() {
  return gulp.src(['app/frontends/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('fix', function() {
  return gulp.src(['app/frontends/**/*.js'])
    .pipe(eslint({
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build', function() {
  return gulp.src(config.entrypoints)
    .pipe(named())
    .pipe(webpack(merge(config.webpack, {
      devtool: 'inline-source-map'
    })))
    .pipe(gulp.dest('app/assets/javascripts/'));
});

gulp.task('release', function() {
  return gulp.src(config.entrypoints)
    .pipe(named())
    .pipe(webpack(config.webpack))
    .pipe(gulp.dest('app/assets/javascripts/'));
});

gulp.task('watch', function() {
  return gulp.src(config.entrypoints)
    .pipe(named())
    .pipe(plumber())
    .pipe(webpack(merge(config.webpack, {
      devtool: 'inline-source-map',
      watch: true
    })))
    .pipe(gulp.dest('app/assets/javascripts/'));
});
