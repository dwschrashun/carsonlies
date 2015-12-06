'use strict';

// All used modules.
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task("smush", function () {
	return gulp.src(['./js/app.js', './js/states/**/*.js', './js/directives/**/*.js', './js/factories/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js'));
});

gulp.task("default", ["smush"]);