import { useParams } from "react-router-dom";
import { InfoContainer, Info, Stats, Bio, LoadIcon } from "./Profile.styles";
import { initialState as postData } from "../../Redux/PostData";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Fragment, useEffect, useState } from "react";
import CreateProfile from "./CreateProfile";
import axios from "axios";

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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const url = `http://localhost:8000/api/profiles/${id}`;
    axios
      .get(url)
      .then((response) => {
        console.log("profile", response.data);
        setProfile(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setIsLoading(false);
      });
  }, [id, isProfileCreated]);
  if (isLoading) {
    return <LoadIcon>Loading...</LoadIcon>;
  }
  return (
    <Fragment>
      {profile ? (
        <InfoContainer>
          <img
            src={`http://localhost:8000/api/profiles/image/${profile.userID}`}
            alt="profile picture"
          />
          <Info>
            <p className="owner-ID">
              {profile.userID}
              {profile.verified ? (
                <CheckCircleIcon className="verified" />
              ) : null}
            </p>
            <Stats>
              <p>
                <strong>{filteredPosts.length}</strong> Posts
              </p>
              <p>
                <strong>{profile.followers}</strong> Followers
              </p>
              <p>
                <strong>{profile.following}</strong> Following
              </p>
            </Stats>

            <Bio>
              <p className="name">
                <strong>{profile.name}</strong>
              </p>
              <p className="category">{profile.category}</p>
              <p>{profile.bio}</p>
            </Bio>
          </Info>
        </InfoContainer>
      ) : (
        <InfoContainer>
          <CreateProfile
            userID={id}
            setIsProfileCreated={setIsProfileCreated}
          />
        </InfoContainer>
      )}
    </Fragment>
  );
};

export default ProfileInfo;
