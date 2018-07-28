//var gulp = require('gulp');
var livereload = require('gulp-livereload')
var uglify = require('gulp-uglifyjs');
//var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    imageResize = require('gulp-image-resize'),
    rename = require("gulp-rename");


gulp.task('imagemin', function () {
    return gulp.src('./themes/custom/pilot/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./themes/custom/pilot/images'));
});


gulp.task("resize976", function () {
  gulp.src("assets/images/releases/originals/*.{jpg,png}")
    .pipe(imageResize({  
      width : 976,
      height : 976,
      crop : true,
      upscale : true
    }))
    .pipe(rename(function (path) { path.basename += "-976"; }))
    .pipe(gulp.dest("assets/images/releases/resized"));
});

gulp.task("resize480", function () {
  gulp.src("assets/images/releases/originals/*.{jpg,png}")
    .pipe(imageResize({  
      width : 480,
      height : 480,
      crop : true,
      upscale : true
    }))
    .pipe(rename(function (path) { path.basename += "-480"; }))
    .pipe(gulp.dest("assets/images/releases/resized"));
});


gulp.task('sass', function () {
  gulp.src('./themes/custom/pilot/sass/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./themes/custom/pilot/css'));
});


gulp.task('uglify', function() {
  gulp.src('./themes/custom/pilot/lib/*.js')
    .pipe(uglify('main.js'))
    .pipe(gulp.dest('./themes/custom/pilot/js'))
});

gulp.task('watch', function(){
    livereload.listen();

    gulp.watch('./themes/custom/pilot/sass/**/*.scss', ['sass']);
    gulp.watch('./themes/custom/pilot/lib/*.js', ['uglify']);
    gulp.watch(['./themes/custom/pilot/css/style.css', './themes/custom/pilot/**/*.twig', './themes/custom/pilot/js/*.js'], function (files){
        livereload.changed(files)
    });
});