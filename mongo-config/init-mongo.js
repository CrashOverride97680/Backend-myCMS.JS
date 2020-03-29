db.createUser({
    user: 'rootcms',
    pwd: 'secretpwd',
    roles: [{
      role: 'readWrite',
      db: 'cms'
    }]
});