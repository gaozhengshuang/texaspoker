//公共库
const Gulp = require('gulp');
const GulpConcat = require('gulp-concat');
const GulpJsonMinify = require('gulp-json-minify');
const GulpZip = require('gulp-zip');
const Path = require('path');
const FS = require("fs");
const Htmlmin = require('htmlmin');
const GulpUtil = require('./plugins/gulp-util');
const GulpLang = require('./plugins/gulp-lang');
const GulpEgret = require('./plugins/gulp-egret');
//项目路径定义
const ProjectSrcPath = 'src';
const ProjectLibsPath = 'libs';
const ProjectResourcePath = 'resource';
const ProjectAssetsPath = Path.join(ProjectResourcePath, 'assets');
const ProjectConfigPath = Path.join(ProjectResourcePath, 'config');
const ProjectLangPath = Path.join(ProjectAssetsPath, 'lang');
const ProjectBinReleasePath = 'bin-release';
const ProjectBinPublishPath = 'bin-publish';
const ProjectMicroPath = 'micro';
//第三方扩展库的根路径
const LibsrcRootPath = '../libsrc';
//当前项目使用的第三方扩展库列表
const LibsrcNameList = ['jszip','BigInteger','base64','sproto','aes','hmacsha1','pakdh-client', 'particle', 'md5'];
//排除的配置表文件列表
const ExcludeConfigFileList = ['autoName.json','autoAction.json'];

//--------------------------------------------------------------
// bundle
//--------------------------------------------------------------

//构建自定义js库
Gulp.task('bundle', function()
{
    function getLibsrcPathList(suffix)
    {
        let list = [];
        for (let i=0;i<LibsrcNameList.length;i++)
        {
            let name = LibsrcNameList[i];
            list.push(Path.join(LibsrcRootPath, name, 'bin', name, name+suffix));
        }
        return list;
    }
    //js
    let list = getLibsrcPathList('.js');
    Gulp.src(list).pipe(GulpConcat('bundle.js')).pipe(Gulp.dest(ProjectLibsPath));
    //min.js
    list = getLibsrcPathList('.min.js');
    Gulp.src(list).pipe(GulpConcat('bundle.min.js')).pipe(Gulp.dest(ProjectLibsPath));
    //d.ts
    list = getLibsrcPathList('.d.ts');
    Gulp.src(list).pipe(GulpConcat('bundle.d.ts')).pipe(Gulp.dest(ProjectLibsPath));
});

//--------------------------------------------------------------
// config res zip
//--------------------------------------------------------------

//生成配置表文件列表文件，debug使用
Gulp.task('config-files', function()
{
    let files = FS.readdirSync(ProjectConfigPath);
    let outList = [];
    for(let i in files)
    {
        let file = files[i];
        if(Path.extname(file) == '.json')
        {
            outList.push(file);
        }
    }
    FS.writeFileSync(Path.join(ProjectConfigPath, 'files.txt'), outList);
    console.log('生成配置表文件列表文件');
});
//压缩配置表
Gulp.task('zip-config',function()
{
    console.log('压缩配置表和通信协议');
    Gulp.src(Path.join(ProjectConfigPath, '*.bin')).pipe(GulpZip('proto.zip')).pipe(Gulp.dest(ProjectConfigPath));
    let fileList = FS.readdirSync(ProjectConfigPath);
    let srcList = [];
    for(let file of fileList)
    {
        if(Path.extname(file) == '.json' && ExcludeConfigFileList.indexOf(file) < 0)
        {
            srcList.push(Path.join(ProjectConfigPath, file));
        }
    }
    return Gulp.src(srcList).pipe(GulpJsonMinify()).pipe(GulpZip('config.zip')).pipe(Gulp.dest(ProjectConfigPath));
});
//压缩语言文件
Gulp.task('zip-lang',function()
{
    if(FS.existsSync(ProjectLangPath))
    {
        let langList = FS.readdirSync(ProjectLangPath);
        for(let i in langList)
        {
            let langFile = Path.join(ProjectLangPath, langList[i]);
            if(FS.statSync(langFile).isDirectory() == false)
            {
                if(Path.extname(langFile) == '.json')
                {
                    let zipName = Path.basename(langFile, '.json') + '.zip';
                    Gulp.src(langFile).pipe(GulpJsonMinify()).pipe(GulpZip(zipName)).pipe(Gulp.dest(ProjectLangPath));
                }
            }
        }
        console.log('压缩语言文件');
    }
});
//default.res.json相关处理
Gulp.task('res-process',function()
{
    let path = Path.join(ProjectResourcePath, 'default.res.json');
    let resStr = FS.readFileSync(path).toString();
    let resObj = resStr ? JSON.parse(resStr) : null;
    if(resObj == null) {
        resObj = {};
    }
    if(resObj.resources == null) {
        resObj.resources = [];
    }
    //
    let resFiles = GulpUtil.getAllFilePath(ProjectAssetsPath).concat(GulpUtil.getAllFilePath(ProjectConfigPath,'.zip'));
    //添加资源文件到default.res.json
    GulpEgret.addResFilesToResJson(resFiles, resObj);
    //default.res.json 支持不同文件夹相同文件名
    GulpEgret.resSupportSameFileName(resObj);
    FS.writeFileSync(path, JSON.stringify(resObj, null, '\t'));
    console.log('default.res.json处理完成');
});
//处理配置表相关的发布
Gulp.task('zip', ['config-files', 'zip-config','zip-lang', 'res-process'], function() {
    console.log('全部压缩和处理完成');
});

