import { FormattedData } from "../helper/dataFormat.js";
import OrderService from "../service/order.service.js";
class Order {
    constructor() {
        this.service = new OrderService();
    }


    createOrder = async (req, res) => {
        try {
            const { cartId, customerId } = req.body;
            const order = await this.service.createOrder(cartId, customerId);
            res.status(200).json(order);
        } catch (error) {
            console.log(error)
            res.status(500).json(FormattedData(false, 0, {}, 'internal error'));
        }
    }
    getOrderDetails = async (req, res) => {
        try {
            const { id } = req.params;
            const order = await this.service.getOrderDetails(id);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(FormattedData(false, 0, {}, 'internal error'));
        }
    }
    getOrderByCustomerId = async (req, res) => {
        try {
            const { customerId } = req.query;
            const order = await this.service.getOrder(customerId);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(FormattedData(false, 0, {}, 'internal error'));
        }
    }

    getAll = async (req, res) => {
        try {
            const orders = await this.service.getAll();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json(FormattedData(false, 0, {}, 'internal error'));
        }
    }
    getOrdersOfVendor = async (req, res) => {
        try {
            const { vendorId } = req.query;
            const orders = await this.service.getOrdersOfVendor(vendorId);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json(FormattedData(false, 0, {}, 'internal error'));
        }
    }
    orderStatus = async (req, res) => {
        try {
            const { orderId, orderStatus } = req.body;
            const order = await this.service.orderStatus(orderId, orderStatus);
            res.status(200).json(order);

        } catch (error) {
            res.status(500).json(FormattedData(false, 0, {}, "internal error"));
        }

    }
    paymentStatus = (req, res) => {
        try {
            const { orderId, paymentStatus } = req.body;
            const order = this.service.paymentStatus(orderId, paymentStatus);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(FormattedData(false, 0, {}, "internal error"));
        }
    }


}
export default Order;