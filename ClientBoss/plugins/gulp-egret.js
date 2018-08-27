var FS = require("fs");
var Path = require('path');

/**
 * 添加资源文件到default.res.json
 */
exports.addResFilesToResJson = function(fileList, resObj)
{
    const ResDirName = 'resource/';
    let sheetList = [];
    let sheetSubKeysMap = {};
    //文件路径转default.res.json的url
    for(let i in fileList)
    {
        let filePath = fileList[i];
        let fileUrl = filePath.replace(/\\/g,'/').substring(ResDirName.length);//path转url，并去掉resource/
        fileList[i] = fileUrl;
        if(Path.extname(filePath) == '.json')
        {
            try
            {
                let obj = JSON.parse(FS.readFileSync(filePath).toString());
                if(obj.file && obj.frames)
                {
                    if(FS.existsSync(Path.join(Path.dirname(filePath),obj.file)))
                    {
                        sheetList.push(Path.dirname(fileUrl) + '/' + obj.file);
                        sheetSubKeysMap[fileUrl] = Object.getOwnPropertyNames(obj.frames).join(',');
                    }
                }
            }catch(e)
            {
              console.log('json解析出错！文件名：',Path.basename(filePath));
            }
        }
    }
    //过滤掉sheet的图片
    for(let i in sheetList)
    {
        let index = fileList.indexOf(sheetList[i]);
        if(index >= 0)
        {
            fileList.splice(index, 1);
        }
    }
    //删除没有的文件配置
    for(let i=resObj.resources.length-1;i>=0;i--)
    {
        if(fileList.indexOf(resObj.resources[i].url) == -1)
        {
            resObj.resources.splice(i, 1);
        }
    }
    //添加新的文件配置
    for(let i in fileList)
    {
        let fileUrl = fileList[i];
        let isHas = false;
        for(let a in resObj.resources)
        {
            if(resObj.resources[a].url == fileUrl)
            {
                isHas = true;
                break;
            }
        }
        if(isHas == false)
        {
            let resItem = {};
            resItem.url = fileUrl;
            let extName = Path.extname(fileUrl).toLowerCase();
            resItem.type = _getEgretResType(extName);
            if(resItem.type == 'json')
            {
                let subkeys = sheetSubKeysMap[fileUrl];
                if(subkeys) {
                    resItem.type = 'sheet';
                    resItem.subkeys = subkeys;
                }
            }
            resItem.name = Path.basename(fileUrl).replace(/\./g,'_');
            resObj.resources.push(resItem);
        }
    }
}
function _getEgretResType(extName)
{
    switch(extName)
    {
        case '.jpg':
        case '.jpeg':
        case '.png':
        case '.gif':
            return 'image';
        case '.ttf':
        case '.ttc':
        case '.fon':
            return 'font';
        case '.mp3':
            return 'sound';
        case '.txt':
            return 'text';
        case '.json':
            return 'json';
        case '.xml':
            return 'xml';
    }
    return 'bin';
}