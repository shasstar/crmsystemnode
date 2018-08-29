const ErrorConstants = require('../constants').ErrorConstants;
const http = require('http');
const https = require('https');
const fs = require('fs');
const AppRouters = require('../routing');
const express = require('express');
const expressJwt = require('express-jwt');

class CRMSystemAPIHost {
    constructor(portNumber, globalSecretKey, isHttpsEnabled, httpsSecurityOptions, isAuthEnabled) {
        const validation = portNumber && globalSecretKey;

        if (!validation) {
            throw new Error(ErrorConstants.INVALID_ARGUMENTS);
        }

        [this.portNumber, this.globalSecretKey, this.isHttpsEnabled, this.httpsSecurityOptions, this.isAuthEnabled] = arguments;

        this.app = new express();

        if (!isHttpsEnabled) {
            this.webServer = http.createServer(this.app);
        } else {
            const serverOptions = {
                cert: fs.readFileSync(this.httpsSecurityOptions.certificateFile),
                key: fs.readFileSync(this.httpsSecurityOptions.keyFile),
                passphrase: this.httpsSecurityOptions.sslPassPhrase
            };
            this.webServer = https.createServer(serverOptions, this.app);
        }

        this.customerRouter = new AppRouters.CustomerRouter();
        this.orderRouter = new AppRouters.OrderRouter();
        this.userProfileRouter = new AppRouters.UserProfileRouter(this.globalSecretKey);

        this.initializeHost();
    }

    addCORSHeaders(request, response, next) {
        if (response) {
            response.header('Access-Control-Allow-Credentials', 'true');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Methods', '*');
            response.header('Access-Control-Allow-Headers', 'Origin X-Requested-With Content-Type Accept Authorization');
        }
        next();
    }

    initializeHost() {
        this.app.use(this.addCORSHeaders);
        this.app.use(this.verifyAuthorization);

        if (this.isAuthEnabled) {
            this.app.use('/api/customers', this.getExpressJwtSecretKey());
            this.app.use('/api/orders', this.getExpressJwtSecretKey());
        }

        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: false
        }));

        this.app.use('/api/customers', this.customerRouter.router);
        this.app.use('/api/orders', this.orderRouter.router);
        this.app.use('/authenticate', this.userProfileRouter.router);
    }

    verifyAuthorization(error, request, response, next) {
        if (error && error.constructor.name === 'UnauthorizedError') {
            return response.status(HttpStatusCodes.AUTH_FAILED).json({
                message: ErrorConstants.AUTHORIZATION_FAILED
            });
        }
        next();
    }

    getExpressJwtSecretKey() {
        return expressJwt({
            secret: this.globalSecretKey
        });
    }

    async start() {
        this.webServer.listen(this.portNumber);
    }

    async stop() {
        this.webServer.close();
    }
}

module.exports = CRMSystemAPIHost;
