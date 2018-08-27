const ObjectFormatter = require('../utilities').ObjectFormatter;

class UserProfile {
    constructor(userId, userName, password, email, department, title) {
        [this.userId, this.userName, this.password, this.email, this.department, this.title] = arguments;
    }

    toString() {
        return ObjectFormatter.format(this);
    }
}

module.exports = UserProfile;
