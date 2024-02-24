import twilio from "twilio";
const TAG = "OTP_HELPER";

export const sendOTP = async (no, OTP) => {
    const accountSid = "ACd02c379a532b5602f8758fa765e7a681";
    const authToken = "e0f525b2f76b9957eb84a70768e94224";
    const client = twilio(accountSid, authToken);

    try {
        await client.messages.create({
            body: `Your Verification Code :${OTP}`,
            from: "+12565784079",
            to: `+91${no}`,
        });
        return true;
    } catch (error) {
        console.log(TAG);
        console.log(error.message);
        return false;
    }
};
