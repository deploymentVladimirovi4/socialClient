import React, { useState } from "react";
import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import {
  BsSearch,
  BsFillPersonFill,
  BsFillChatLeftTextFill,
} from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { undefinedPicture } from "../post/Post";
import { setIsSearch, setSearchValue } from "../../redux/slices/PostSlice";
import { toggleMobileMenu } from "../../redux/slices/AuthSlice";
import { useForm } from "react-hook-form";
import Hamburger from "hamburger-react";

type SubmitSearchProps = {
  search: string;
};

const Topbar: React.FC = () => {
  const [isOpen, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(
    (state: RootState) => state.authReducer.userData.user
  );
  const isMobile = useSelector(
    (state: RootState) => state.authReducer.mobileStatus
  );

  const { register, handleSubmit, resetField } = useForm({
    defaultValues: {
      search: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (inputValue: SubmitSearchProps) => {
    dispatch(setIsSearch(true));
    dispatch(setSearchValue(inputValue.search));
    navigate("/");
    resetField("search");
  };

  const handleToggleHamburger = () => {
    setOpen(!isOpen);
    dispatch(toggleMobileMenu());
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">$ocialism</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <form className="searchbar" onSubmit={handleSubmit(onSubmit)}>
          <BsSearch className="searchIcon" />
          <input
            placeholder="Search for friends or posts..."
            className="searchInput"
            {...register("search")}
          />
        </form>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link
            to={`/profile/${user?._id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <span className="topbarLink">My page</span>
          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <span className="topbarLink">NewsFeed</span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <BsFillPersonFill className="topbarIcon" />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <BsFillChatLeftTextFill className="topbarIcon" />
            <span className="topbarIconBadge">0</span>
          </div>
          <div className="topbarIconItem">
            <IoMdNotifications className="topbarIcon" />
            <span className="topbarIconBadge">2</span>
          </div>
        </div>
        <div>
          <Link to={`/profile/${user?._id}`} style={{ textDecoration: "none" }}>
            <img
              src={user?.coverPicture || undefinedPicture}
              alt="profile"
              className="topbarImage"
            />
          </Link>
        </div>
        <div className="hamburger">
          <Hamburger toggled={isOpen} toggle={() => handleToggleHamburger()} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
