import { CartService } from "../service/cart.services.js";

class CartController {
    constructor() {
        this.service = new CartService()
    }

    add = async (req, res) => {
        const { itemId } = req.body;
        try {
            if (req.user) {
                const cartStatus = await this.service.addToCart(req.user.id, itemId); //checking is user exist or not
                return res.status(200).json(cartStatus);

            } else {
                return res.status(401).json(FormattedData(false, 0, {}, "unauthorized customer"))

            }
        } catch (error) {
            return res.status(500).json(FormattedData(false, 0, {}, "internal error"));
        }
    }
    remove = async (req, res) => {
        const { itemId } = req.body;
        try {
            if (req.user) {
                const cartStatus = await this.service.deleteItem(req.user.id, itemId); //checking is user exist or not

                return res.status(200).json(cartStatus);

            } else {
                return res.status(401).json(FormattedData(false, 0, {}, "unauthorized customer"))

            }
        } catch (error) {
            return res.status(500).json(FormattedData(false, 0, {}, "internal error"));
        }
    }
    increment = async (req, res) => {
        const { itemId } = req.body;
        try {
            if (req.user) {

                const cartStatus = await this.service.incrementQty(req.user.id, itemId); //checking is user exist or not
                return res.status(200).json(cartStatus);

            } else {
                return res.status(401).json(FormattedData(false, 0, {}, "unauthorized customer"))

            }
        } catch (error) {
            return res.status(500).json(FormattedData(false, 0, {}, "internal error"));
        }
    }
    decrement = async (req, res) => {
        const { itemId } = req.body;
        try {
            if (req.user) {
                const cartStatus = await this.service.decrementQty(req.user.id, itemId); //checking is user exist or not
                return res.status(200).json(cartStatus);

            } else {
                return res.status(401).json(FormattedData(false, 0, {}, "unauthorized customer"))

            }
        } catch (error) {
            return res.status(500).json(FormattedData(false, 0, {}, "internal error"));
        }
    }
    getCart = async (req, res) => {
        try {
            if (req.user) {
                const cartStatus = await this.service.getCart(req.user.id); //checking is user exist or not
                return res.status(200).json(cartStatus);

            } else {
                return res.status(401).json(FormattedData(false, 0, {}, "unauthorized customer"))

            }
        } catch (error) {
            return res.status(500).json(FormattedData(false, 0, {}, "internal error"));
        }
    }
}
export {CartController}