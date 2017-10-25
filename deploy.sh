gzfilename=$(find *.tar.gz)
tar -zxvf $gzfilename
filename="${gzfilename%.*}"
filename="${filename%.*}"
cd $filename
#files
sudo rm -Rf ../sites/default/files/
sudo mv -f files ../sites/default
chmod -R 774 ../sites/default/files
#modules
echo $(cat modules.txt) > singleLn.txt
modulelst=`more singleLn.txt`
#database
#drush -y sql-drop
#`drush sql-connect` < $filename.sql
drush -y en --resolve-dependencies $modulelst 
drush cr
cd ../
sudo rm -Rf $filename
echo "Complete"
