var config = require('./config');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var typescript = require("gulp-typescript");
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var template = require('gulp-template');
var nodeNeat = require('node-neat');
var through = require('through2');
var gulpSequence = require('gulp-sequence')

var platform = {
    office: false,
    agent: false,
    _4399: false
}
var options = process.argv;
var dev = false;
var serverConfig = {
    port: 8080,
    root: config.compile,
    livereload: true
}

options.forEach(function (item) {
    switch (item) {
        case 'dev':
            dev = true
            break;
        case 'min':
            platform.office = true
            break;
        case '--4399':
            platform._4399 = true
            platform.agent = false
            platform.office = false
            break;
        case '--agent':
            platform.agent = true
            platform.office = false
            platform._4399 = false
            break;
    }
})
if (platform.office) config.dist += '/office'
if (platform.agent) config.dist += '/agent'
if (platform._4399) config.dist += '/4399'

var templateConfig = {
    _4399: dev ? '' : platform._4399 ? ' _4399' : '',
    enter: dev ? 'http://ddt.wan.com/server' : platform._4399 ? 'http://web.4399.com/ddt/select_server.html' : 'http://ddt.wan.com/server',
    homepage: dev ? 'http://ddt.wan.com/index' : platform._4399 ? 'http://web.4399.com/ddt/' : 'http://ddt.wan.com/index',
    logo3: dev ? '' : platform.office ? '' : 'logo3',
    none: dev ? '' : platform.office ? '' : 'display:none',
    bdPic: dev ? '' : platform.office ? '' : '3',
}

gulp.task('connect', function () {
    connect.server(serverConfig)
}).task('html', function () {
    gulp.watch(config.src + '/template/**/*.html', ['html_'])
}).task('html_', function () {
    gulp.src(config.src + '/template/**/*.html')
        .pipe(template(templateConfig))
        .pipe(gulp.dest(config.compile))
        .pipe(connect.reload())
}).task('sass', function () {
    gulp.watch(config.src + '/sass/**/*.scss', ['sass_'])
}).task('sass_', function () {
    gulp.src(config.src + '/sass/style.scss')
        .pipe(sass({
            // nested：嵌套缩进的css代码，它是默认值。
            // expanded：没有缩进的、扩展的css代码。
            // compact：简洁格式的css代码。c
            // compressed：压缩后的css代码。
            outputStyle: 'expanded',
            includePaths: nodeNeat.includePaths
        }))
        .pipe(gulp.dest(config.compile + '/css'))
        .pipe(connect.reload())
}).task('typescript', function () {
    gulp.watch(config.src + '/typescript/**/*.ts', function () {
        gulpSequence('typescript_', 'concat')(function (err) {
            if (err) console.log(err)
        })
    })
}).task('typescript_', function () {
    return gulp.src(config.src + '/typescript/*.ts')
        .pipe(typescript({
            target: 'es3'
        }))
        .pipe(gulp.dest(config.compile + '/js'))
}).task('concat', function () {
    return gulp.src([
        config.node_modules + '/jquery/dist/jquery.min.js',
        config.compile + '/js/index.js'
    ])
        .pipe(concat('index.js'))
        .pipe(gulp.dest(config.compile + '/js'))
        .pipe(connect.reload())
}).task('jsmin', function () {
    gulp.src(config.compile + '/js/*.js')
        .pipe(gulp.dest(config.dist + '/js'))
}).task('cssmin', function () {
    gulp.src(config.compile + '/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.dist + '/css'));
}).task('htmlmin', function () {
    gulp.src(config.src + '/template/**/*.html')
        .pipe(template(templateConfig))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(config.dist));
}).task('copy', function () {
    gulp.src([
        config.compile + '/*.xml',
        config.compile + '/*.swf',
    ])
        .pipe(gulp.dest(config.dist));
    gulp.src(config.compile + '/images/**/*')
        .pipe(gulp.dest(config.dist + '/images'))
})

gulp.task('dev', ['connect', 'html', 'sass', 'typescript']);
gulp.task('min', ['jsmin', 'cssmin', 'htmlmin', 'copy']);