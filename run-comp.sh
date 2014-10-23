# COMPILING $1 app.

compiler=tools/umcomp
app=${1:-demos.hello}
main_path=work/${app//.//}/main.js
lang=${2:-multi}
if [ "$lang" == "multi" ]; then
  out_js=results/${app}.js
else
  out_js=results/${app}.${lang}.js
fi
out_css=results/${app}.css

res_path=assets/`echo $app | cut -d'.' -f1`/

if [ ! -s "$main_path" ]; then
  echo "ERROR: Directory '$main_path' non-existent."
  exit 1
fi

$compiler $main_path $lang $res_path -out_js $out_js -out_css $out_css

echo "OK: Results written to '$out_js' and '$out_css'."
