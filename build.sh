echo "build"
ng build --prod

cd dist

echo "zip"
zip -r antar.zip antar/

echo "done"
