var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var injectPartials = require('gulp-inject-partials');
var del = require('del');

gulp.task('clean', function () {
    return del('./build/**/*');
});

gulp.task('partials', function () {
    return gulp.src('*.html')
        .pipe(injectPartials({
            removeTags: true
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('copy', function () {
    return gulp.src([
        './assets/**/*'
    ]).pipe(gulp.dest('./build/'));
});

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', function () {

    browserSync.init({
        server: "./build"
    });

    gulp.watch("assets/css/*.css", gulp.series(['copy', 'reload']));
    gulp.watch("assets/img/**/*", gulp.series(['copy', 'reload']));
    gulp.watch("assets/assets/**/*", gulp.series(['copy', 'reload']));
    gulp.watch("assets/js/*.js", gulp.series(['copy', 'reload']));
    gulp.watch(["*.html", "partial/*.html"], gulp.series(['partials', 'reload']));
});

gulp.task('default', gulp.series(['clean', 'copy', 'partials', 'serve']));
gulp.task('build', gulp.series(['clean', 'copy', 'partials']));