import UserContext from "./context";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
const ContextProvider=(props)=>{
    const cookies=new Cookies()
    const [user,setUser]=useState(null)
    const [experiments,setExperiments]=useState([])
    const fetchUser=async()=>{
        const res = await axios.get(
            `http://localhost:1337/api/users?filters[email][$eqi]=${cookies.get("user")}&populate=*`
          );
          console.log(res.data);
          setUser(res.data[0]);
    }
    const contextValues={
        user,
        setUser,
        experiments,
        setExperiments
    }
    useEffect(()=>{
        if(cookies.get("user")){
            fetchUser()
        }
    },[])
    return <UserContext.Provider value={contextValues}>
        {props.children}
    </UserContext.Provider>
}
export default ContextProvider;