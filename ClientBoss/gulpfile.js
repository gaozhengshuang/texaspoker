var Gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('./gulp-tasks');
Gulp.task('default', [
    'copy',
    //发布
    'publish',
    //资源处理
    'res-process',
], function () {
});