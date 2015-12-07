var browserify = require('browserify');
var gulp = require('gulp');
var source = require("vinyl-source-stream");
var reactify = require('reactify');
var livereload = require('gulp-livereload');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

gulp.task('browserify', function(){
  var b = browserify();
  b.transform(reactify); // use the reactify transform
  b.add('./js/app.js');
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('deploy', ['browserify'],function(){
	return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['browserify'], function(){
	gulp.watch('js/*.js', ["browserify"]);
	gulp.watch(['*.html','js/*.js','css/*.css'])	
});

gulp.task('default', function(){
	
});