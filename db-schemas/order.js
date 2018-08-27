const OrderSchema = {
    orderId: Number,
    orderDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    customerId: Number,
    billingAddress: String,
    shippingAddress: String,
    productId: Number,
    units: Number,
    amount: Number,
    remarks: String
};

module.exports = OrderSchema;
