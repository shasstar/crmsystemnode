const ErrorConstants = require('../constants').ErrorConstants;
const Customer = require('./customer');

class CustomerMap {
    static transform(obj) {
        const validation = obj && obj.id && obj.name && obj.email && obj.phone && obj.address && obj.status && obj.credit && obj.remarks;

        if(!validation){
            throw new Error(ErrorConstants.INVALID_ARGUMENTS);
        }

        obj.__proto__ = new Customer();

        return obj;
    }
}

module.exports = CustomerMap;
