#!/bin/zsh

# IMPORT AND EXPORT OF MONGODB ATLAS
env=$(cd .. && cd .. && pwd | xargs -I{}  echo "{}/.env" )
data=$(cat $env | xargs | tr ' ' '\n')
user=$(echo $data | grep 'DB_PROD' | ggrep -Po '(?<=//)(.*?)(?=:)')
pass=$(echo $data | grep 'DB_PROD' | ggrep -Po '(?<=://)(.*?)(?=@)' | grep -Eo ':.+' | tr -d ':')
cluster=$(echo $data | grep 'DB_PROD' | ggrep -Po '(?<=@)(.*?)(?=\.)')
eDatabase=$(echo $data | grep 'DB_PROD' | ggrep -Po '(?<=/)(.*?)(?=\?)' | sed 's/.*\///')
iDatabase=''

#TEST PRINTING DATA
echo "mongosh 'mongodb+srv://$cluster.doklzqy.mongodb.net/$eDatabase' --apiVersion 1 --username $user --password $pass"

# CONNECT CLI DB
#mongosh 'mongodb+srv://$cluster.doklzqy.mongodb.net/$eDatabase' --apiVersion 1 --username $user --password $pass

# EXPORT
# mongodump --uri="mongodb+srv://$cluster.doklzqy.mongodb.net/" -d $eDatabase -u $user -p $pass -o ~/Desktop

# IMPORT
# mongorestore --uri="mongodb+srv://$cluster.doklzqy.mongodb.net/" -d $iDatabase -u $user -p $pass ~/Desktop/$eDatabase