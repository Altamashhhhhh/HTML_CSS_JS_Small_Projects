const express = require("express");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv").config(); 
const fs = require("fs");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
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
    return res.status(400).json({ message: "No File Uploaded" });
  }
  try {
    const tempPath = path.join(__dirname ,  req.file.originalname); 
    fs.writeFileSync(tempPath, req.file.buffer);

    const result = await cloudinary.uploader.upload(tempPath, {
      folder: "uploads",
    });

   fs.unlinkSync(tempPath)
 
    res.send({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Upload Failed", error: error.message });
  }
});

app.listen(3001, () => {
  console.log(`server is running on port 3001 http://localhost:3001`);
});
