import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../apiConfig";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import { useSelector, useDispatch } from "react-redux";
import {
  handleLikeSingleClick,
  handleLikeDoubleClick,
} from "../../Redux/PostData";

export default function Post() {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.post.postData);
  const userID = useSelector((state) => state.user.userID);
  const [comment, setComment] = useState("");
  const updatePostData = async (id, updatedObj) => {
    try {
      const url = `/api/posts/${id}`;
      await axiosInstance.put(url, updatedObj);
    } catch (error) {
      console.error("Error updating posts:", error);
    }
  };
  const handlePostComment = async (postData, text) => {
    let updateObj = {
      comments: [...postData["comments"], { userID, text }],
      isLiked: postData.isLiked,
      likes: postData.likes,
    };
    updatePostData(postData._id, updateObj);
    setComment("");
  };

  const handlePostLikes = async (type, postData) => {
    let updatedPost = { ...postData };
    let likes = "";
    if (type === "singleClick") {
      updatedPost.isLiked = !postData.isLiked;
      likes = String(
        parseInt(updatedPost.likes, 10) + (updatedPost.isLiked ? 1 : -1)
      );
      updatedPost.likes = likes;
      dispatch(handleLikeSingleClick(updatedPost)); // 调用 Redux action
    } else if (type === "doubleClick") {
      updatedPost.isLiked = true;
      likes = String(
        parseInt(updatedPost.likes, 10) + (postData.isLiked ? 0 : 1)
      );
      updatedPost.likes = likes;
      dispatch(handleLikeDoubleClick(updatedPost)); // 调用 Redux action
    }
    let updatedObj = {
      isLiked: type === "singleClick" ? !postData.isLiked : true,
      likes: likes,
      comments: [...postData.comments],
    };
    updatePostData(postData._id, updatedObj);
  };
  return (
    <Container>
      {allPosts && allPosts.length > 0 ? (
        allPosts.map((post) => {
          return (
            <UserPost key={post.postID} className={`post-${post.postID}`}>
              <UserInfo>
                <div className="post-info">
                  <div className="icon">
                    <img
                      src={`http://localhost:8000/api/profiles/image/${post.userID}`}
                      alt="profile icon"
                    />
                  </div>
                  <div className="id-location">
                    <p className="user owner-id">
                      <Link to={`/profile/${post.userID}`}>{post.userID}</Link>
                    </p>
                  </div>
                </div>
                <MoreHorizIcon />
              </UserInfo>
              <Media onDoubleClick={() => handlePostLikes("doubleClick", post)}>
                <FavoriteIcon className={`like-post-${post.postID}`} />
                <img
                  src={`http://localhost:8000/api/posts/image/${post._id}`}
                  alt="post"
                />
              </Media>
              <PostInfo>
                <PostActionIcons>
                  <div className="actions">
                    <FavoriteIcon
                      className={`like-icon ${post.isLiked ? "liked" : ""} `}
                      onClick={() => handlePostLikes("singleClick", post)}
                    />
                    <ChatBubbleOutlineOutlinedIcon />
                    <TelegramIcon />
                  </div>
                  <div className="save">
                    <BookmarkBorderIcon />
                  </div>
                </PostActionIcons>
                <Likes>{post.likes}likes</Likes>
                <Caption>
                  <div className={`content-${post.postID} hideContent`}>
                    <span className="user owner-id">
                      <Link to={`/profile/${post.userID}`}>{post.userID}</Link>
                    </span>
                    {post.caption}
                  </div>
                  <span className="show-more">
                    <a href="#">...more</a>
                  </span>
                </Caption>
                <Comments></Comments>
                <CommentInput>
                  <SentimentSatisfiedOutlinedIcon />
                  <form onSubmit={() => handlePostComment(post, comment)}>
                    <input
                      className={`comment-input-${post.postID}`}
                      type="text"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(() => e.target.value)}
                    />
                  </form>
                  <a href="#" onClick={() => handlePostComment(post, comment)}>
                    Post
                  </a>
                </CommentInput>
              </PostInfo>
            </UserPost>
          );
        })
      ) : (
        <h1>No Posts Yet!</h1>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 45%;
`;
const UserPost = styled.div`
  width: 100%;
  margin: 20px 0 20px 200px;
  border: 1px solid hsl(147, 7%, 75%);
  font-size: 14px;
  a,
  .user {
    text-decoration: none;
    color: black;
    font-weight: bold;
    margin-right: 5px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  svg {
    cursor: pointer;
    margin-right: 7px;
    color: #2f2d2d;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.1);
    }
  }
  @media (max-width: 768px) {
    margin: 0 0 20px;
    font-size: 12px;
    width: 100%;
  }
`;

const UserInfo = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  .post-info {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
    .icon {
      margin-right: 10px;
    }
  }
`;

const Media = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    position: absolute;
    background: transparent;
    color: tomato;
    transform: scale(0);
    opacity: 0;
    font-size: 100px;
    transition: all 0.2s ease-in;
  }
  svg.active {
    transform: scale(1);
    opacity: 1;
  }
  img {
    width: 100%;
  }
`;

const PostInfo = styled.div`
  margin: 5px 10px;
`;

const PostActionIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .like-icon.liked {
    color: tomato;
  }
`;

const Likes = styled.p`
  font-weight: bold;
  margin: 5px 0;
`;

const Caption = styled.section`
  .hideContent {
    overflow: hidden;
    height: 1.3em;
  }
  .showContent {
    line-height: auto;
    height: auto;
  }
`;

const Comments = styled.div`
  overflow-y: scroll;
  margin: 10px 0;
  li {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      display: flex;
    }
  }
  .empty-comment-box {
    color: grey;
  }
`;

const CommentInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid hsl(147, 7%, 75%);
  padding: 8px 0;
  form,
  input {
    border: none;
    outline: none;
    font-size: 15px;
    width: 100%;
  }
  a {
    margin: 0 10px;
    font-size: 15px;
    font-weight: bold;
    color: royalblue;
    text-decoration: none;
  }
`;
