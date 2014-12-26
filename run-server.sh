# STARTING SERVER
#
# This script starts the $1|demos app.
# Remove the last line of this script to not load the
# browser.

app=${1:-Demos}
server=Tools/umserver
name=localhost
port=8080
document_root=Work
cgi_interpreter=Tools/php-cgi

$server $document_root $port $cgi_interpreter &
xdg-open "http://localhost:$port/$app"
