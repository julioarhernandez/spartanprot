var gulp = require('gulp');
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

gulp.task('build', gulp.series(['clean', 'copy', 'partials']));