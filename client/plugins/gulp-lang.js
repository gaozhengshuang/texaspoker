const FS = require("fs");
const Path = require('path');
const GulpUtil = require(__dirname + '/gulp-util');
/**
 * 抽取语言
 */
exports.extractLang = function (paths, suffixs, filterPaths, filterKeywords, origLangs) {
    if (!suffixs) {
        return null;
    }
    //
    var regex_content = new RegExp('[\"\']((?![\"\']).)+[\"\']', 'g');//抽取引号中的内容
    var regex_content1 = new RegExp('[\>]((?![\>\<]).)+[\<]', 'g');//抽取><中的内容
    var regex_lang = new RegExp('[\u4e00-\u9fa5]', 'g');//过滤出中文内容
    var regex_remove = new RegExp('[\\t\\0\\v]', 'g');//去掉杂七杂八的字符
    var regex_remove1 = new RegExp('\""+', 'g'); //去除连接着的双引号
    var regex_line = new RegExp('[\\r\\n]', 'g');//换行裁剪成数组


    //
    var langObj = {};
    var pathList = [];
    paths.forEach(function (path) {
        GulpUtil.refAllFilePath(path, suffixs, pathList);
    }, this);
    for (var a in pathList) {
        var path = pathList[a];
        if (!_isFilterPaths(path, filterPaths)) {
            var lineList = FS.readFileSync(path).toString().split(regex_line);
            for (var b in lineList) {
                var line = lineList[b].trim().replace(regex_remove, '');
                var line = line.replace(regex_remove1, '');
                if (_isFilterKeywords(line, filterKeywords) == false) {
                    array = line.match(regex_content); //抽取引号中的内容
                    let tmp = line.match(regex_content1); //先抽取尖括号里面的内容

                    if (tmp) {
                        let result = [];
                        for (let word in array) {
                            if (!/[\>\<]/g.test(array[word])) {
                                result.push(array[word]);
                            }
                        }
                        result = result.concat(tmp);
                        array = result;
                    }
                    for (var c in array) {
                        var lang = array[c].substring(1, array[c].length - 1);
                        if (lang.match(regex_lang)) {
                            langObj[lang] = '';
                        }

                    }

                }
            }
        }
    }
    return langObj;
};
function _getLangObject(langArray, key) {
    if (langArray) {
        for (var i in langArray) {
            var o = langArray[i];
            if (o.k == key) {
                return o;
            }
        }
    }
    return null;
}
function _isFilterPaths(path, filters) {
    if (filters) {
        path = path.replace(/\\/g, '/');
        for (var i in filters) {
            var item = filters[i].replace(/\\/g, '/');
            if (path.indexOf(item) >= 0) {
                return true;
            }
        }
    }
    return false;
}
function _isFilterKeywords(line, filters) {
    if (filters) {
        for (var i in filters) {
            if (line.indexOf(filters[i]) == 0) {
                return true;
            }
        }
    }
    return false;
}