var gulp = require('gulp'),
    del = require('del'),
    useref = require('gulp-useref');

var source = "app";
var destination = "dist";

gulp.task('clean:dist', function() {
    return del.sync(destination);
});

gulp.task('useref', function(){
    return gulp.src(source + '/*.html')
        .pipe(useref())
        .pipe(gulp.dest(destination))
});

gulp.task('assets', function() {
    return gulp.src(source + '/assets/**/*')
        .pipe(gulp.dest(destination + '/assets'))
});

gulp.task('build', ['clean:dist', 'useref', 'assets'], function (){
    console.log('Building files to "' + destination + '" complete');
});

gulp.task('default', function() {
    console.log('Please use build task for deployment');
});
