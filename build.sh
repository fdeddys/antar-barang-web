echo "build"
ng build --prod

cd dist

echo "zip"
zip -r antar-web.zip antar-web/

echo "done"
