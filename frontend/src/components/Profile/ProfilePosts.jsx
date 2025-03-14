import { useParams } from "react-router-dom";
import { PostGrid } from "./Profile.styles";
import { useSelector } from "react-redux";

const ProfilePosts = () => {
  const { id } = useParams(); // 从 URL 获取用户 ID
  const postData = useSelector((state) => state.post.postData); // 获取所有帖子
  // 过滤出与用户 ID 匹配的帖子
  let filteredPosts = postData.filter((post) => {
    return post.userID === id;
  });

  return (
    <PostGrid>
      {filteredPosts.length ? (
        // 显示用户的所有帖子

        filteredPosts.map((post) => {
          return (
            // <Link key={post.postID} to={`/profile/${id}`}>

            <div key={post.postID}>
              <div className="overlay"></div>
              <img
                alt="post"
                src={`http://localhost:8000/api/posts/image/${post._id}`}
              />
            </div>
            // </Link>
          );
        })
      ) : (
        <h2 className="empty-post-section">No Posts Yet!</h2>
      )}
    </PostGrid>
  );
};

export default ProfilePosts;
