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
    csso = require('gulp-csso'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    filter = require('gulp-filter')
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
    app.use(function (req, res, next) {
        if(req.accepts('html')) {
            res.sendFile('index.html', {root: './dist'});
            return;
        }
    });
    app.listen(process.env.PORT || 1377);
    gutil.log('Listening on port: ' + (process.env.PORT || 1377));
});

gulp.task('watch', ['js', 'image', 'css', 'templates', 'express'], function() {
    gulp.watch('src/assets/css/**/*.styl', ['css']);
    gulp.watch('src/assets/js/**/*.ts', ['js']);
    gulp.watch('src/assets/img/**/*', ['image']);
    gulp.watch('src/*.jade', ['templates']);
    gulp.watch('src/assets/partials/*.jade', ['templates']);
});

gulp.task('build', ['js', 'image', 'css', 'templates', 'templates'], function () {
    var jsFilter = filter("**/*.js", {restore: true});
    var cssFilter = filter("**/*.css", {restore: true});
    
    var userefAssets = useref.assets();
    
    return gulp.src("dist/index.html")
        .pipe(userefAssets)      // Concatenate with gulp-useref

        .pipe(jsFilter)
        .pipe(sourcemaps.init())
        .pipe(uglify())             // Minify any javascript sources
        .pipe(rev())                // Rename the concatenated files
        .pipe(sourcemaps.write('./'))
        .pipe(jsFilter.restore)

        .pipe(cssFilter)
        .pipe(sourcemaps.init())
        .pipe(csso())               // Minify any CSS sources
        .pipe(rev())                // Rename the concatenated files
        .pipe(sourcemaps.write('./'))
        .pipe(cssFilter.restore)

        .pipe(userefAssets.restore())
        .pipe(useref())

        .pipe(revReplace())         // Substitute in new filenames

        .pipe(gulp.dest('www'));
});

gulp.task('_www', ['build'], function () {
    return gulp.src([
        "./dist/assets/partials/**/*.html",
        "./dist/assets/img/**/*",
    ], { base: './dist' })
        .pipe(gulp.dest('www/'));
});

gulp.task('www', ['_www'], function () {
    return gulp.src([
        './dist/assets/components/bootstrap/fonts/**/*'
    ], { base: './dist/assets/components/bootstrap' })
        .pipe(gulp.dest('www/'));
})

// Default Task
gulp.task('default', ['js', 'image', 'css', 'templates', 'express']);
