var gulp = require('gulp'),
    tinypng = require('gulp-tinypng');
//压缩图片 - tinypng
gulp.task('tinypng', function () {
    var workDirectory = 'xxx', outPut = 'yyy';
    gulp.src(workDirectory + '/images/*.{png,jpg,jpeg}')
        .pipe(tinypng(config.tinypngapi))
        .pipe(gulp.dest(outPut + '/images'));
});