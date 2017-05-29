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

    // Make sure to take everything from the modules.
    // Make sure to take only the EcmaScript 6 files, without Vendor folder.
    const paths = [
        './deploy/Modules/**/*.js',
        './deploy/JS/*.js'
    ];

    return gulp.src(paths, {base: './'})
        .pipe(babel())
        .pipe(gulp.dest('./'));
});

// Compile SCSS to CSS.
gulp.task('compile_css', function(){

    // Make sure to take everything from the modules.
    // Make sure to take only the scss stylesheets, without Vendor folder.
    const paths = [
        './deploy/Modules/**/*.scss',
        './deploy/CSS/*.scss'
    ];

    return gulp.src(paths, {base: './'})
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./'));
});

// Deploy locally.
gulp.task('deploy_locally', function(){

    return run_sequence('clean_content', 'copy_content', 'compile_css', 'compile_javascript', 'clean_scss');
});