var gulp = require('gulp'),
    concat = require('gulp-concat');

var pipes = {};

pipes.orderScript = function () {
    return order(['jquery.js', 'angular.js']);
};

gulp.task('css', function(){
    gulp.src([
        "./app/resource/css/**/*.css",
        "./node_modules/bootstrap/dist/css/bootstrap.min.css",
        "./node_modules/select2/dist/css/select2.min.css"
    ])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
    gulp.src([
        "./node_modules/angular/angular.min.js",
        "./node_modules/angular-ui-router/release/angular-ui-router.min.js",
        "./node_modules/jquery/dist/jquery.min.js",
        "./node_modules/select2/dist/js/select2.min.js",
        "./node_modules/jquery.maskedinput/src/jquery.maskedinput.js",
        "./app/**/*.js"
    ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', function() {
    gulp.start(['css', 'js']);
    gulp.watch('./app/resource/css/**/*.css', ['css']);
    gulp.watch('./app/**/*.js', ['js']);
});