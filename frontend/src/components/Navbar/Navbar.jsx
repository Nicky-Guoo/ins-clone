import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NavBar, InputField, OtherIcons } from "./Navbar.styles";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigateTo = useNavigate();
  const [dropdownState, setDropdownState] = useState(false); //下拉菜单状态
  const searchValue = useRef(); //监听输入框的值
  const userID = useSelector((state) => state.user.userID); //用户ID
  console.log("userID", userID);

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
            <SearchIcon style={{ color: "grey", frontSize: 20 }} />
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
              <img src="" alt="profile-pic" onClick={handleDropdownClick} />
              <div
                className={`dropdown-items ${
                  dropdownState ? "isVisible" : "isHidden"
                }`}
              >
                <div className="dropdown-item">
                  <Link to={`/profile/${userID}`}>
                    <div className="dropdown_link">Profile</div>
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
