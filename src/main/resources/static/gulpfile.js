var gulp = require('gulp');
var concat = require('gulp-concat');
// var mainBowerFiles = require('main-bower-files');
// var lib    = require('bower-files')();
// var uglify = require('gulp-uglify');


gulp.task('css', function(){
    gulp.src([
        "./node_modules/bootstrap/dist/css/bootstrap.min.css",
        "./node_modules/select2/dist/css/select2.min.css",
        "./app/resource/css/**/*.css"
    ])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
    gulp.src([
        "./node_modules/jquery/dist/jquery.min.js",
        "./node_modules/angular/angular.min.js",
        "./node_modules/angular-ui-router/release/angular-ui-router.min.js",
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


// gulp.task('bower', function() {
//     return gulp.src(mainBowerFiles())
//         .pipe(gulp.dest('./dist/bower'));
// });
//
// gulp.task('files', function () {
//     gulp.src(lib.ext('js').files)
//         .pipe(order(['jquery.js', 'angular.js']))
//         .pipe(concat('scripts.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist/bower'));
//
// });