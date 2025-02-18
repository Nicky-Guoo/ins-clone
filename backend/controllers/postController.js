const Post = require("../models/Post");
const mongoose = require("mongoose");
const User = require("../models/User");

const getAllPosts = (req, res) => {
  Post.find({})
    .then((posts) => {
      if (!posts) {
        return res.status(404).json({ message: "No posts found" });
      }
      return res.status(200).json(posts);
    })
    .catch((err) => {
      console.error("Error fetching posts:", err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

const createPost = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const {
      userID,
      profilePic,
      location,
      name,
      likes,
      isLiked,
      caption,
      comments,
      postID,
    } = req.body; //destructure the request body
    const postLink = req.files.postLink.data;
    //create a new post document
    const post = new Post({
      userID,
      postPic,
      location,
      name,
      likes,
      isLiked,
      caption,
      comments,
      postID,
    });
    await post.save(); //save the post document
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    log.error("Error creating post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllPosts, createPost };
