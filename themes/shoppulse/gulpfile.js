'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var concat  = require('gulp-concat');


gulp.task('workflow', function () {
	var processors = [autoprefixer,cssnext,cssnano];

	gulp.src('./assets/sass/shoppulse.scss')
			.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(postcss(processors))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./assets/build/css'))

	gulp.src(['./assets/css/vendor/**/*.css','./assets/build/css/**/*.css'])
			.pipe(concat('shoppulse.css'))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./static/css/'));


});


gulp.task('default', function () {
	gulp.watch('./assets/sass/**/*.scss', ['workflow']);
});
