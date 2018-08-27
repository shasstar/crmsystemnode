const ErrorConstants = require('../constants').ErrorConstants;
const http = require('http');
const AppRouters = require('../routing');
const express = require('express');
const expressJwt = require('express-jwt');

class CRMSystemAPIHost {
    constructor(portNumber, globalSecretKey) {
        const validation = portNumber && globalSecretKey;

        if (!validation) {
            throw new Error(ErrorConstants.INVALID_ARGUMENTS);
        }

        this.app = express();
        this.httpServer = http.createServer(this.app);

        this.portNumber = portNumber;
        this.globalSecretKey = globalSecretKey;

        this.customerRouter = new AppRouters.CustomerRouter();
        this.orderRouter = new AppRouters.OrderRouter();
        this.userProfileRouter = new AppRouters.UserProfileRouter(this.globalSecretKey);

        this.initializeHost();
    }

    initializeHost() {
        this.app.use(this.verifyAuthorization);

        this.app.use('/api/customers', this.getExpressJwtSnippet());

        this.app.use('/api/orders', this.getExpressJwtSnippet());

        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: false
        }));

        this.app.use('/api/customers', this.customerRouter.router);
        this.app.use('/api/orders', this.orderRouter.router);
        this.app.use('/api/authenticate', this.userProfileRouter.router);
    }

    verifyAuthorization(error, request, response, next) {
        if (error && error.constructor.name === 'UnauthorizedError') {
            return response.status(HttpStatusCodes.AUTH_FAILED).json({
                message: ErrorConstants.AUTHORIZATION_FAILED
            });
        }
        next();
    }

    getExpressJwtSnippet() {
        return expressJwt({
            secret: this.globalSecretKey
        });
    }

    async start() {
        this.httpServer.listen(this.portNumber);
    }

    async stop() {
        this.httpServer.close();
    }
}

module.exports = CRMSystemAPIHost;
