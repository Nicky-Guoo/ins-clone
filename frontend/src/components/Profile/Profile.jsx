import { Container } from "./Profile.styles";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import Navbar from "../Navbar/Navbar";

const Profile = () => {
  return (
    <Container>
      <Navbar />
      <ProfileInfo />
      <ProfilePosts />
    </Container>
  );
};
export default Profile;
