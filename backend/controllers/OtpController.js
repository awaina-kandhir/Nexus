import Otp from "../models/Otp.js";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Delete any previous OTP for this email
    await Otp.deleteMany({ email });

    // Save new OTP (expires in 30 minutes)
    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    });

    // Optional: keep this for development
    console.log(`OTP for ${email}: ${otp}`);

    res.status(200).json({
      message: "OTP Sent Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const data = await Otp.findOne({ email });

    if (!data) {
      return res.status(400).json({
        message: "OTP not found",
      });
    }

    if (data.expiresAt < new Date()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (data.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Delete OTP after successful verification
    await Otp.deleteMany({ email });

    res.status(200).json({
      message: "OTP Verified Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};