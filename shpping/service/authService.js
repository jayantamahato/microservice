import { getSignature } from "../helper/index.js";
import { CustomerService } from "./customer.service.js";



export const CustomerAuth = async (mobileNo) => {
    const customerService = new CustomerService();

    const customer = await customerService.ExistingCustomer(mobileNo);
    if (customer.length != 0) {
        //old customer
        const payload = {
            id: customer[0]._id,
            name: customer[0].first_name,
            no: customer[0].phone,
        };
        const data = {
            new: false,
            token: await getSignature(payload)
        };
        const theCustomer = await customerService.getCustomer(customer[0]._id);
        theCustomer.isLogedIn = true;
        await theCustomer.save()
        return data;

    } else {
        const data = {
            new: true,
            token: ""
        };
        return data;

    }
}