//--------------------------------------------------------------
// web版发布优化
//--------------------------------------------------------------

function getHtmlManifestText(manifest, revObj)
{
    let scriptsString = '';
    let scripts = manifest.initial.concat(manifest.game);
    for(let i in scripts)
    {
        let path =  scripts[i];
        let revPath = revObj[path];
        if(revPath) {
            path = revPath;
        }
        scriptsString += (scriptsString?',':'') + "'" + path + "'";
    }
    let resString = revObj['resource/default.res.json'];
    if(resString == null)
    {
        resString = '';
    }
    let thmString = revObj['resource/default.thm.json'];
    if(thmString == null)
    {
        thmString = '';
    }
    let str = 'window.web_config_scripts = [' + scriptsString + '];\n';
    str += "window.web_config_defaultResJson = '"+ resString +"';\n";
    str += "window.web_config_defaultThmJson = '"+ thmString +"';\n";
    return str;
}
//index.html 版本处理并输出
function revIndexHtmlExport(srcPath, exportPath, manifestText)
{
    const WebConfigRegex = /\/\/----auto-web_config-start----[\s\S]*\/\/----auto-web_config-end----/;
    //
    let htmlContent = FS.readFileSync(srcPath).toString();
    htmlContent = htmlContent.replace(/^\uFEFF/, '');
    if(manifestText)
    {
        htmlContent = htmlContent.replace(WebConfigRegex, manifestText);
    }
    htmlContent = Htmlmin(htmlContent);
    FS.writeFileSync(exportPath, htmlContent);
}
//微端入口html 版本处理并修改
function revMicroHtmlModify(srcPath, manifestText, isClient)
{
    const WebConfigRegex = /\/\/----auto-web_config-start----[\s\S]*\/\/----auto-web_config-end----/;
    const ClientConfigRegex = /\/\/----auto-client_config-start----[\s\S]*\/\/----auto-client_config-end----/;
    //
    let htmlContent = FS.readFileSync(srcPath).toString();
    htmlContent = htmlContent.replace(/^\uFEFF/, '');
    if(manifestText)
    {
        if(isClient)
        {
            manifestText = manifestText.replace('window.web_config_scripts', 'var client_scripts');
            manifestText = manifestText.replace('window.web_config_defaultResJson', 'var client_defaultResJson');
            manifestText = manifestText.replace('window.web_config_defaultThmJson', 'var client_defaultThmJson');
            let replaceString = '//----auto-client_config-start----\n' + manifestText + '//----auto-client_config-end----';
            htmlContent = htmlContent.replace(ClientConfigRegex, replaceString);
        }
        else
        {
            let replaceString = '//----auto-web_config-start----\n' + manifestText + '//----auto-web_config-end----';
            htmlContent = htmlContent.replace(WebConfigRegex, replaceString);
        }
    }
    FS.writeFileSync(srcPath, htmlContent);
    return htmlContent;
}
//sheet 版本处理
function revSheetJson(resourcePath, assetsPath, revObj)
{
    let fileList = GulpUtil.getAllFilePath(assetsPath, '.json');
    for(let filePath of fileList)
    {
        let obj = JSON.parse(FS.readFileSync(filePath).toString());
        let relativeUrl = filePath.substring(resourcePath.length).replace(/\\/g,'/');//去掉resource/,并path转url
        if(relativeUrl[0] == '/')
        {
            relativeUrl = relativeUrl.substring(1);
        }
        let imgUrl = Path.dirname(relativeUrl) + '/' + obj.file;
        let revPath = revObj[imgUrl];
        if(revPath)
        {
            obj.file = Path.basename(revPath);
            FS.writeFileSync(filePath, JSON.stringify(obj));
        }
    }
}
//default.res.json版本处理
function revDefaultResJson(path, exportPath, revObj)
{
    let resJsonObj = JSON.parse(FS.readFileSync(path).toString());
    for(let i in resJsonObj.resources)
    {
        let resItem = resJsonObj.resources[i];
        let revPath = revObj[resItem.url];
        if(revPath)
        {
            resItem.url = revPath;
        }
    }
    FS.writeFileSync(exportPath, JSON.stringify(resJsonObj));
}
//web发布优化
require('gulp-awaitable-tasks')(Gulp);
Gulp.task('web', function*()
{
    let version = GulpUtil.getProcessArgs();
    if(version == null)
    {
        throw new Error('版本号不能为空');
    }
    console.log('获取版本号:' + version);
    //
    const EgretPropertiesPath = 'egretProperties.json';
    const Relative_BundleJsUrl = 'libs/bundle.min.js';
    const Relative_ModulesJsUrl = 'libs/modules.min.js';
    const Relative_MainJsUrl = 'libs/main.min.js';
    //获取根目录
    let egretProperties = JSON.parse(FS.readFileSync(EgretPropertiesPath).toString());
    const Release_RootPath = Path.join(egretProperties.publish.path, 'web', version);
    const Release_ResourcePath = Path.join(Release_RootPath, 'resource');
    const Release_LibsPath = Path.join(Release_RootPath, 'libs');
    const Release_ManifestPath = Path.join(Release_RootPath, 'manifest.json');
    const Release_RevPath = Path.join(Release_RootPath, 'rev');
    const Release_RevPath_Libs = Path.join(Release_RevPath, 'libs');
    const Release_RevPath_Resource = Path.join(Release_RevPath, 'resource');
    const Release_RevPath_Default = Path.join(Release_RevPath, 'default');
    const Release_AssetsPath = Path.join(Release_ResourcePath, 'assets');
    const Release_ConfigPath = Path.join(Release_ResourcePath, 'config');
    const Release_IconsPath = Path.join(Release_ResourcePath, 'icons');
    const Release_DefaultResJsonPath = Path.join(Release_ResourcePath, 'default.res.json');
    const Release_IndexHtmlPath = Path.join(Release_RootPath, 'index.html');
    console.log('获取根目录:' + Release_RootPath);

    // 发布文件优化 ====================

    //获取manifest.json
    let manifest = JSON.parse(FS.readFileSync(Release_ManifestPath).toString());
    const Release_MainJsPath = Path.join(Release_RootPath, 'main.min.js');
    if(FS.existsSync(Release_MainJsPath))
    {
        FS.renameSync(Release_MainJsPath, Path.join(Release_LibsPath, 'main.min.js'));
        manifest.game[0] = Relative_MainJsUrl;
        FS.writeFileSync(Release_ManifestPath, JSON.stringify(manifest));
        console.log('移动main.min.js到libs');
    }
    if(manifest.initial.indexOf(Relative_ModulesJsUrl) == -1)
    {
        //合并优化js库(排除bundle)
        let bundleIndex = manifest.initial.indexOf(Relative_BundleJsUrl);
        manifest.initial.splice(bundleIndex, 1);
        GulpUtil.mergeTextFiles(Release_RootPath, manifest.initial, Relative_ModulesJsUrl);
        //重写manifest.json
        manifest.initial = [Relative_ModulesJsUrl, Relative_BundleJsUrl];
        FS.writeFileSync(Release_ManifestPath, JSON.stringify(manifest));
        console.log('合并优化js库');
    }
    //
    //删除没用的目录列表和文件
    GulpUtil.deleteFiles(Release_ConfigPath, '.json');
    console.log('删除没用的配置表json文件');
    GulpUtil.deleteFile(Path.join(Release_ConfigPath, 'files.txt'));
    console.log('删除debug用的files.txt文件');
    GulpUtil.deleteFiles(Release_ConfigPath, '.bin');
    console.log('删除没用的协议bin文件');
    GulpUtil.deleteFiles(Path.join(Release_AssetsPath, 'lang'), '.json');
    console.log('删除没用的语言json文件');
    const delDirList = [Path.join(Release_RootPath, 'promise'), Path.join(Release_LibsPath, 'modules'), Path.join(Release_ResourcePath, 'images'), Path.join(Release_ResourcePath, 'eui_skins'), Path.join(Release_ResourcePath, 'skins')];
    GulpUtil.deleteDirectoryList(delDirList, (path)=>{
        console.log('删除没用的路径:' + path);
    });

    // 版本处理 ====================

    const GulpRev = require('gulp-rev');
    const GulpImageMin = require('gulp-imagemin');
    //
    const RevManifestFileName = 'rev-manifest.json';
    const Publish_RootPath = Path.join(ProjectBinPublishPath, 'web', version);
    const Publish_ResourcePath = Path.join(Publish_RootPath, 'resource');
    const Publish_DefaultResJsonPath = Path.join(Publish_ResourcePath, 'default.res.json');
    const Publish_IndexHtmlPath = Path.join(Publish_RootPath, 'index.html');
    const Publish_ManifestTxtPath = Path.join(Publish_RootPath, 'manifest.txt');
    const Publish_AssetsPath = Path.join(Publish_ResourcePath, 'assets');
    //
    //清空rev和PublishRootPath
    GulpUtil.deleteDirectory(Release_RevPath);
    GulpUtil.deleteDirectory(Publish_RootPath);
    //版本处理
    let srcList = [Path.join(Release_ResourcePath, '!(default.res)*.json'), Path.join(Release_LibsPath, '**/*.js')];
    yield Gulp.src(srcList, {base:Release_RootPath}).pipe(GulpRev()).pipe(Gulp.dest(Publish_RootPath)).pipe(GulpRev.manifest()).pipe(Gulp.dest(Release_RevPath_Libs));
    srcList = [Path.join(Release_ConfigPath, '*.*'), Path.join(Release_AssetsPath, '**/*.*')];
    yield Gulp.src(srcList, {base:Release_ResourcePath}).pipe(GulpImageMin()).pipe(GulpRev()).pipe(Gulp.dest(Publish_ResourcePath)).pipe(GulpRev.manifest()).pipe(Gulp.dest(Release_RevPath_Resource));
    //
    let revObj = JSON.parse(FS.readFileSync(Path.join(Release_RevPath_Resource, RevManifestFileName)).toString());
    //default.res.json 版本处理
    revDefaultResJson(Release_DefaultResJsonPath, Publish_DefaultResJsonPath, revObj);
    yield Gulp.src(Publish_DefaultResJsonPath, {base:Publish_RootPath}).pipe(GulpRev()).pipe(Gulp.dest(Publish_RootPath)).pipe(GulpRev.manifest()).pipe(Gulp.dest(Release_RevPath_Default));
    GulpUtil.deleteFile(Publish_DefaultResJsonPath);
    //sheet 版本处理
    revSheetJson(Publish_ResourcePath, Publish_AssetsPath, revObj);
    //读取版本文件
    revObj = JSON.parse(FS.readFileSync(Path.join(Release_RevPath_Libs, RevManifestFileName)).toString());
    let tempObj = JSON.parse(FS.readFileSync(Path.join(Release_RevPath_Default, RevManifestFileName)).toString());
    GulpUtil.mergeObjectTo(tempObj, revObj);
    //获取html修改内容
    let manifestText = getHtmlManifestText(manifest, revObj);
    //写入修改内容到manifest.txt
    FS.writeFileSync(Publish_ManifestTxtPath, manifestText);
    //index.html 版本处理
    revIndexHtmlExport(Release_IndexHtmlPath, Publish_IndexHtmlPath, manifestText);
    console.log('版本处理完成');
    //复制需要的文件
    Gulp.src(Path.join(Release_IconsPath,'*.*'),{base:Release_ResourcePath}).pipe(GulpImageMin()).pipe(Gulp.dest(Publish_ResourcePath));
    Gulp.src(Path.join(Release_RootPath, '*.{ico,jpg,png,gif}')).pipe(Gulp.dest(Publish_RootPath));
    Gulp.src(Path.join(Release_ResourcePath, '*.{jpg,png,gif}')).pipe(GulpImageMin()).pipe(Gulp.dest(Publish_ResourcePath));
    Gulp.src(Path.join(Release_ResourcePath, '*.html')).pipe(Gulp.dest(Publish_ResourcePath));
    console.log('发布优化完成:' + Publish_RootPath);
});
//web发布优化-配置表
Gulp.task('web-config', function*()
{
    let version = GulpUtil.getProcessArgs();
    if(version == null)
    {
        throw new Error('版本号不能为空');
    }
    console.log('获取版本号:' + version);
    //
    const EgretPropertiesPath = 'egretProperties.json';
    let egretProperties = JSON.parse(FS.readFileSync(EgretPropertiesPath).toString());
    const Release_RootPath = Path.join(egretProperties.publish.path, 'web', version);
    const Release_ManifestPath = Path.join(Release_RootPath, 'manifest.json');
    const Release_ResourcePath = Path.join(Release_RootPath, 'resource');
    const Release_ConfigPath = Path.join(Release_ResourcePath, 'config');
    const Release_DefaultResJsonPath = Path.join(Release_ResourcePath, 'default.res.json');
    const Release_RevPath = Path.join(Release_RootPath, 'rev');
    const Release_RevPath_Config = Path.join(Release_RevPath, 'config');
    const Release_RevPath_Default = Path.join(Release_RevPath, 'default');
    const Release_RevPath_Libs = Path.join(Release_RevPath, 'libs');
    const Release_IndexHtmlPath = Path.join(Release_RootPath, 'index.html');
    //
    GulpUtil.copyFiles(ProjectConfigPath, Release_ConfigPath, '.zip');
    //版本管理
    const RevManifestFileName = 'rev-manifest.json';
    const GulpRev = require('gulp-rev');
    const Publish_RootPath = Path.join(ProjectBinPublishPath, 'web', version);
    const Publish_ResourcePath = Path.join(Publish_RootPath, 'resource');
    const Publish_DefaultResJsonPath = Path.join(Publish_ResourcePath, 'default.res.json');
    const Publish_ManifestTxtPath = Path.join(Publish_RootPath, 'manifest.txt');
    const Publish_IndexHtmlPath = Path.join(Publish_RootPath, 'index.html');
    //
    yield Gulp.src(Path.join(Release_ConfigPath, '*.*'), {base:Release_ResourcePath}).pipe(GulpRev()).pipe(Gulp.dest(Publish_ResourcePath)).pipe(GulpRev.manifest()).pipe(Gulp.dest(Release_RevPath_Config));
    let revObj = JSON.parse(FS.readFileSync(Path.join(Release_RevPath_Config, RevManifestFileName)).toString());
    revDefaultResJson(Release_DefaultResJsonPath, Publish_DefaultResJsonPath, revObj);
    yield Gulp.src(Publish_DefaultResJsonPath, {base:Publish_RootPath}).pipe(GulpRev()).pipe(Gulp.dest(Publish_RootPath)).pipe(GulpRev.manifest()).pipe(Gulp.dest(Release_RevPath_Default));
    GulpUtil.deleteFile(Publish_DefaultResJsonPath);
    //读取版本文件
    revObj = JSON.parse(FS.readFileSync(Path.join(Release_RevPath_Libs, RevManifestFileName)).toString());
    let tempObj = JSON.parse(FS.readFileSync(Path.join(Release_RevPath_Default, RevManifestFileName)).toString());
    GulpUtil.mergeObjectTo(tempObj, revObj);
    //获取manifest.json
    let manifest = JSON.parse(FS.readFileSync(Release_ManifestPath).toString());
    //获取html修改内容
    let manifestText = getHtmlManifestText(manifest, revObj);
    //写入修改内容到manifest.txt
    FS.writeFileSync(Publish_ManifestTxtPath, manifestText);
    //index.html 版本处理
    revIndexHtmlExport(Release_IndexHtmlPath, Publish_IndexHtmlPath, manifestText);
    console.log('config版本处理完成');
});

