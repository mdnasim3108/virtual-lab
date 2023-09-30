import Header from "../dashboard/header";
import SideMenu from "../dashboard/menu";
import { Space } from "antd";
import PrivateRoute from "../../privateRoute";
const homeLayout = (props) => {
  
    return (
      <PrivateRoute>
      <div className="flex flex-col w-full h-[100vh]">
        <Header />
        <Space className="flex flex-1 justify-start items-start w-full h-full ">
          <SideMenu />
          {props.children}
        </Space>
      </div>
      </PrivateRoute>
    );
};
export default homeLayout;
