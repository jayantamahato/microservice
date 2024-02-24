import express from "express";
import { availableFood, nearestResturent, foodById, topRatedResturent } from "../../controller/index.js";

const router = express.Router();
router.get('/resturents/:pin',nearestResturent)
router.get('/top_resturents/:pin',topRatedResturent)
router.get('/resturent/:id',foodById)
router.get('/food/:pin',availableFood)

export { router as ShoppingRouter}; 