//--------------------------------------------------------------
// lang
//--------------------------------------------------------------

//抽取语言映射(繁体:zh-tw,英文:en,日语:ja,韩语:ko)
Gulp.task('lang',function()
{
    let lang = GulpUtil.getProcessArgs();
    if(lang == null)
    {
        throw new Error('语言不能为空');
    }
    const paths = [ProjectSrcPath,ProjectConfigPath];
    const suffixs = ['.ts', '.json', '.txt', '.xml'];
    const filterKeywords = ['console.', 'qin.Console.', 'egret.log'];
    const filterPaths = [ProjectConfigPath+'/name.json', ProjectConfigPath+'/forbidden.json'];
    //
    const langFile = Path.join(ProjectLangPath, lang + '.json');
    let origLangs;
    if(FS.existsSync(langFile))
    {
        origLangs = JSON.parse(FS.readFileSync(langFile).toString());
    }
    let langArray = GulpLang.extractLang(paths, suffixs, filterPaths, filterKeywords, origLangs);
    GulpUtil.createDirectory(ProjectLangPath);
    FS.writeFileSync(langFile, JSON.stringify(langArray, null, '\t'));
});

//--------------------------------------------------------------
// micro
//--------------------------------------------------------------

function exportMicroHtml(bid, manifestText, isClient, srcDir, exportDir)
{
    let fileName = bid + '.html';
    let srcPath = Path.join(srcDir, fileName);
    let exportPath = Path.join(exportDir, fileName);
    let htmlContent = revMicroHtmlModify(srcPath, manifestText, isClient);
    htmlContent = Htmlmin(htmlContent);
    FS.writeFileSync(exportPath, htmlContent);
    console.log('micro输出：' + exportPath);
}
function parseMicroHtml(isClient)
{
    let args = GulpUtil.getProcessArgsList();
    if(!args || args.length != 2)
    {
        console.log('请输入包id和版本号');
        return ;
    }
    let bid = args[0];
    let version = args[1];
    const ExportDirectory = Path.join(ProjectBinPublishPath,'web', version);
    if(!FS.existsSync(ExportDirectory))
    {
        console.log('版本号：'+ version + ' 的web发布目录不存在');
        return ;
    }
    let mTxtPath = Path.join(ExportDirectory,'manifest.txt');
    let manifestText = '';
    if(FS.existsSync(mTxtPath))
    {
        manifestText = FS.readFileSync(mTxtPath).toString();
    }
    if(isClient == false && bid == 'all')
    {
        let suffix = '.html';
        let fileList = FS.readdirSync(ProjectMicroPath);
        fileList.forEach(function(file)
        {
            let name = Path.basename(file, suffix);
            if(name != 'template' && Path.extname(file) == suffix)
            {
                exportMicroHtml(name, manifestText, isClient, ProjectMicroPath, ExportDirectory);
            }
        }, this);
    }
    else
    {
        exportMicroHtml(bid, manifestText, isClient, ProjectMicroPath, ExportDirectory);
    }
}
//更新模式:压缩输出微端入口文件到web发布目录
Gulp.task('micro-update',function()
{
    parseMicroHtml(false);
});
//安装包模式:压缩输出微端入口文件到web发布目录
Gulp.task('micro-client',function()
{
    parseMicroHtml(true);
});

//--------------------------------------------------------------
// code
//--------------------------------------------------------------

//格式化代码
Gulp.task( 'format-code', function ()
{
    console.log( '格式化代码去除注释' );
    let result = FS.readFileSync( Path.join( ProjectResourcePath, 'result.txt' ), 'utf-8' );
    let end = deleteCodeComments( result );
    // console.log( end );
    FS.writeFileSync( Path.join( ProjectResourcePath, 'result_end.txt' ), end );
});
function deleteCodeComments( code )
{
    // 以下的两种方式都可以  // sodino.com
    //    var reg1 = /\/\/.*/g;
    //    var reg2 = /\/\*[\s\S]*?\*\//g;
    var reg = /(\/\/.*)|(\/\*[\s\S]*?\*\/)/g;
    var result = code.replace( reg, '' );
    // reg = /^\\s*\\n/g;
    // result = result.replace(reg, '' );
    return result;
}