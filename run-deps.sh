# CALCULATING DEPENDENCY for $1 app.

deps=../../tools/umdeps
app_dir=work/$1
#res_dir=assets/
res_dir=global
base_dir_from_app_dir=..
final=global/deps.js
lang=${2:-multi}

if [ ! -d "$app_dir" ]; then
  echo "ERROR: Directory '$app_dir' non-existent."
  exit 1
fi

if [ ! -d "work/$1/$res_dir" ]; then
  echo "ERROR: Directory 'work/$1/$res_dir' non-existent."
  exit 1
fi

case "$1" in
  "demos") required_libs="widgets posters utils demos";;
        *) required_libs="widgets posters utils sayings $1";;
esac

pushd $app_dir
$deps $base_dir_from_app_dir $res_dir $lang $required_libs > $final
popd

echo "OK: Dependency graph written to '$app_dir/$final'."
