//公共库
const Gulp = require('gulp');
const GulpConcat = require('gulp-concat');
const GulpJsonMinify = require('gulp-json-minify');
const GulpZip = require('gulp-zip');
const Path = require('path');
const Htmlmin = require('htmlmin');
const GulpUtil = require('../plugins/gulp-util');
var GulpEgret = require('../plugins/gulp-egret');
const GulpUglify = require('gulp-uglify');
const GulpRename = require('gulp-rename');
const GulpRev = require('gulp-rev');
const GulpImageMin = require('gulp-imagemin');
const del = require('del');
var gulpSequence = require('gulp-sequence');
var tap = require('gulp-tap');
var revCollector = require('gulp-rev-collector');
var fs = require('fs');

//路径
var version = process.argv[4];
if (!version) {
    console.log("请输入版本号！");
    return;
}
const out_path = `bin-release/web/${version}/`;
if (!fs.existsSync(out_path)) {
    console.log("项目版本目录不存在！请确认版本号是否正确!");
    return;
}

let sthList = [
];
//发布 合并js 压缩js 版本控制
Gulp.task('publish', function (cb) {
    gulpSequence('concat', 'zip-js', 'version', cb);
});
//copy一些引擎不copy的文件
Gulp.task('copy', function (cb) {
    return gulpSequence('copy-sth', 'copy-js', cb);
});
/**
 * 合并js 压缩主题js
 */
Gulp.task('concat', function (cb) {
    return gulpSequence('libs-js', 'uglify-js', 'main-js', 'del-js', cb);
});
//将JS压缩成zip文件
Gulp.task('zip-js', function(cb){
    return gulpSequence('zip-libjs', 'zip-mainjs','del-js2', cb);
});
//添加文件名后缀crc扩展
Gulp.task('version', function (cb) {
    return gulpSequence(
        'version-resource1',
        'version-resource2',
        'version-resource3',

        'version-sheet1',
        'version-sheet2',

        'version-js1',
        'version-js2',

        'del-resource',
        'rename-resource',
        cb);
});

//版本处理
//通用资源
Gulp.task('version-resource1', function () {
    return Gulp.src([
        out_path + 'resource/**/*',
        '!' + out_path + 'resource/default*.thm.json',
        '!' + out_path + 'resource/images/**/*',
    ]).pipe(GulpRev())
        .pipe(Gulp.dest(out_path + 'resource-rev'))
        .pipe(GulpRev.manifest({
            path: 'rev-manifest-js.json'
        }))
        .pipe(Gulp.dest(out_path + 'rev/resource'));
});
Gulp.task('version-resource2', function () {
    return Gulp.src([out_path + 'rev/resource/rev-manifest-js.json', out_path + 'resource-rev/default*.res.json'])
        .pipe(revCollector())
        .pipe(Gulp.dest(out_path + 'resource-rev/'));
});
Gulp.task('version-resource3', function () {
    return Gulp.src([out_path + 'rev/resource/rev-manifest-js.json', out_path + 'index.html'])
        .pipe(revCollector())
        .pipe(Gulp.dest(out_path));
});

