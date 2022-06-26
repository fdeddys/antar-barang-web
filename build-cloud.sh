echo "build"
ng build --configuration cloud

cd dist

echo "zip"
zip -r antar.zip antar/

echo "ssh"
sshpass -p "3menuindonesia" scp antar.zip root@156.67.214.228:/root

echo "done"