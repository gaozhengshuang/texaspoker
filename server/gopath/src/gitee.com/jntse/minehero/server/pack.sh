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
find ./release/conf/ -iname "*.example" | xargs rm -f

filename=webgame-release-`date +%Y%m%d%H%M`.`uname -m`.tar.gz
tar -czvf pack/$filename ./release/
today=`date +%Y%m%d`


cmd=$1
case $cmd in

test)
## 测试环境
echo "测试环境版本生成中..."
wainum=$(ssh brickcrush@210.73.214.74 "ls -d -l /home/brickcrush/version/${today}R* | wc -l")
wainum=$((wainum + 1))
waibuildDirName=${today}R${wainum}_PP
echo $waibuildDirName

ssh brickcrush@210.73.214.74 "mkdir -p /home/brickcrush/version/${waibuildDirName}"
scp pack/$filename brickcrush@210.73.214.74:/home/brickcrush/version/${waibuildDirName}
ssh brickcrush@210.73.214.74 "cd /home/brickcrush/version/${waibuildDirName}/ && tar xzvf *.tar.gz"
ssh brickcrush@210.73.214.74 "rm /home/brickcrush/version/${waibuildDirName}/release/conf -rf"
ssh brickcrush@210.73.214.74 "cp /home/brickcrush/version/config/conf /home/brickcrush/version/${waibuildDirName}/release/ -rvf"
ssh brickcrush@210.73.214.74 "cp /home/brickcrush/version/config/runserver.sh /home/brickcrush/version/${waibuildDirName}/release/ -rvf"
ssh brickcrush@210.73.214.74 "cp /home/brickcrush/version/config/watch.sh /home/brickcrush/version/${waibuildDirName}/release/ -rvf"
ssh brickcrush@210.73.214.74 "cp /home/brickcrush/version/config/tbl /home/brickcrush/version/${waibuildDirName}/release/ -rvf"
;;

banshu)
## 版署版本
wainum=$(ssh brickcrush@210.73.214.68 "ls -d -l /home/brickcrush/version/${today}R* | wc -l")
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
wainum=$(ssh brickcrush@210.73.214.71 "ls -d -l /home/brickcrush/version/${today}R* | wc -l")
wainum=$((wainum + 1))
waibuildDirName=${today}R${wainum}_PP
echo $waibuildDirName

echo "正式环境版本生成中..."
ssh brickcrush@210.73.214.71 "mkdir -p /home/brickcrush/version/${waibuildDirName}"
scp pack/$filename brickcrush@210.73.214.71:/home/brickcrush/version/${waibuildDirName}
ssh brickcrush@210.73.214.71 "cd /home/brickcrush/version/${waibuildDirName}/ && tar xzvf *.tar.gz"
ssh brickcrush@210.73.214.71 "rm /home/brickcrush/version/${waibuildDirName}/release/conf -rf"
ssh brickcrush@210.73.214.71 "cp /home/brickcrush/version/config/conf /home/brickcrush/version/${waibuildDirName}/release/ -rvf"
ssh brickcrush@210.73.214.71 "cp /home/brickcrush/version/config/runserver.sh /home/brickcrush/version/${waibuildDirName}/release/ -rvf"
ssh brickcrush@210.73.214.71 "cp /home/brickcrush/version/config/watch.sh /home/brickcrush/version/${waibuildDirName}/release/ -rvf"

#ssh brickcrush@210.73.214.68 "scp -r /home/brickcrush/version/${waibuildDirName} brickcrush@210.73.214.71:/home/brickcrush/version/"
#ssh brickcrush@210.73.214.68 "scp -r /home/brickcrush/version/${waibuildDirName} brickcrush@210.73.214.76:/home/brickcrush/version/"
#ssh brickcrush@210.73.214.68 "scp -r /home/brickcrush/version/${waibuildDirName} brickcrush@210.73.214.77:/home/brickcrush/version/"
;;

esac
