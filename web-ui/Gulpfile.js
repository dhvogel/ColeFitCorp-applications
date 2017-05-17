'use strict';

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    neat = require('node-neat').includePaths;

const paths = {
    scss: './sass/*.scss'
};

gulp.task('styles', function() {
    return gulp.src(paths.scss)
        .pipe(sass({
            includePaths: ['styles'].concat(neat)
        }))
        .pipe(gulp.dest('.src/public/styles'));
});

gulp.task('styles:watch', function () {
  gulp.watch('./sass/**/*.scss', ['styles']);
});

gulp.task('default', function(){
    gulp.start('styles');
});
