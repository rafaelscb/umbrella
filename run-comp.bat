@echo off

:: COMPILING %1 app.

set compiler=tools\umcomp.exe
if "%1" == "" (
  set app=Demos.Hello
) else (
  set app=%1
)
if "%2" == "" (
  set lang=multi
) else (
  set lang=%2
)
set main_path=work\%app:.=/%\Main.js
if "%lang%" == "multi" (
  set out_js=Results\%app%.js
) else (
  set out_js=Results\%app%.%lang%.js
)
set out_css=Results\%app%.css
for /f "delims=." %%a in ("%app%") do (
  set res_path=Global/%%a/
  goto :break
)
:break

if not exist %main_path% (
  echo "ERROR: Directory '%main_path%' non-existent."
  goto :eof
)

%compiler% %main_path% %lang% %res_path% -out_js %out_js% -out_css %out_css%

echo OK: Results written to '%out_js%' and '%out_css%'.

:eof
