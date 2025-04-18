import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NavBar, InputField, OtherIcons } from "./Navbar.styles";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import defaultIcon from "../../assets/images/user.png";

const Navbar = () => {
  const navigateTo = useNavigate(); //路由导航
  const searchValue = useRef(); //监听输入框的值
  const userID = useSelector((state) => state.user.userID); //用户ID
  const profiles = useSelector((state) => state.profile.profileData); //用户信息
  const currentProfile = profiles.length
    ? profiles.filter((profile) => profile.userID === userID)
    : null; //用户信息是否存在
  const [dropdownState, setDropdownState] = useState(false); //下拉菜单状态
  const [imgPath, setImgPath] = useState(""); //用户头像路径

  useEffect(() => {
    if (currentProfile) {
      const url = `http://localhost:8000/api/profiles/image/${userID}`;
      setImgPath(url);
    }
  }, [currentProfile, userID]); //获取用户头像

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = searchValue.current.value;
    if (!value) return;
    navigateTo(`/profile/${value}`);
  }; //搜索按钮
  const likeBtn = (e) => {
    let color = e.target.style.color;
    if (color === "tomato") {
      color = "black";
    } else {
      color = "tomato";
    }
    e.target.style.color = color;
  }; //点赞按钮
  const handleDropdownClick = () => {
    setDropdownState(!dropdownState);
  }; //下拉菜单
  return (
    <>
      <NavBar>
        <div id="nav-items">
          <Link to="/home">
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
              alt="logo"
            />
          </Link>
          <InputField>
            <SearchIcon style={{ color: "gray", fontSize: 20 }} />
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Search" ref={searchValue} />
            </form>
          </InputField>
          <OtherIcons>
            <div className="home">
              <Link to="/home">
                <HomeIcon />
              </Link>
            </div>
            <div className="chat">
              <Link to={`/contact/${userID}`}>
                <ChatIcon />
              </Link>
            </div>
            <div className="favorite">
              <FavoriteIcon onClick={likeBtn} />
            </div>
            <div className="dropdown-menu">
              <img
                src={
                  currentProfile && currentProfile.length
                    ? imgPath
                    : defaultIcon
                }
                alt="profile-pic"
                onClick={handleDropdownClick}
              />
              <div
                className={`dropdown-items ${
                  dropdownState ? "isVisible" : "isHidden"
                }`}
              >
                <div className="dropdown-item">
                  <Link to={`/profile/${userID}`}>
                    <div className="dropdown__link">Profile</div>
                  </Link>
                </div>
                <div className="dropdown-item">
                  <Link to="/post">
                    <div className="dropdown_link">Post</div>
                  </Link>
                </div>
                <div className="dropdown-item">
                  <Link to="/login">
                    <div className="dropdown_link">Logout</div>
                  </Link>
                </div>
              </div>
            </div>
          </OtherIcons>
        </div>
      </NavBar>
    </>
  );
};

export default Navbar;
