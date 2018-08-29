const Hosts = require('./hosting');
const argv = require('minimist')(process.argv.splice(2), {
    boolean: true
});

const DEFAULT_PORT = 9000;
const DEFAULT_SECRET_KEY = 'PwC,Bangalore';
const DEFAULT_HTTPS_OPTION = false;
const DEFAULT_CERT_FILE = 'cert.pem';
const DEFAULT_KEY_FILE = 'key.pem';
const DEFAULT_AUTH_OPTION = false;
const DEFAULT_LOG_OPTION = 'tiny';

const portNumber = argv['port-number'] || DEFAULT_PORT;
const globalSecretKey = argv['global-secret'] || DEFAULT_SECRET_KEY;
const isHttpsEnabled = argv['enable-https'] || DEFAULT_HTTPS_OPTION;
const keyFile = argv['key-file'] || DEFAULT_KEY_FILE;
const certificateFile = argv['cert-file'] || DEFAULT_CERT_FILE;
const sslPassPhrase = argv['ssl-passphrase'];
const isAuthenticationEnabled = argv['enable-jwt-auth'] || DEFAULT_AUTH_OPTION;
const logOption = argv['log-option'] || DEFAULT_LOG_OPTION;

const httpsSecurityOptions = {
    keyFile,
    certificateFile,
    sslPassPhrase
};

const hostOptions = {
    portNumber,
    globalSecretKey,
    isHttpsEnabled,
    httpsSecurityOptions,
    isAuthenticationEnabled,
    logOption
}

// Writing more numbers of parameters is not a good design, thats why hostOptions object is created.

// const CRMSystemApiHost = new Hosts.CRMSystemAPIHost(portNumber, globalSecretKey, isHttpsEnabled,
//     httpsSecurityOptions, isAuthenticationEnabled, logOption);

const CRMSystemApiHost = new Hosts.CRMSystemAPIHost(hostOptions);

CRMSystemApiHost.start().then(
    () => console.log('Server started successfully'),
    error => console.log('Error Occurred', JSON.stringify(error))
);

const exitHandler = () => {
    () => console.log('Server stoppped successfully'),
        () => console.log('Unable to stop the server')
};

process.on('exit', exitHandler);
process.on('SIGTERM', exitHandler);
