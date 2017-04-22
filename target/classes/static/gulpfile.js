var gulp = require('gulp');
var concat = require('gulp-concat');
var scripts = require('./scripts');
var styles = require('./styles');

gulp.task('css', function(){
    gulp.src(styles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
    gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', function() {
    gulp.start(['css', 'js']);
    gulp.watch('./app/resource/css/**/*.css', ['css']);
    gulp.watch('./app/**/*.js', ['js']);
});
