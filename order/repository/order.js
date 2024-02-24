import OrderModel from "../models/order.js";


class OrderRepository {

    //check if the order exists
    isExists = async (OrderId) => {
        try {
            const order = await OrderModel.findOne({ _id: OrderId });
            return order;

        } catch (error) {
            console.log('error while getting order');
            console.log(error.message);
        }

    };
    //create order 
    createOrder = async (items, shippingAddress, customerId, vendorId, paymentMood, paymentStatus, orderStatus, totalPrice, tax, pCharges, dCharges, discount, payablePrice) => {
        try {
            const newOrder = await OrderModel.create({
                items: items,
                shippingAddress: shippingAddress,
                customerId: customerId,
                vendorId: vendorId,
                paymentMood: paymentMood,
                paymentStatus: paymentStatus,
                orderStatus: orderStatus,
                total_price: totalPrice,
                tax: tax,
                packaging_charges: pCharges,
                delivery_charges: dCharges,
                discount: discount,
                payablePrice: payablePrice,
            });
            return true;

        } catch (error) {
            console.log('error while creating order');
            console.log(error.message);
            return true;
        }

    };
    //get all orders

    getAllOrders = async () => {
        try {
            const orders = await OrderModel.find({});
            return orders;
        } catch (error) {
            console.log('error while getting orders');
            console.log(error.message);
        }
    }
    //get all  orders by userId
    getOrderByUserId = async (userId) => {
        try {

            const order = await OrderModel.findOne({ customerId: userId });
            return order;
        } catch (error) {
            console.log("error while getting order by userId");
            console.log(error.message);
        }


    }
    //get all orders by vendor Id
    getOrderByVendorId = async (vendorId) => {
        try {
            const order = await OrderModel.findOne({ vendorId: vendorId });
            return order;
        } catch (error) {
            console.log("error while getting order by vendorId");
            console.log(error.message);
        }
    }
    //get order details by id 
    getOrderById = async (orderId) => {
        try {
            const order = await this.isExists(orderId);
            return order;
        } catch (error) {
            console.log("error while getting order by id");
            console.log(error.message);
        }
    }
    //update payment status
    updatePaymentStatus = async (orderId, status) => {
        try {
            const order = await this.isExists(orderId);
            order.paymentStatus = status;
            await order.save();
            return order;
        } catch (error) {
            console.log("error while updating payment status");
            console.log(error.message);
        }
    }
    //update order status
    updateOrderStatus = async (orderId, status) => {
        try {
            const order = await this.isExists(orderId);
            order.orderStatus = status;
            await order.save();
            return order;
        } catch (error) {
            console.log("error while updating order status")
            console.log(error.message);
        }
    }

}

export default OrderRepository


