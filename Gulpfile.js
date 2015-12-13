var gulp = require('gulp');
// var browserify = require('gulp-browserify');
var watch = require('gulp-watch');
var shell = require('gulp-shell');

gulp.task('compile', shell.task([
  'node compile.js',
]));

gulp.task('default', ['compile'], function () {
    gulp.watch(['./src/**/*.js'], ['compile']);
});
