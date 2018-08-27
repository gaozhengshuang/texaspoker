var Gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('./gulp-tasks');
Gulp.task('default', [
    'publish',
], function () {
});