import express from 'express'
import { createVendor, getVendorById, getVendors } from '../../controller/index.js';
const router = express.Router();
router.get('/',(req,res)=>{
    res.send('hello from admin')
});


router.post('/create-vendor',createVendor)
router.get('/vendors',getVendors)
router.post('/vendor/:id',getVendorById)

export { router as adminRouer};
