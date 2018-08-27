const ErrorConstants = require('../constants').ErrorConstants;
const HttpStatusCodes = require('../constants').HttpStatusCodes;
const UserProfileService = require('../services').UserProfileService;
const express = require('express');
const jwt = require('jsonwebtoken');

class UserProfileRouter {
    constructor(globalSecretKey) {
        if (!globalSecretKey) {
            throw new Error(ErrorConstants.INVALID_ARGUMENTS);
        }

        this.globalSecretKey = globalSecretKey;
        this.router = express.Router();
        this.userProfileService = new UserProfileService();
        this.initializeRouting();
    }

    initializeRouting() {
        this.router.post('/', async (req, res) => {
            const { userName, password } = req.body;

            const validation = userName && password;

            if (!validation) {
                throw new Error(ErrorConstants.INVALID_ARGUMENTS);
            }

            const isValid = await this.userProfileService.validate(userName, password);

            if (!isValid) {
                throw new Error(ErrorConstants.BUSINESS_VALIDATION_FAILED);
            }

            const profile = await this.userProfileService.getUserProfileByName(userName);

            const token = jwt.sign(profile, this.globalSecretKey, {
                expiresIn: '1h'
            });

            const signature = {
                token
            };

            res.status(HttpStatusCodes.CONTENT_CREATE).json(signature);
        });
    }
}

module.exports = UserProfileRouter;
