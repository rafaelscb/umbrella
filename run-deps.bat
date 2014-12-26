@echo off

:: CALCULATING DEPENDENCY for %1 app.

set deps=..\..\Tools\umdeps.exe
set app_dir=Work\%1
:: set res_dir=assets/
set res_dir=Global/
set base_dir_from_app_dir=..
set final=Global\deps.js

if "%2" == "" (
  set lang=multi
) else (
  set lang=%2
)

if not exist %app_dir% (
  echo "ERROR: Directory '%app_dir%' non-existent."
  goto :eof
)

if not exist work\%1\%res_dir% (
  echo "ERROR: Directory 'work\%1\%res_dir%' non-existent."
  goto :eof
)

if "%1" == "Demos" (
  set required_libs=Widgets Posters Utils Demos
) else (
  set required_libs=Widgets Posters Utils Sayings %1
)

pushd %app_dir%
%deps% %base_dir_from_app_dir% %res_dir% %lang% %required_libs% > %final%
popd

echo deps = %deps%
echo app_dir = %app_dir%
echo res_dir = %res_dir%
echo base_dir_from_app_dir = %base_dir_from_app_dir%
echo final = %final%
echo lang = %lang%
echo required_libs = %required_libs%

echo "OK: Dependency graph written to '%app_dir%\%final%'."

:eof
