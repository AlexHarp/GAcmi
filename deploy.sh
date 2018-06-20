gzfilename=$(find *.tar.gz)
tar -zxvf $gzfilename
filename="${gzfilename%.*}"
filename="${filename%.*}"
cd $filename
#files
sudo rm -Rf ../sites/default/files/
sudo mv -f files ../sites/default
chmod -R 774 ../sites/default/files
chown -R apache:apache ../sites/default/files/
#modules
echo $(cat modules.txt) > singleLn.txt
modulelst=`more singleLn.txt`
../vendor/bin/drush -y en --resolve-dependencies $modulelst 
#database
echo 'database drop'
../vendor/bin/drush -y sql-drop
echo 'datase base import'
`../vendor/bin/drush sql-connect` < $filename.sql
cd ../
vendor/bin/drush cr
#sudo rm -Rf $filename
echo "Complete"
