@echo off
set /p VERSIONCODE=Please input version:
set /p BUNDLE=Please input bundle:
egret build -e %cd%\ && egret publish --version %VERSIONCODE% %cd%\ && gulp publish --version %VERSIONCODE% --bundle %BUNDLE%