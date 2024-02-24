import { CartModel } from "../models/cart.model.js";

class CartRepository {
    //find a cart info of an user

    async findCart(customerId) {
        try {
            const cartInfo = await CartModel.find({ customerId: customerId });
            return cartInfo[0];
        } catch (error) {
            console.log("Error" + error);
        }
    }
    // add item

    async addItemToCart(customerId, foodInformation) {
        const cartInfo = await this.findCart(customerId);
        if (cartInfo != null) {
            let index = cartInfo.items.findIndex(foodInformation);
            if (index) {
                return false;
            } else {
                cartInfo.items.push(foodInformation);
                cartInfo.cartPrice += foodInformation.price;
                cartInfo.payablePrice += cartInfo.cartPrice;
                cartInfo.tax = (cartInfo.cartPrice * 18) / 100;
                return true;
            }
        } else {
            await CartModel.create({
                customerId: customerId,
                cartPrice: foodInformation.price,
                items: foodInformation,
                payablePrice: foodInformation.price,
                tax: (foodInformation.price * 18) / 100,
            });
            return true;
        }
    }

    // remove item
    async removeItemFromCart(customerId, productId) {
        const cartInfo = await this.findCart(customerId);
        const Item = cartInfo.items.filter((item) => {
            return item._id != productId;
        });
        cartInfo.items = Item;
        await cartInfo.save();
        return true;
    }
    //get cart
    async getCart(customerId) {
        try {
            const items = await this.findCart(customerId);
            return items;
        } catch (error) {
            console.log(error.message);
        }
    }

    //delete whole cart
    async deleteCart(customerId) {
        try {
            const deletedData = await CartModel.deleteOne({
                customerId: customerId,
            });
            return deletedData;
        } catch (error) {
            console.log(error);
        }
    }

    //increment of single item if exist on cart
    async increment(customerId, productId) {
        const cartInfo = await this.findCart(customerId);
        if (cartInfo != null) {
            const cartItem = cartInfo.items.filter((data) => {
                return data._id == productId;
            });
            cartItem[0].qty = cartItem[0].qty++;
            cartInfo.cartPrice = cartInfo.cartPrice + cartItem[0].price;
            await cartInfo.save();
            return true;
        } else {
            return false;
        }
    }
    // decrement of single item if exist on cart
    async decrement(customerId, productId) {
        const cartInfo = await this.findCart(customerId);
        if (cartInfo != null) {
            const cartItem = cartInfo.items.filter((data) => {
                return data._id == productId;
            });

            if (cartItem[0].qty > 1) {
                (cartItem[0].qty = cartItem.qty--),
                    (cartInfo[0].cartPrice =
                        cartInfo.cartPrice - cartItem[0].price),
                    await cartInfo.save();
            } else {
                null;
            }

            return true;
        } else {
            return false;
        }
    }
}
export { CartRepository };
