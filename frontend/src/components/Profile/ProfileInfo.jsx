import { useParams } from "react-router-dom";
import { InfoContainer, Info, Stats, Bio, LoadIcon } from "./Profile.styles";
import { initialState as profileData } from "../../Redux/ProfileData";
import { initialState as postData } from "../../Redux/PostData";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Fragment, useState } from "react";
import CreateProfile from "./CreateProfile";

const ProfileInfo = () => {
  // 从 URL 获取用户 ID
  const { id } = useParams();
  console.log("id", id);
  // 过滤出与用户 ID 匹配的帖子
  let filteredPosts = postData.filter((post) => {
    return post.userID === id;
  });
  const [profile, setProfile] = useState(null);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return <LoadIcon>Loading...</LoadIcon>;
  }
  return (
    <Fragment>
      {profileData[id] ? (
        <InfoContainer>
          <img src={profileData[id].profilePic} alt="project picture" />
          <Info>
            <p className="owner-ID">
              {profileData[id].userID}
              {profileData[id].verified ? (
                <CheckCircleIcon className="verified" />
              ) : null}
            </p>
            <Stats>
              <p>
                <strong>{filteredPosts.length}</strong> Posts
              </p>
              <p>
                <strong>{profileData[id].followers}</strong> Followers
              </p>
              <p>
                <strong>{profileData[id].following}</strong> Following
              </p>
            </Stats>

            <Bio>
              <p className="name">
                <strong>{profileData[id].name}</strong>
              </p>
              <p className="category">{profileData[id].category}</p>
              <p>{profileData[id].bio}</p>
            </Bio>
          </Info>
        </InfoContainer>
      ) : (
        <InfoContainer>
          <CreateProfile userID={id} />
        </InfoContainer>
      )}
    </Fragment>
  );
};

export default ProfileInfo;
