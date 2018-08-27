const ObjectFormatter = require('../utilities').ObjectFormatter;

class Order {
    constructor(orderId, orderDate, customerId, billingAddress, shippingAddress, productId, units, amonunt, remarks) {
        [this.orderId, this.orderDate, this.customerId, this.billingAddress, this.shippingAddress, this.productId, this.units, this.amonunt, this.remarks] = arguments;
    }

    toString() {
        return ObjectFormatter.format(this);
    }
}

module.exports = Order;
