const ObjectFormatter = require('../utilities').ObjectFormatter;

class Customer {
    constructor(id, name, email, phone, address, status, credit, remarks) {
        [this.id, this.name, this.email, this.phone, this.address, this.status, this.credit, this.remarks] = arguments;
    }

    toString() {
        return ObjectFormatter.format(this);
    }
}

module.exports = Customer;
