import {
    FormattedData,
    generateSalt,
    generatePassword,
} from "../helper/index.js";
import { CustomerRepository } from "../repository/customer.js";
import { OtpService } from "./otp.js";

const TAG = "CUSTOMER CONTROLLER";

class CustomerService {
    constructor() {
        this.customerRepository = new CustomerRepository();
        this.otpService = new OtpService();
    }
    async ExistingCustomer(phoneNo) {
        try {
            return await this.customerRepository.existingCustomer(phoneNo);
        } catch (error) {
            console.log(TAG);
            console.log(error.message);
        }
    }
    //registration
    async Create(firstName, lastName, email, password, phone, address) {
        try {
            const customer = await this.ExistingCustomer(phone);
            if (customer.length == 0) {
                const otpData = await this.otpService.checkOTP(phone);
                const phoneVerification = otpData.length == 0 ? false : true;

                //generate salt
                const salt = await generateSalt();
                //generate password
                const encryptedPassword = await generatePassword(
                    password,
                    salt
                );
                const customer = await this.customerRepository.createCustomer(
                    firstName,
                    lastName,
                    email,
                    encryptedPassword,
                    phone,
                    address,
                    "premium",
                    phoneVerification,
                    salt
                );
                if (customer != null) {
                    return FormattedData(
                        true,
                        1,
                        customer,
                        "customer created successfully"
                    );
                } else {
                    return FormattedData(
                        false,
                        0,
                        {},
                        "customer creation failed"
                    );
                }
            } else {
                return FormattedData(false, 0, {}, "customer already exist");
            }
        } catch (error) {
            console.log(TAG);
            console.log(error.message);
        }
    }
    //get profile
    async getCustomer(id) {
        const customer = await this.customerRepository.theCustomer(id);
        if (customer != null) {
            return FormattedData(
                true,
                customer.length,
                customer[0],
                "customer found"
            );
        } else {
            return FormattedData(false, 0, {}, "customer not found");
        }
    }

    //delete profile
    async deleteCustomer(customerId) {
        try {
            const deleteResult = await this.customerRepository.deleteCustomer(
                customerId
            );
            if (deleteResult.deletedCount == 0) {
                return FormattedData(false, 0, {}, "customer not deleted");
            } else {
                return FormattedData(true, 1, deleteResult, "customer deleted");
            }
        } catch (error) {}
    }
    //update
    async updateCustomer(id, firstName, lastName, email, address) {
        const customer = await this.customerRepository.updateCustomer(
            id,
            firstName,
            lastName,
            email,
            address
        );
    }
    async updateStatus(id) {
        try {
            const customer = await this.customerRepository.updateLog(id);
            return FormattedData(true, 1, {}, "customer log out");
        } catch (error) {
            return FormattedData(false, 0, {}, "error occur please try again");
        }
    }
}
export { CustomerService };
