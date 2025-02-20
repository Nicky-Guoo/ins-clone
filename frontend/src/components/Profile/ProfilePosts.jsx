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
        filteredPosts.map((post, index) => (
          // 为每个帖子创建一个 div
          <div key={`${index}-${post.userID}`}>
            <img src={post.postLink} alt="post" />
          </div>
        ))
      ) : (
        <div className="empty-post-section">
          <h2>No Posts Yet!</h2>
        </div>
      )}
    </PostGrid>
  );
};

export default ProfilePosts;
