const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer Transporter Ayarları (Gmail ve Google'dan aldığın Uygulama Şifresi ile)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yasarsueda40@gmail.com", // Kendi mail adresin
    pass: process.env.GMAIL_APP_PASSWORD, // .env dosyasından okunacak 16 haneli uygulama şifresi
  },
});

// Formdan gelen istekleri karşılayan API Endpoint'i
app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "yasarsueda40@gmail.com", // Maillerin geleceği kendi adresin
    subject: `Yeni İletişim Mesajı: ${name}`,
    text: `Gönderen Adı: ${name}\nGönderen E-posta: ${email}\n\nMesaj:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Mesaj başarıyla gönderildi!" });
  } catch (error) {
    console.error("Mail gönderme hatası:", error);
    res.status(500).json({ success: false, message: "Mesaj gönderilemedi." });
  }
});

// Sunucuyu başlatma
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});
