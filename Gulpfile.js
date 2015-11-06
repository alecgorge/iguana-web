var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    ts = require('gulp-typescript'),
    jade = require('gulp-jade'),
    express = require('express'),
    sourcemaps = require('gulp-sourcemaps'),
    stylus = require('gulp-stylus'),
    app = express(),
    path = require('path')
    image = require('gulp-image'),
    useref = require('gulp-useref'),
    gulp_if = require('gulp-if'),
    lazypipe = require('lazypipe'),
    minifyCss = require('gulp-minify-css')
    ;

// --- Basic Tasks ---
gulp.task('css', function() {
    return gulp.src('src/assets/css/**/*.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/assets/css/'))
});

gulp.task('js', function() {
    return gulp.src('src/assets/js/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'Application.js'
        }))
        .pipe(gulp.dest('dist/assets/js/'))
});

gulp.task('templates', function() {
    var j = jade({
        pretty: true
    });
    
    j.on('error', function (e) {
       console.error(e);
       j.end(); 
    });
    
    return gulp.src('src/**/*.jade')
        .pipe(j)
        .pipe(gulp.dest('dist/'))
});

gulp.task('image', function () {
    return gulp.src('src/assets/img/*')
        .pipe(image())
        .pipe(gulp.dest('dist/assets/img/'));
});

gulp.task('express', function() {
    app.use(express.static(path.resolve('./dist')));
    app.listen(process.env.PORT || 1377);
    gutil.log('Listening on port: ' + (process.env.PORT || 1337));
});

gulp.task('watch', ['js', 'image', 'css', 'templates', 'express'], function() {
    gulp.watch('src/assets/css/**/*.styl', ['css']);
    gulp.watch('src/assets/js/**/*.ts', ['js']);
    gulp.watch('src/assets/img/**/*', ['image']);
    gulp.watch('src/*.jade', ['templates']);
    gulp.watch('src/assets/partials/*.jade', ['templates']);
});

gulp.task('build', ['js', 'image', 'css', 'templates'], function () {
    var assets = useref.assets({}, lazypipe().pipe(sourcemaps.init, { loadMaps: true }));
    return gulp.src('dist/**/*.html')
        .pipe(assets)
        .pipe(gulp_if('**/*.js', uglify()))
        .pipe(gulp_if('**/*.css', minifyCss()))
        .pipe(sourcemaps.write('maps'))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('www'))
});

// Default Task
gulp.task('default', ['js', 'image', 'css', 'templates', 'express']);
