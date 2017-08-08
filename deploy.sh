gzfilename=$(find *.tar.gz)
tar -zxvf $gzfilename
filename="${gzfilename%.*}"
filename="${filename%.*}"
cd $filename
#files
sudo rm -Rf ../sites/default/files/
sudo mv -f files ../sites/default
#modules
echo $(cat modules.txt) > singleLn.txt
modulelst=`more singleLn.txt`
#database
drush -y en --resolve-dependencies $modulelst 
drush -y sql-drop
`drush sql-connect` < $filename.sql
drush cr
cd ../
sudo rm -Rf $filename
echo "Complete"
