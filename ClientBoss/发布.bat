@echo off
set /p VERSIONCODE=Please input version:
egret publish --version %VERSIONCODE% %cd%\ && gulp publish --version %VERSIONCODE%