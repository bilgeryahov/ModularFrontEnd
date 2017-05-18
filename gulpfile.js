'use strict';

const gulp  = require('gulp');
const sass  = require('gulp-sass');
const babel = require('gulp-babel');
const run_sequence = require('run-sequence');
const replace = require('gulp-replace');
const clean  = require('gulp-clean');

// Clean the folder.
gulp.task('clean_content', function(){

    return gulp.src('./deploy/', {read : false})
        .pipe(clean());
});

// Clean the scss files.
gulp.task('clean_scss', function(){

    return gulp.src('./deploy/**/*.scss', {read : false})
        .pipe(clean());
});

// Copy static files.
gulp.task('copy_content', function(){

    return gulp.src('./app/**')
        .pipe(gulp.dest('./deploy/'));
});

// Compile JS ES6 to JS ES5.
gulp.task('compile_javascript',  function(){

    return gulp.src('./deploy/Modules/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./deploy/Modules/'));
});

// Compile SCSS to CSS.
gulp.task('compile_css', function(){

    return gulp.src('./deploy/Modules/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./deploy/Modules/'));
});

// Deploy locally.
gulp.task('deploy_locally', function(){

    return run_sequence('clean_content', 'copy_content', 'compile_css', 'compile_javascript', 'clean_scss');
});