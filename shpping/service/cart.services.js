import { CartRepository } from "../repository/cart.repository.js";
import { FormattedData } from "../helper/dataFormat.js";
const Tag = "Cart Service";
class CartService {
    constructor() {
        this.cartRepository = new CartRepository();
    }

    //add to cart
    async addToCart(customerId, itemId) {
        //call the food api
        const foodInformation = {};

        // const foodInformation = await this.foodRepository.GetFoodById(itemId);

        foodInformation.qty = 1;
        if (
            await this.cartRepository.addItemToCart(customerId, foodInformation)
        ) {
            return FormattedData(true, 1, {}, "item added successfully");
        } else {
            return FormattedData(false, 0, {}, "item not added to cart");
        }
    }

    //get cart
    async getCart(customerId) {
        try {
            const cartItem = await this.cartRepository.getCart(customerId);
            return FormattedData(true, 1, cartItem, "cart found");
        } catch (error) {
            console.log(Tag);
            console.log(error.message);
        }
    }

    //increment item quantity
    async incrementQty(customerId, itemId) {
        try {
            if (await this.cartRepository.increment(customerId, itemId)) {
                return FormattedData(true, 1, {}, "item incremented");
            } else {
                return FormattedData(false, 0, {}, "item not increment");
            }
        } catch (error) {
            console.log(Tag);
            console.log(error.message);
        }
    }

    //decrement item quantity
    async decrementQty(customerId, itemId) {
        try {
            if (await this.cartRepository.decrement(customerId, itemId)) {
                return FormattedData(true, 1, {}, "item decremented");
            } else {
                return FormattedData(false, 0, {}, "item not decrement");
            }
        } catch (error) {
            console.log(Tag);
            console.log(error.message);
        }
    }

    // delete item
    async deleteItem(customerId, itemId) {
        try {
            if (
                await this.cartRepository.removeItemFromCart(customerId, itemId)
            ) {
                return FormattedData(true, 1, {}, "item deleted from cart");
            } else {
                return FormattedData(false, 0, {}, "item not deleted");
            }
        } catch (error) {
            console.log(Tag);
            console.log(error);
        }
    }
}
export { CartService };
