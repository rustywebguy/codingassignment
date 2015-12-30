var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var notify = require('gulp-notify')
var connect = require('gulp-connect');

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
  
    var props = {
        entries: ['./js/' + file],
        debug : true,
        transform:  [reactify]
    };

    // watchify() if watch requested, otherwise run browserify() once 
    var bundler = watch ? watchify(browserify(props)) : browserify(props);

    function rebundle() {
        var stream = bundler.bundle();
        return stream
            .on('error', handleErrors)
            .pipe(source(file))
            .pipe(gulp.dest('./build/'));
    }

    // listen for an update and run rebundle
    bundler.on('update', function() {
        rebundle();
        gutil.log('Rebundle...');
    });

    // run it once the first time buildScript is called
    return rebundle();
}

gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('js', function () {
    gulp.src('./build/*.js')
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe(connect.reload());
});
 
gulp.task('watch', function () {
    gulp.watch(['./*.html'], ['html']);
    gulp.watch('./build/*.js', ['js']);
});

gulp.task('scripts', function() {
    return buildScript('app.js', false);
});

gulp.task('default', ['scripts', 'connect', 'watch'], function() {
    return buildScript('app.js', true);
});