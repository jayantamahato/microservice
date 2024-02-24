import { FormattedData } from "../helper/dataFormat.js";
import OrderRepository from "../repository/order.js";

class OrderService {
    constructor() {
        this.orderRepository = new OrderRepository();

    }
    //create a new order
    async createOrder(cartId, customerId) {
        try {

            
            const orderStatus = await this.orderRepository.createOrder(items, shippingAddress, customerId, vendorId, paymentMood, paymentStatus, orderStatus, totalPrice, tax, pCharges, dCharges, discount, payablePrice);
            if (orderStatus) {
            } else {
                FormattedData(false, 0, {}, 'failed to create order');
            }


        } catch (error) {
            console.log("error creating order");
            FormattedData(false, 0, {}, `${error.message}`)
        }
    }
    //get all orders
    async getAllOrders() {
        try {
            const orders = await this.orderRepository.getAllOrders();
            if (orders) {
                return orders;
            } else {
                FormattedData(false, 0, {}, 'failed to get orders');
            }
        } catch (error) {

        }
    }
    //get an order details
    async getOrderById(orderId) {
        try {
            const order = await this.orderRepository.getOrderById(orderId);
            return order;
        } catch (error) {
            console.log("error ")
        }
    }
    //get an order of a specific customer
    async getOrderByUserId(userId) {
        try {
            const order = await this.orderRepository.getOrderByUserId(userId);
            return order;
        } catch (error) {
            console.log("error ")
        }
    }
    //get an order of a specific vendor
    async getOrderByVendorId(vendorId) {
        try {
            const order = await this.orderRepository.getOrderByVendorId(vendorId);
            return order;
        } catch (error) {

        }
    }
    async changePaymentStatus(orderId, paymentStatus) {
        try {
            const order = await this.orderRepository.updatePaymentStatus(orderId, paymentStatus);
            return order;
        } catch (error) {
            console.log("error ")
        }
    }
    async changeOrderStatus(orderId, paymentStatus) {
        try {
            const order = await this.orderRepository.updateOrderStatus(orderId, paymentStatus);
            return order;
        } catch (error) {
            console.log("error ")
        }
    }

}
export default OrderService