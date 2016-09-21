var gulp = require('gulp'),
    del = require('del'),
    useref = require('gulp-useref');

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

gulp.task('assets', function() {
    return gulp.src('app/assets/**/*')
        .pipe(gulp.dest('dist/assets'))
});

gulp.task('build', ['clean:dist', 'useref', 'assets'], function (){
    console.log('Building files');
});

gulp.task('default', function() {
    console.log('Please use build task for deployment');
});
