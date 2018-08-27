const Hosts = require('./hosting');

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 9000;

const hostName = process.env.HOST || DEFAULT_HOST;
const portNumber = process.env.PORT || DEFAULT_PORT;

const CRMSystemApiHost = new Hosts.CRMSystemAPIHost(portNumber, hostName);

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


console.log('Application Initialization and provisioning started.');
