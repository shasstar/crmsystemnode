const ErrorConstants = require('../constants').ErrorConstants;
const UserProfile = require('../models').UserProfileModel;

const MIN_SEARCH_STR_LEN = 3;
const MIN_PASS_LEN = 5;

class UserProfileService {
    constructor() {
        this.registeredProfiles = [
            new UserProfile(1, 'user1', 'pass1', 'email1', 'dept1', 'title1'),
            new UserProfile(2, 'user2', 'pass2', 'email2', 'dept2', 'title2'),
            new UserProfile(3, 'user3', 'pass3', 'email3', 'dept3', 'title3'),
            new UserProfile(4, 'user4', 'pass4', 'email4', 'dept4', 'title4'),
            new UserProfile(5, 'user5', 'pass5', 'email5', 'dept5', 'title5')
        ];
    }
    async getUserProfileByName(userName) {
        if (!userName) {
            throw new Error(ErrorConstants.INVALID_ARGUMENTS);
        }

        let filteredProfile = null;

        for (let profile of this.registeredProfiles) {
            if (profile.userName === userName) {
                filteredProfile = profile;
            }
            break;
        }

        return filteredProfile;
    }

    async validate(userName, password) {
        const validation = userName && password && userName.length >= MIN_SEARCH_STR_LEN && password.length >= MIN_PASS_LEN;

        if (validation) {
            throw new Error(ErrorConstants.INVALID_ARGUMENTS);
        }

        const userProfile = await this.getUserProfileByName(userName);

        if (!userProfile) {
            throw new Error(ErrorConstants.BUSINESS_VALIDATION_FAILED);
        }

        const status = password && userProfile.password;

        return status;
    }
}

module.exports = UserProfileService;
