#!/bin/bash
#报错就停止
#set -e

##编译新版本
./build.py

##拷贝文件
mkdir -p ./release
mkdir -p ./pack
rm -rf release/*
mkdir -p ./release/conf
mkdir -p ./release/bin
mkdir -p ./release/tbl/excel
mkdir -p ./release/tbl/json
mkdir -p ./release/cert
mkdir -p ./release/sql

cp -v gateserver/gateserver ./release/bin/
cp -v loginserver/loginserver ./release/bin/
cp -v matchserver/matchserver ./release/bin/
cp -v roomserver/roomserver ./release/bin/
cp -v watch.sh ./release/
cp -v runserver.sh ./release/
cp -v version.txt ./release/

cp -r conf/* ./release/conf/
cp -r tbl/excel/* ./release/tbl/excel
cp -r tbl/json/* ./release/tbl/json
cp -r cert/* ./release/cert/
cp -r sql/* ./release/sql/
find ./release/conf/ -iname "*.example" | xargs rm -f

filename=webgame-release-`date +%Y%m%d%H%M`.`uname -m`.tar.gz
tar -czvf pack/$filename ./release/
today=`date +%Y%m%d`


cmd=$1
case $cmd in

test)
## 测试环境
echo "测试环境版本生成中..."
wainum=$(ssh poker@210.73.214.74 "ls -d -l /home/poker/version/${today}R* | wc -l")
wainum=$((wainum + 1))
waibuildDirName=${today}R${wainum}_PP
echo $waibuildDirName

ssh poker@210.73.214.74 "mkdir -p /home/poker/version/${waibuildDirName}"
scp pack/$filename poker@210.73.214.74:/home/poker/version/${waibuildDirName}
ssh poker@210.73.214.74 "cd /home/poker/version/${waibuildDirName}/ && tar xzvf *.tar.gz"
ssh poker@210.73.214.74 "rm /home/poker/version/${waibuildDirName}/release/conf -rf"
ssh poker@210.73.214.74 "cp /home/poker/version/config/conf /home/poker/version/${waibuildDirName}/release/ -rvf"
ssh poker@210.73.214.74 "cp /home/poker/version/config/runserver.sh /home/poker/version/${waibuildDirName}/release/ -rvf"
ssh poker@210.73.214.74 "cp /home/poker/version/config/watch.sh /home/poker/version/${waibuildDirName}/release/ -rvf"
ssh poker@210.73.214.74 "cp /home/poker/version/config/tbl /home/poker/version/${waibuildDirName}/release/ -rvf"
;;

banshu)
## 版署版本
wainum=$(ssh poker@210.73.214.68 "ls -d -l /home/poker/version/${today}R* | wc -l")
wainum=$((wainum + 1))
waibuildDirName=${today}R${wainum}_PP
echo $waibuildDirName

echo "版署版本版本生成中..."
ssh brickbanshu@210.73.214.68 "mkdir -p /home/brickbanshu/version/${waibuildDirName}"
scp pack/$filename brickbanshu@210.73.214.68:/home/brickbanshu/version/${waibuildDirName}
ssh brickbanshu@210.73.214.68 "cd /home/brickbanshu/version/${waibuildDirName}/ && tar xzvf *.tar.gz"
ssh brickbanshu@210.73.214.68 "rm /home/brickbanshu/version/${waibuildDirName}/release/conf -rf"
ssh brickbanshu@210.73.214.68 "cp /home/brickbanshu/version/config/conf /home/brickbanshu/version/${waibuildDirName}/release/ -rvf"
ssh brickbanshu@210.73.214.68 "cp /home/brickbanshu/version/config/runserver.sh /home/brickbanshu/version/${waibuildDirName}/release/ -rvf"
ssh brickbanshu@210.73.214.68 "cp /home/brickbanshu/version/config/watch.sh /home/brickbanshu/version/${waibuildDirName}/release/ -rvf"
;;

release)
## 正式环境版本
wainum=$(ssh poker@210.73.214.74 "ls -d -l /home/poker/version/${today}R* | wc -l")
wainum=$((wainum + 1))
waibuildDirName=${today}R${wainum}_PP
echo $waibuildDirName

echo "正式环境版本生成中..."
ssh poker@210.73.214.74 "mkdir -p /home/poker/version/${waibuildDirName}"
scp pack/$filename poker@210.73.214.74:/home/poker/version/${waibuildDirName}
ssh poker@210.73.214.74 "cd /home/poker/version/${waibuildDirName}/ && tar xzvf *.tar.gz"
ssh poker@210.73.214.74 "rm /home/poker/version/${waibuildDirName}/release/conf -rf"
ssh poker@210.73.214.74 "cp /home/poker/version/config/conf /home/poker/version/${waibuildDirName}/release/ -rvf"
ssh poker@210.73.214.74 "cp /home/poker/version/config/runserver.sh /home/poker/version/${waibuildDirName}/release/ -rvf"
ssh poker@210.73.214.74 "cp /home/poker/version/config/watch.sh /home/poker/version/${waibuildDirName}/release/ -rvf"

#ssh poker@210.73.214.68 "scp -r /home/poker/version/${waibuildDirName} poker@210.73.214.71:/home/poker/version/"
#ssh poker@210.73.214.68 "scp -r /home/poker/version/${waibuildDirName} poker@210.73.214.76:/home/poker/version/"
#ssh poker@210.73.214.68 "scp -r /home/poker/version/${waibuildDirName} poker@210.73.214.77:/home/poker/version/"
;;

esac
