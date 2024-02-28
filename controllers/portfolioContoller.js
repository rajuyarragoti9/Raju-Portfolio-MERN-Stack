const nodemailer = require("nodemailer");

const sendEmailController = async (req, res) => {
  try {
    // Create a nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "rajuportfolio9@gmail.com",
        pass: "lzjcraqjjssgyjja",
      },
    });

    const { name, email, msg } = req.body;

    // Validation
    if (!name || !email || !msg) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Create an email message
    const mailOptions = {
      from: {
        name: "Portfolio mail",
        address: "rajuportfolio9@gmail.com",
      }, // Updated: remove the angle brackets
      to: "rajucse1818@gmail.com", // destination email address
      subject: "Portfolio Contact Form Submission", // subject line
      text: "Hello world?", // plain text body
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name: ${name}</p></li>
          <li><p>Email: ${email}</p></li>
          <li><p>Message: ${msg}</p></li>
        </ul>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully",
    });
  } catch (error) {
    console.error("Send Email API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports = { sendEmailController };