//图集
Gulp.task('version-sheet1', function () {
    return Gulp.src([out_path + 'resource/assets/sheet/**/*']).pipe(GulpRev())
        .pipe(Gulp.dest(out_path + 'resource-rev/assets/sheet/'))
        .pipe(GulpRev.manifest({
            path: 'rev-manifest-js.json'
        }))
        .pipe(Gulp.dest(out_path + 'rev/resource/assets/sheet'));
});
Gulp.task('version-sheet2', function () {
    return Gulp.src([out_path + 'rev/resource/assets/sheet/rev-manifest-js.json', out_path + 'resource-rev/assets/sheet/**/*.json'])
        .pipe(revCollector())
        .pipe(Gulp.dest(out_path + 'resource-rev/assets/sheet/'));
});
//压缩js文件
Gulp.task('zip-libjs',function(){
    return Gulp.src([out_path + 'js/lib.min.js']).pipe(GulpZip("lib.zip")).pipe(Gulp.dest(out_path + "js/"));
});
Gulp.task('zip-mainjs',function(){
    return Gulp.src([out_path + 'js/main.min.js']).pipe(GulpZip("main.zip")).pipe(Gulp.dest(out_path + "js/"));
});
//js代码文件
Gulp.task('version-js1', function () {
    return Gulp.src([out_path + 'js/**/*']).pipe(GulpRev())
        .pipe(Gulp.dest(out_path + 'js-rev'))
        .pipe(GulpRev.manifest({
            path: 'rev-manifest-js.json'
        }))
        .pipe(Gulp.dest(out_path + 'rev/js'));;
});
Gulp.task('version-js2', function () {
    return Gulp.src([out_path + 'rev/js/rev-manifest-js.json', out_path + 'index.html'])
        .pipe(revCollector())
        .pipe(Gulp.dest(out_path));
});

Gulp.task('del-resource', function (cb) {
    return del([
        out_path + 'resource',
        out_path + 'js',
        out_path + 'rev',
        out_path + 'manifest*.json',
        out_path + 'resource-rev/images'
    ].concat(sthList));
});
Gulp.task('rename-resource', function (cb) {
    fs.rename(out_path + 'js-rev', out_path + 'js');
    return fs.rename(out_path + 'resource-rev', out_path + 'resource');
});
//copy资源
Gulp.task('copy-sth', function () {
    return Gulp.src([
        // 'DynoBold.eot',
    ]).pipe(Gulp.dest(out_path));
});
Gulp.task('copy-js', function () {
    let list = [
        'libs/js/**/*.js'
    ];
    return Gulp.src(list).pipe(Gulp.dest(out_path + 'libs/js'));
});
//合并js
Gulp.task('libs-js', function (cb) {
    return Gulp.src([
        out_path + 'js/egret.min*.js',
        out_path + 'js/egret.web.min*.js',
        out_path + 'js/eui.min*.js',
        out_path + 'js/assetsmanager.min*.js',
        out_path + 'js/tween.min*.js',
        out_path + 'js/game.min*.js',
        out_path + 'js/socket.min*.js',
        out_path + 'js/dragonBones.min*.js',
        out_path + 'js/promise.min*.js',
        out_path + 'js/particle.min*.js',
        out_path + 'js/md5.min*.js',
        out_path + 'js/protobuf-library.min*.js',
    ]).pipe(GulpConcat('lib.min.js')).pipe(Gulp.dest(out_path + 'js/')); //.pipe(GulpUglify())
});
Gulp.task('third-js', function (cb) {
    return Gulp.src([
        // out_path + 'libs/js/cook.file.js',
        out_path + 'libs/js/**/*.js',
    ]).pipe(GulpConcat('third.min.js'))/*.pipe(GulpUglify())*/.pipe(Gulp.dest(out_path + 'js/'));;
});
Gulp.task('uglify-js', function (cb) {
    return Gulp.src([
        out_path + 'js/default.thm*.js',
    ]).pipe(GulpUglify()).pipe(Gulp.dest(out_path + 'js/'));;
});
Gulp.task('main-js', function (cb) {
    return Gulp.src([
        out_path + 'js/protobuf-bundles.min*.js',
        out_path + 'js/default.thm*.js',
        out_path + 'js/main.min*.js',
    ]).pipe(GulpConcat('main.min.js')).pipe(Gulp.dest(out_path + 'js/'));;
});
Gulp.task('del-js', function (cb) {
    return del([
        out_path + 'js/**/*.js',
        '!' + out_path + 'js/jszip.min.js',
        '!' + out_path + 'js/lib.min.js',
        '!' + out_path + 'js/main.min.js',
    ]);
});
Gulp.task('del-js2', function (cb) {
    return del([
        out_path + 'js/**/*.js',
        '!' + out_path + 'js/jszip.min.js',
    ]);
});

