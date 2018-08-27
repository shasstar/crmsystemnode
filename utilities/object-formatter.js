const ErrorConstants = require('../constants').ErrorConstants;
const START_POS = 0;
const DELIMITER = ', ';
const NO_OF_TRAIL_CHARS = 2;

class ObjectFormatter {
    static format(obj) {
        if (!obj) {
            throw new Error(ErrorConstants.INVALID_ARGUMENTS);
        }

        let message = '';

        for (let property in obj) {
            const propertyValue = obj[property];

            const validation = propertyValue && typeof propertyValue !== 'function';

            if (validation) {
                message += `${propertyValue}${DELIMITER}`;
            }
        }

        message = message.substr(START_POS, message.length - NO_OF_TRAIL_CHARS);

        return message;
    }
}

module.exports = ObjectFormatter;
