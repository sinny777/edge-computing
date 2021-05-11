
mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    var authDB = '$MONGO_INITDB_DATABASE';
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB(authDB);
    admin.auth(rootUser, rootPassword);

    db = db.getSiblingDB('$DB_NAME');
    var user = '$DB_USERNAME';
    var passwd = '$DB_PASSWORD';
    db.createUser({user: user, pwd: passwd, roles: ["readWrite"]});
EOF
