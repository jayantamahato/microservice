import { FormattedData }   from "../helper/dataFormat.js";
import { CustomerService } from "../service/customer.service.js";

class Customer {
  constructor() {
    this.service = new CustomerService()

  }

  registration = async (req, res) => {
    const { firstName, lastName, email, password, phone, address } =
      req.body;
    try {
      const customer = await this.service.Create(firstName, lastName, email, password, phone, address);

      return res.status(200).json(customer)

    } catch (error) {
      return res.status(500).json(FormattedData(false, 0, {}, "internal error"))
    }
  }

  profile = async (req, res) => {
    try {
      if (req.user) {
        const customer = await this.service.getCustomer(req.user.id); //checking is user exist or not

        return res.status(200).json(customer);

      } else {
        return res.status(401).json(FormattedData(false, 0, {}, "unauthorized customer"))

      }
    } catch (error) {
      return res.status(500).json(FormattedData(false, 0, {}, "internal error"));
    }
  }

  update = async (req, res) => {

    try {
      const { firstName, lastName, email, address } = req.body;

      if (req.user) {
        const customer = await this.service.updateCustomer(req.user.id, firstName, lastName, email, address); //checking is user exist or not

        return res.status(200).json(customer);

      } else {
        return res.status(401).json(FormattedData(false, 0, {}, "unauthorized customer"))

      }
    } catch (error) {
      return res.status(500).json(FormattedData(false, 0, {}, "internal error"));

    }
  }

  logout = async (req, res) => {

    try {
      if (req.user) {
        const customer = await this.service.updateStatus(req.user.id); //checking is user exist or not

        return res.status(200).json(customer);

      } else {
        return res.status(401).json(FormattedData(false, 0, {}, "unauthorized customer"))

      }
    } catch (error) {
      return res.status(500).json(FormattedData(false, 0, {}, "internal error"));

    }
  }

}
export { Customer }