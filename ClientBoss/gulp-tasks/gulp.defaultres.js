const Gulp = require('gulp');
const GulpUtil = require('../plugins/gulp-util');
var GulpEgret = require('../plugins/gulp-egret');
var fs = require('fs');
var Path = require('path');

const ProjectLibsPath = 'libs';
const ProjectResourcePath = 'resource';
const ProjectAssetsPath = Path.join(ProjectResourcePath, 'assets');

Gulp.task('res-process', function () {
    let path = Path.join(ProjectResourcePath, 'default.res.json');
    let resStr = fs.readFileSync(path).toString();
    let resObj = resStr ? JSON.parse(resStr) : null;
    if (resObj == null) {
        resObj = {};
    }
    if (resObj.resources == null) {
        resObj.resources = [];
    }
    //
    let resFiles = GulpUtil.getAllFilePath(ProjectAssetsPath);
    //添加资源文件到default.res.json
    GulpEgret.addResFilesToResJson(resFiles, resObj);
    fs.writeFileSync(path, JSON.stringify(resObj, null, '\t'));
    console.log("资源处理完毕");
});
