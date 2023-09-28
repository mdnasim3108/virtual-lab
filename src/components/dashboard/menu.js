import {
  AppstoreOutlined,
  BookOutlined,
  CheckSquareFilled,
  CheckSquareOutlined,
  CodeOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Space, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faChalkboardUser ,faMarker} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const SideMenu = (props) => {
  const navigate = useNavigate();
  const items = [
    { label: "Dashboard", key: "/dashboard", icon: <AppstoreOutlined /> },
    {
      label: "Submissions",
      key: "/submissions",
      icon: <CheckSquareOutlined />,
    },
    { label: "Experiments", key: "/experiments", icon: <CodeOutlined /> },
    // {label:"courses",key:"/courses",icon:<BookOutlined/>},
    { label: "profile", key: "/profile", icon: <UserOutlined /> },
    {
      label: "classMates",
      key: "/classMates",
      icon: <FontAwesomeIcon icon={faUsers} />,
    },
    {
      label: "Teachers",
      key: "/teachers",
      icon: <FontAwesomeIcon icon={faChalkboardUser} />,
    },
    {
      label: "Grades",
      key: "/grades",
      icon: <FontAwesomeIcon icon={faMarker} />,
    },
  ];
  return (
    <div className="h-[calc(100vh-70px)] flex flex-col justify-between">
      <Menu
        items={items}
        onClick={(item) => navigate(item.key)}
        className="w-[15rem] h-full border-r-[3rem]"
        theme="dark"
      >
        
      </Menu>
    </div>
  );
};
export default SideMenu;
