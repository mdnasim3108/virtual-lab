import Header from "../dashboard/header";
import SideMenu from "../dashboard/menu";
import { Space } from "antd";
const homeLayout = (props) => {
  
    return (
      <div className="flex flex-col w-full h-[100vh]">
        <Header />
        <Space className="flex flex-1 justify-start items-start w-full h-full ">
          <SideMenu />
          {props.children}
        </Space>
      </div>
    );
};
export default homeLayout;
