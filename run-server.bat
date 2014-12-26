@echo off

:: STARTING SERVER
::
:: This script starts the %1|demos app.
:: Remove the last line of this script to not load the
:: browser.

if "%1" == "" (
  set app=Demos
) else (
  set app=%1
)
set server=tools\umserver.exe
set name=localhost
set port=8080
set document_root=Work
set cgi_interpreter=Tools\php\php-cgi.exe

start /B %server% %document_root% %port% %cgi_interpreter%
start http://%name%:%port%/%app%