var gulp = require("gulp"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    jsmin = require("gulp-jsmin"),
    uglify = require("gulp-uglify")

var paths = {};
paths.concatJslib = 'www/lib/lib.js'; //js�M���X���|
paths.concatCss = 'www/css/study4.css'; //css��X���|
paths.concatAngularApp = 'www/js/main.js'; //js app��X���|

// ���JJavaScript lib
gulp.task("lib", function () {
    gulp.src(
    [
        'bower_components/ionic/release/js/ionic.bundle.js',
        'bower_components/ngCordova/dist/ng-cordova.min.js'
    ], { base: "." })
        .pipe(concat(paths.concatJslib))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});


// ���JAngular Apps
var ngPath = 'www/js/';
gulp.task("apps", function () {
    gulp.src(
        [
            ngPath + 'app.js', //�ʱ���Ƨ��i�� *.js
            ngPath + 'controllers.js'
        ], { base: "." })
        .pipe(concat(paths.concatAngularApp))
        .pipe(jsmin())
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

// ���JCSS
gulp.task("css", function () {
    gulp.src([
        'www/css/index.css',
        'www/css/style.css'
    ])
    .pipe(concat(paths.concatCss))
    .pipe(cssmin())
    .pipe(gulp.dest("."));
});


// �ʱ���Ƨ��A�p�G���x�s�A����apps css task
gulp.task('watch', function () {
    gulp.watch([
            ngPath + 'app.js', //�ʱ���Ƨ��i�� *.js
            ngPath + 'controllers.js',
            'www/css/index.css',
            'www/css/style.css'
    ], ['apps', 'css']);
});