import Login from "./login";
import loginImg from "../../assets/loginCartoon.png";
import SignUp from "./signUp";
import { useState,useEffect } from "react";
import Logo from "../../assets/Netzero.jpg";
import gctLogo from "../../assets/Government_College_of_Technology,_Coimbatore_logo.png";
import vlabImg from "../../assets/vlab.png";
import { Player } from "@lottiefiles/react-lottie-player";
import codeLottie from "../../assets/codeLottie.json";
import ForgotForm from "./forgotForm";
// import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Auth = (props) => {
  const navigate=useNavigate()
  const cookies=new Cookies();
  useEffect(()=>{
      if(cookies.get("user")) navigate("/dashboard")
  },[])
  const [showLog, setShowLog] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  return (
    <>
      <div className="authContainer h-screen">
        <div className=" flex justify-between py-7 pl-20 pr-[15rem] ">
          <div>
            <img src={gctLogo} className="w-[5rem] compLog mr-3 inline-block" />
            <p className="text-2xl inline-block font-roboto">
              GCT Virtual Programming Laboratory
            </p>
          </div>
          {/* <h2 className="text-3xl tracking-wide">NetzeroThink</h2> */}
          <div className="w-[10rem] h-[2rem] sm:w-[18rem] sm:h-[3rem] mt-1 sm:mt-8 rounded-[30px] flex justify-between bg-violet-700 items-center px-[2px] relative">
            <button
              className={`text-white font-bold rounded-[30px] h-[90%] w-[50%]`}
              onClick={() => setShowLog(true)}
            >
              Login
            </button>
            <button
              className={` text-white font-bold rounded-[30px] w-[50%] h-[90%]`}
              onClick={() => setShowLog(false)}
            >
              Register{" "}
            </button>
            <button
              className={`bg-white transition-all ease-in-out duration-[400ms] text-violet-600 font-bold rounded-[30px] w-[50%] h-[90%] absolute ${
                !showLog ? "translate-x-[96.5%]" : ""
              }`}
            >
              {showLog ? "Login" : "Register"}
            </button>
          </div>
        </div>
        <div className="flex justify-between px-[6rem] logCont ">
          <div className="loginImg">
            {/* <img src={loginImg} className="logCartImg w-[2rem] h-[2rem]" alt =""/> */}
            <Player
              autoplay
              loop
              src={codeLottie}
              className="sm:w-[30rem] sm:h-[30rem] w-[15rem] h-[15rem] relative bottom-5 sm:left-5 scale-x-[-1]"
            ></Player>
          </div>
          {showForgot?<ForgotForm  sent={()=>setShowForgot(false)} back={()=>setShowForgot(false)}/>:showLog ? (
            <Login
              forgot={() => {
                setShowForgot(true);
              }}
              login={(email)=>props.login(email)}
            />
          ) : (
            <SignUp />
          )}
    
        </div>
      </div>
    </>
  );
};
export default Auth;
