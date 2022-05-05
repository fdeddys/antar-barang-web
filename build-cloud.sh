echo "build"
ng build --configuration cloud

cd dist

echo "zip"
zip -r antar-web.zip antar-web/

echo "ssh"
sshpass -p "" scp  @:/root

echo "done"