var gulp = require("gulp"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    jsmin = require("gulp-jsmin"),
    uglify = require("gulp-uglify")

var paths = {};
paths.concatJslib = 'www/lib/lib.js'; //js套件輸出路徑
paths.concatCss = 'www/css/study4.css'; //css輸出路徑
paths.concatAngularApp = 'www/js/main.js'; //js app輸出路徑

// 載入JavaScript lib
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


// 載入Angular Apps
var ngPath = 'www/js/';
gulp.task("apps", function () {
    gulp.src(
        [
            ngPath + 'app.js', //監控資料夾可用 *.js
            ngPath + 'controllers.js'
        ], { base: "." })
        .pipe(concat(paths.concatAngularApp))
        .pipe(jsmin())
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

// 載入CSS
gulp.task("css", function () {
    gulp.src([
        'www/css/index.css',
        'www/css/style.css'
    ])
    .pipe(concat(paths.concatCss))
    .pipe(cssmin())
    .pipe(gulp.dest("."));
});


// 監控資料夾，如果有儲存，執行apps css task
gulp.task('watch', function () {
    gulp.watch([
            ngPath + 'app.js', //監控資料夾可用 *.js
            ngPath + 'controllers.js',
            'www/css/index.css',
            'www/css/style.css'
    ], ['apps', 'css']);
});