var gulp = require('gulp');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');


gulp.task('css', function(){
    gulp.src([
        "./public/app/bower-files/bootstrap.css",
        "./public/app/bower-files/select2.css",
        "./public/app/css/style.css"
    ])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./static/app'));
});

gulp.task('js', function() {
    gulp.src([
        "./public/app/bower-files/jquery.js",
        "./public/app/bower-files/angular.js",
        "./public/app/bower-files/angular-ui-router.js",
        "./public/app/bower-files/select2.js",
        "./public/app/bower-files/index.js",
        "./public/app/js/**/*.js"
    ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./static/app'));
});

gulp.task('html', function () {
    gulp.src('./public/app/views/**/*.html')
        .pipe(gulp.dest('./static/app/views'));
});

gulp.task('build', function() {
    gulp.start(['css', 'js', 'html']);
});

gulp.task('index', function () {

    var tpl_src = [
        "./static/app/**/*.js",
        "./static/app/**/*.css"];

    return gulp.src('./public/app/index.html')
        .pipe(inject(gulp.src(tpl_src)))
        .pipe(gulp.dest('./static'));

});

gulp.task('bower', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('./public/app/bower-files'));
});