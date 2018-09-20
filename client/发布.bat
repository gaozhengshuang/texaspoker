@echo off
set /p VERSIONCODE=Please input version:
egret build -e %cd%\ && egret publish --version %VERSIONCODE% %cd%\ && gulp publish --version %VERSIONCODE%