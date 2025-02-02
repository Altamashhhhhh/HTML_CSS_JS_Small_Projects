const express = require("express");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv").config();
const fs = require("fs");

const app = express();
const port = 8080;
app.use(express.static("public"));
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  storage: multer.memoryStorage(),
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/form.html"));
});

app.post("/upload", upload.single("avatar"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File Not Uploaded" });
  }
  try {
    const tempPath = path.join(__dirname, req.file.originalname);
    fs.writeFileSync(tempPath, req.file.buffer);
    const result = await cloudinary.uploader.upload(tempPath, {
      folder: "multer_files_uploader",
    });

    fs.unlinkSync(tempPath);
    res.status(200).send(`<body style="width:100%; height:100vh; box-sizing: border-box; display:flex; justify-content:center; align-items:center; background:#f4f4f4; font-family:Arial,sans-serif;">
    <div style="background:#fff; padding:20px; border-radius:10px; box-shadow:0 4px 8px rgba(0,0,0,0.2); text-align:center;">
        <h3 style="color:#333;">Image Uploaded Successfully!</h3>
        <a href="${result.secure_url}" target="_blank" style="display:inline-block; margin-top:10px; padding:10px 20px; background:rgba(7, 101, 101, 0.885); color:#fff; text-decoration:none; font-weight:bold; border-radius:5px;">View Image</a>
    </div>
</body>`) 
  } catch (error) {
    res
      .status(500)
      .json({ message: "File Upload Failed", error: error.message });
  }
  res.send("Soon file will get uploaded");
});

app.listen(port, () => {
  console.log(`Server is running on ${port} http://localhost:${port}`);
});
