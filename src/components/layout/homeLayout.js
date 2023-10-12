import Header from "../dashboard/header";
import SideMenu from "../dashboard/menu";
import { Space } from "antd";
import PrivateRoute from "../../privateRoute";
const homeLayout = (props) => {

  return (
    <PrivateRoute>
      <div className="flex  w-full h-[100vh]">
        <div className="flex flex-col">
          <Header />
          <SideMenu />
        </div>

        <div className="h-screen w-full">
          {props.children}
        </div>

      </div>
    </PrivateRoute>
  );
};
export default homeLayout;
