# agabus

# add server/database/dbconfig.js
```js
const config = {
    server: 'add server',    
    port: 1433,
    user: 'add User',
    password: 'add Password',
    database: 'add Database',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustedConnection: true,
        enableArithAbort: false,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        }
    }    
};

module.exports = {
    config
}
```