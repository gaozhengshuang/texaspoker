del /s /q /a .\protobuf\protofile\
del /s /q /a .\src\core\table\
@echo off
for /r "..\protocol\" %%a in (*.proto) do (copy "%%a" ".\protobuf\protofile\")
for /r "..\docs\tbl\" %%a in (*.proto) do (copy "%%a" ".\protobuf\protofile\")
for /r "..\docs\tbl\" %%a in (*.lua) do (copy "%%a" ".\src\core\table\")
ren .\src\core\table\*.lua *.ts
pb-egret generate
pause