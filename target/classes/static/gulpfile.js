var gulp = require('gulp'),
    concat = require('gulp-concat');
    // scripts = require('./scripts'),
    // styles = require('./styles');

gulp.task('css', function(){
    gulp.src([
        "./app/resource/css/**/*.css",
        "./node_modules/bootstrap/dist/css/bootstrap.min.css",
        "./node_modules/select2/dist/css/select2.min.css"
    ])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/css'));
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
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', function () {
   gulp.src('./app/**/*.html')
       .pipe(gulp.dest('./dist/views'));
});

gulp.task('build', function() {
    gulp.start(['css', 'js', 'html']);
    gulp.watch('./app/resource/css/**/*.css', ['css']);
    gulp.watch('./app/**/*.js', ['js']);
    gulp.watch('./app/views/**/*.html', ['html']);
});