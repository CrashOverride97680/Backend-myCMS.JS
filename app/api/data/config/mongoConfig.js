// IMPORT MODULES NODEJS
    const mongoose = require('mongoose');
    const dbURL = 'mongodb://mongo:27017';
// EXPORTING MODULE MONGO
module.exports = () => 
{
    mongoose.connect(dbURL, 
        { 
            useUnifiedTopology: true, 
            useNewUrlParser: true, 
            useCreateIndex: true,
            user: 'root',
            pass: 'secret',
            dbName: 'cms' 
        }
    );
    mongoose.connection.on('connected', () =>
    {
        console.log('Mongoose default connection is open to:', dbURL);
    });
    mongoose.connection.on('error', err =>
    {
        console.log('Mongoose default connection has occured:' + err);
    });
 
    mongoose.connection.on('disconnected', () =>
    {
        console.log('Mongoose default connection is disconnected');
    });
 
    process.on('SIGINT', () =>
    {
        mongoose.connection.close(() =>
        {
            console.log('Mongoose default connection is disconnected due to application termination.');
            process.exit(0)
        });
    });

    process.on('SIGTERM', () =>
    {
        mongoose.connection.close(() =>
        {
          console.log('Mongoose disconnected through app termination (sigterm)');
          process.exit(0);
        });
    });
    
    process.once('SIGUSR2', () =>
    {
        mongoose.connection.close(() =>
        {
          console.log('Mongoose disconnected through app termination (sigusr2)');
          process.kill(process.pid, 'SIGUSR2');
        });
    });

    require('../model-schema/modelSchema');
};