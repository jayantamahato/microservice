import  express  from "express";
import { CartController } from "../controller/cart.controller.js";
import { authentication } from "../middleware/auth.js";
const router = express.Router();

const cart = new CartController();


router.use(authentication)
router.get('/',cart.getCart);
router.post('/inc',cart.increment);
router.post('/dec',cart.decrement);
router.post('/',cart.remove);
router.post('/',cart.add);

export {router as CartRouter}
