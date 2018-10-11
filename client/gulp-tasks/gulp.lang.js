//公共库
const Gulp = require('gulp');
const GulpUtil = require('../plugins/gulp-util');
var GulpEgret = require('../plugins/gulp-egret');
const del = require('del');
var gulpSequence = require('gulp-sequence');
var tap = require('gulp-tap');
var fs = require('fs');

Gulp.task('replace-lang', function (cb)
{
    var langname = process.argv[4];
    if (!langname)
    {
        console.log("制定输入的语言文件为空！");
        return;
    }
    var langdatapath = "resource/assets/lang/" + langname + ".json";
    if (fs.existsSync(langdatapath))
    {
        var text = fs.readFileSync(langdatapath).toString();
        let langList = JSON.parse(text);
        let filesList = GulpUtil.getAllFilePath("bin-release/web/0.1.0/", ".js");
        // console.log("filelist", filesList);
        for (let filepath of filesList)
        {
            return Gulp.src([filepath])
                .pipe(tap(function (file)
                {
                    let outData = file.contents.toString();
                    for (let obj of langList)
                    {
                        let v = obj.v;
                        if (v != "")
                        {
                            reg = new RegExp('"' + obj.k + '"', "g");
                            outData = outData.replace(reg, "I18n.getText(" + '"' + obj.k + '"' + ")");
                        }
                    }
                    // console.log("outData", outData);
                    fs.writeFileSync(filepath, outData);
                }));
        }
    }
    else
    {
        console.log('语言目录不存在:' + langdatapath);
    }
});
Gulp.task('lang-complex', function (cb)
{
    //繁体字路径
    var complexpath = "resource/assets/lang/zh-tw-complex.json";
    let originpath = "resource/assets/lang/zh-tw.json";
    if (fs.existsSync(complexpath) && fs.existsSync(originpath))
    {
        var text = fs.readFileSync(complexpath).toString();
        let complexList = JSON.parse(text);

        text = fs.readFileSync(originpath).toString();
        let originList = JSON.parse(text);

        let keyList = [];
        for(let key in complexList)
        {
            keyList.push(key);
        }
        let idx = 0;
        for(let key in originList)
        {
            originList[key] = keyList[idx];
            idx++;
        }
        fs.writeFileSync(originpath, JSON.stringify(originList));
        console.log("语言转换完毕");
    }
    else
    {
        console.log('请检查语言目录是否存在:' + complexpath + " 源目录:" + originpath);
    }
});