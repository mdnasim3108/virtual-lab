import { Image, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import gctImg from "../../assets/Government_College_of_Technology,_Coimbatore_logo.png";
import profileImg from "../../assets/acc1.png";
import { Dropdown } from "antd";
import { useNavigate } from "react-router";
import userContext from "../../contextStore/context";
import { useContext, useEffect } from "react";
import { Cookies } from "react-cookie";
const Header = (props) => {
  const {user}=useContext(userContext)
  const cookies=new Cookies()
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: <p onClick={() => navigate("/profile")}>profile</p>,
    },
    {
      key: "2",
      label: <p onClick={()=>{
        cookies.remove("user")
        navigate("/")
      }}>logout</p>,
    },
  ];
  return (
    user?<div className="h-[70px] flex justify-between items-center   ">
      <div className="w-[15rem] pl-4 h-full bg-[#001529] py-4">
        {/* <Image width={40} src={gctImg} /> */}
        <h1 className="text-xl font-semibold text-white">Virtual Laboratory</h1>
      </div>

      <div className="w-[calc(100%-15rem)] pr-5 flex items-center justify-end h-full border-b border-b-[rgba(0,0,0,0.15)]">
        <div className="bg-white w-max rounded-full border shadow px-2 text-white cursor-pointer">
          <Dropdown menu={{ items }} className="w-max">
            <Space align="center">
              <Image width={30} src={profileImg} className="mt-2" /> 
              <div className="flex flex-col">
              <Typography.Text className="text-[15px] font-semibold">
                {user.username.split(" ")[0]}
              </Typography.Text>
              <Typography.Text className="text-[14px] text-gray-400 relative bottom-1">
                {user.role.name}
              </Typography.Text>
              </div>
              <DownOutlined style={{ color: "black" }} />    
            </Space>
          </Dropdown>
        </div>
      </div>
    </div>:
    <p>loading</p>
    
  );
};
export default Header;
