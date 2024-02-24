import { OtpService } from "../service/otp.service.js";

class OTP {
    constructor() {
        this.service = new OtpService()
    }

    getOTP = async (req, res) => {
        const { mobileNo } = req.body;
        try {
            const response = await this.service.sendOTP(mobileNo);
            return res.status(200).json(response);

        } catch (error) {
            return res.status(500).json(FormattedData(false, 0, {}, "internal error"))

        }
    }
    verifyOTP = async (req, res) => {
        const { mobileNo, otp } = req.body;
        try {
            const response = await this.service.verifyOTP(mobileNo, otp);
            return res.status(200).json(response)

        } catch (error) {
            return res.status(500).json(FormattedData(false, 0, {}, "internal error"))
        }
    }

}
export { OTP }