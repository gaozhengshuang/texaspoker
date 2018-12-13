var client = require('scp2');
var moment = require('moment');
var path = require('path');
var pcs = require('child_process');
var rimraf = require('rimraf');
var async = require('async');
var Client = require('ssh2').Client;
var gulp = require('gulp');
var ftp = require('gulp-ftp');
var version = process.argv[4];
var out_path = `bin-release/web/${version}/**/*`;
gulp.task('rm-rf', function (cb) {
    console.log('开始删除旧版本 ' + moment().format('YYYY-MM-DD hh:mm:ss'));
    let conn = new Client(); 
    conn.on('ready', function () {
        console.log('sftp 连接成功');
        conn.exec('rm -rf /var/www/html/poker/cn/*', function (err, stream) {
            if (err) {
                cb(err);
            }
            stream.on('close', function (code, signal) {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
                cb();
            }).on('data', function (data) {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', function (data) {
                console.log('STDERR: ' + data);
            });
        });
    }).connect({
        host: '210.73.214.68',
        port: 22,
        username: 'zhangmaodong',
        password: 'zhangqazwsx'
    });
});
gulp.task('upload', function (cb) {
    return gulp.src(out_path)
        .pipe(ftp({
            host: '210.73.214.68',
            port: 21,
            user: 'zhangmaodong',
            pass: 'zhangqazwsx',
            remotePath: "html/poker/cn/"
        }));
});

