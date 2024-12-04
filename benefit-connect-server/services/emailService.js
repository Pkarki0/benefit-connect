const createTransport = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dummy@gmail.com",
      pass: "uogx izit qedt pdkn",
    },
  });

  return transporter;
};

const sendEmail = (name, email, message) => {
  const mailOptions = {
    from: "no-reply@gmail.com",
    to: email,
    subject: `New Inquiry Form Submission from ${name}`,
    text: message,
  };

  const transporter = createTransport();

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return { success: false, message: "Error sending email" };
    } else {
      return { success: false, message: "Email sent successfully" };
    }
  });
};
