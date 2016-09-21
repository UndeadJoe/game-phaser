var gulp = require('gulp'),
    del = require('del'),
    useref = require('gulp-useref'),
    runSequence = require('run-sequence');

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

gulp.task('maps', function() {
    return gulp.src(source + '/components/phaser/build/phaser.map')
        .pipe(gulp.dest(destination + '/js/vendor'))
});

gulp.task('build', function (callback){
    runSequence('clean:dist', ['useref', 'assets', 'maps'], callback);
    console.log('Building files to "' + destination + '"...');
});

gulp.task('default', function() {
    console.log('Please use build task for deployment');
});
