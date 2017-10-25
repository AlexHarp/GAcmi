##database
export PATH="/home/ec2-user/.composer/vendor/bin:$PATH"
DATE=`date +%Y-%m-%d`
FILENAME=prod$DATE
cd /var/www/html
mkdir $FILENAME
cd $FILENAME
drush sql-dump > $FILENAME".sql"
##modules
drush pm-list --type=module --status=enabled --pipe > modules.txt
##files
cp -R ../sites/default/files .
cd ../
tar -czf $FILENAME".tar.gz" $FILENAME
rm -Rf $FILENAME
##aws s3api put-object --bucket cmi-backup --key $FILENAME".tar.gz" --body ./$FILENAME".tar.gz" --server-side-encryption AES256
##rm -Rf $FILENAME".tar.gz"
