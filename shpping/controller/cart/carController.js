import { CartModel } from "../../models/cart.model.js";
import { FoodModel } from "../../models/food.model.js";

export const addToCart = async (req, res) => {
  const body = req.body;
  try {
    //find cart --if exsist update the array else create one

    const cart = await CartModel.findOne({ customerId: req.user._id });
    const food = await FoodModel.findOne({ _id: body.item });
    if (cart == null) {
      //create item

      var obj = food.toJSON();
      obj["qnt"] = 1;

      const savedData = await CartModel.create({
        items: obj,
        customerId: req.user._id,
        total_price: food.price,
      });
      return res.status(200).json({
        status: true,
        results: 0,
        data: savedData,
        message: "added",
      });
    } else {
      if (cart.items.some((data) => data._id == body.item)) {
        //update quantity

        //update total cart price
        cart.total_price += food.price;

        //finding the food information increase quantity

        const foodInfo = cart.items.find(({ _id }) => _id == body.item);
        //update locally
        foodInfo.qnt += foodInfo.qnt;
        //replace the exsisting item with new quantity

        //geting increased item -- index

        cart.items.map((data) => {
          if (foodInfo._id === data._id) {
            cart.items[cart.items.indexOf(data)] = foodInfo;
          }
        });

        //replace with new value(item)

        //save cart
        await cart.save();
      } else {
        //add item
        var obj = food.toJSON();
        cart.total_price += food.price;
        obj["qnt"] = 1;
        cart.items.push(obj);
        await cart.save();
      }

      //update
    }
    return res.status(200).json({
      status: true,
      results: 0,
      data: cart,
      message: "added",
    });

    // customer.cart .push
  } catch (error) {
    return res.status(400).json({
      status: false,
      results: 0,
      data: {},
      message: error.message,
    });
  }
};

//remove-cart  whole
export const removeCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ customerId: req.user._id });
    while (cart.items.length > 0) {
      await cart.items.pop();
    }
    cart.total_price = 0;
    await cart.save();
    return res.status(200).json({
      status: true,
      results: 0,
      data: cart,
      message: "delete cart",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      results: 0,
      data: {},
      message: error.message,
    });
  }
};
//remove item from cart
export const removeFromCart = async (req, res) => {
  const itemID = req.params.id;

  try {
    const cart = await CartModel.findOne({ customerId: req.user._id });
    if (cart.items.length > 0) {
      // delete that item
      cart.items.map((data) => {
        if (data._id == itemID) {
          console.log(data._id + "----data id");
          console.log(itemID + "----item id");
          cart.items.pop();
          cart.total_price = cart.total_price-data.price
        }
      });
      await cart.save();
      return res.status(200).json({
        status: true,
        results: 1,
        data: cart,
        message: "item deleted",
      });
    } else {
      //no item in cart
      return res.status(400).json({
        status: false,
        results: 0,
        data: cart,
        message: "empty cart",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      results: 0,
      data: {},
      message: error.message,
    });
  }
};
