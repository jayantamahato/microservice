import { CustomerModel } from "../models/customer.model.js";

class CustomerRepository {
    static TAG = "CUSTOMER REPOSITORY";

    // easting customer check

    async existingCustomer(no) {
        try {
            const customer = await CustomerModel.findOne({ phone: no });
            return customer;
        } catch (error) {
            console.log(error.message);
            console.log(TAG);
        }
    }

    //create customer

    async createCustomer(
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        membership,
        verification,
        salt
    ) {
        try {
            const customer = await CustomerModel.create({
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                isVerified: verification,
                password: password,
                salt: salt,
                isLogedIn: true,
                address: address,
                memberShip: membership,
            });
            return customer;
        } catch (error) {
            console.log(error.message);
            console.log(TAG);
        }
    }

    //read customer by Id

    async theCustomer(id) {
        try {
            const customer = await CustomerModel.findOne({ _id: id });
            return customer;
            cus;
        } catch (error) {
            console.log(error.message);
            console.log(TAG);
        }
    }
    //get all customer

    async customers() {
        try {
            const customers = await CustomerModel.find({});
            return customers;
        } catch (error) {
            console.log(error.message);
            console.log(TAG);
        }
    }

    //delete a customer

    async deleteCustomer(id) {
        try {
            const customer = await CustomerModel.deleteOne({ _id: id });
            return customer;
        } catch (error) {
            console.log(error.message);
            console.log(TAG);
        }
    }

    //update information

    async updateCustomer(id, firstName, lastName, email, address) {
        try {
            const customerInfo = await this.theCustomer(id);
            (customerInfo.first_name = firstName),
                (customerInfo.last_name = lastName),
                (customerInfo.email = email),
                (customerInfo.address = address);
            return await customerInfo.save();
        } catch (error) {
            console.log(error);
        }
    }

    //change password

    async changePassword(id, password, salt) {
        try {
            const customerInfo = await this.theCustomer(id);
            (customerInfo.password = password), (customerInfo.salt = salt);

            return await customerInfo.save();
        } catch (error) {
            console.log(error);
        }
    }

    //update membership

    async updateMembership(id, memberShip) {
        try {
            const customerInfo = await this.theCustomer(id);
            customerInfo.memberShip = memberShip;
            return await customerInfo.save();
        } catch (error) {
            console.log(error);
        }
    }

    //update log status

    async updateLog(id) {
        try {
            const customerInfo = await this.theCustomer(id);
            customerInfo.isLogedIn = false;
            const savedStatus = await customerInfo.save();
            return savedStatus;
        } catch (error) {
            console.log(error);
        }
    }

    //update profile pic

    async updatePicture(id, memberShip) {
        try {
        } catch (error) {
            console.log(error);
        }
    }
}
export { CustomerRepository };
