var gulp           = require('gulp'),
    browserSync    = require('browser-sync').create(),
    sass           = require('gulp-sass'),
    compass        = require('gulp-compass'),
    autoprefixer   = require('gulp-autoprefixer'),
    rename         = require('gulp-rename'),
    minifycss      = require('gulp-minify-css'),
    uglify         = require('gulp-uglify'),
    mainBowerFiles = require('main-bower-files'),
    concat         = require('gulp-concat'),
    jshint         = require('gulp-jshint'),
    gFilter        = require('gulp-filter'),
    plumber        = require('gulp-plumber'),
    sourcemaps     = require('gulp-sourcemaps');

/*==============================================================
 *==== Server Scss Lint Html Js ================================
 *==============================================================*/
//Server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});

//Scss to css
gulp.task('scss', function() {
    return gulp.src('sass/*.scss')
    .pipe(compass({
        config_file: './config.rb',
        css: 'app/css',
    }))
    .pipe(autoprefixer({
         browsers: ['last 15 versions'],
         cascade: false
    }))
    .pipe(gulp.dest('app/css'))   
    .pipe(browserSync.stream());   
});

 //Lint js files
 gulp.task('lint', function(){
    return gulp.src('app/js/common.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
 }); 

//Watch
gulp.task('watch', function() {
    gulp.watch('sass/*.scss', ['scss']);
    gulp.watch('app/js/common.js',['lint']);
    gulp.watch(['app/*.html','app/js/*.js','sass/*.scss']).on('change', browserSync.reload);
});


//Default task
gulp.task('default',[
    'serve', 
    'watch', 
    'scss',
    'lint'
    ], function() {
});


/*==============================================================
 *==== get main-files from bower ===============================
 *==============================================================*/
//main-files(главные файлы js в bower)
    gulp.task('main_js', function() {
    return gulp.src(mainBowerFiles('**/*.js'))

        .pipe(gulp.dest('app/libs/js'));
});

//main-files(главные файлы css в bower)
    gulp.task('main_css', function() {
    return gulp.src(mainBowerFiles('**/*.css'))
    
        .pipe(gulp.dest('app/libs/css'));
});

//main_files task
gulp.task('main_files', [
    'main_js', 
    'main_css'
    ], function() {
});



/*==============================================================
 *==== minfy-files for production ==============================
 *==============================================================*/
//Minfy-css
gulp.task('minify_css', function() {
  return gulp.src('app/css/*.css')
    .pipe(rename({
        suffix: '.min', 
        prefix : '_'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('app/libs/css')) 
    .pipe(browserSync.stream());
});

// Uglify min-js
gulp.task('uglify_js', function() {
  return gulp.src('app/js/*.js')
    .pipe(rename({
        suffix: '.min', 
        prefix : '_'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('app/libs/js'))
    .pipe(browserSync.stream());
});

//min_files task
gulp.task('min_files', [
    'uglify_js',
    'minify_css'
    ], function() {
});


/*==============================================================
 *==== Other Tasks =============================================
 *==============================================================*/
