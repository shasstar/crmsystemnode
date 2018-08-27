const express = require('express');
const OrderService = require('../services').OrderService;

class OrderRouter {
    constructor() {
        this.router = express.Router();
        this.orderService = new OrderService();
        this.initializeRouting();
    }

    initializeRouting() {
        this.router.get('/:customerId', async (req, res) => {
            const customerId = parseInt(req.params.customerId);
            const orders = await this.orderService.getOrdersByCustomerId(customerId);
            res.json(orders);
        });
    }
}

module.exports = OrderRouter;
