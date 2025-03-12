const config = {
    server: '172.17.10.162',    
    port: 1433,
    user: 'SKDRead',
    password: 'SKDReadPass',
    database: 'Orion_SKD',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustedConnection: true,
        enableArithAbort: false,
        trustServerCertificate: true,
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1'
        }
    }    
};

module.exports = {
    config
}