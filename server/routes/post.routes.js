import { Router } from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../database/models/post.model.js";

dotenv.config();

const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//GET ALL POST
router.route("/").get(async (req, res) => {
  try {
    const Posts = await Post.find({});
    res.status(200).json({ success: true, data: Posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});
//CREATE POST
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoURL = await cloudinary.uploader.upload(photo, {
      folder: "dall-e",
    });

    const NewPost = await Post.create({
      name,
      prompt,
      photo: photoURL.url,
    });

    res.status(201).json({ success: true, data: NewPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
