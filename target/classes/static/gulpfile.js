var gulp = require('gulp');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
// var lib    = require('bower-files-files')();
// var uglify = require('gulp-uglify');


gulp.task('css', function(){
    gulp.src([
        "./app/bower-files/bootstrap.css",
        "./app/bower-files/select2.css",
        "./app/css/style.css"
    ])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./app/build'));
});

gulp.task('js', function() {
    gulp.src([
        "./app/bower-files/jquery.js",
        "./app/bower-files/angular.js",
        "./app/bower-files/angular-ui-router.js",
        "./app/bower-files/select2.js",
        "./app/bower-files/index.js",
        "./app/js/**/*.js"
    ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./app/build'));
});

gulp.task('build', function() {
    gulp.start(['css', 'js']);
    // gulp.watch('./app/**/*.css', ['css']);
    // gulp.watch('./app/**/*.js', ['js']);
});

gulp.task('index', function () {

    var tpl_src = [
        "./app/build/**/*.js",
        "./app/build/**/*.css"];

    return gulp.src('./app/index.html')
        .pipe(inject(gulp.src(tpl_src)))
        .pipe(gulp.dest('./'));

});

gulp.task('bower', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('./app/bower-files'));
});
//
// gulp.task('files', function () {
//     gulp.src(lib.ext('js').files)
//         .pipe(order(['jquery.js', 'angular.js']))
//         .pipe(concat('scripts.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist/bower-files'));
//
// });