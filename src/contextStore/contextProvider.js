import UserContext from "./context";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router";
import { api } from "../constants";
const ContextProvider=(props)=>{
    const cookies = new Cookies() 
    const [user,setUser]=useState(null)
    const [experiments,setExperiments]=useState([])
    const [keys, setKeys] = useState([window.location.pathname])
    const [selected, setSelected] = useState({ name: "client server communication", no: 1 })
    const [progress, setProgress] = useState([])
    const [selectedProgressId, setSelectedProgressId] = useState("")

    useEffect(() => {
        if (selected.no && progress.length) {
            const index = progress.findIndex((el) => selected.no === +(el.experiment))
            setSelectedProgressId(progress[index].codeId)
        }
    }, [selected, progress])
    const progressUpdateHandler = async (no, codeId) => {
        let updated = [...progress]
        const id = updated.findIndex((el) => +(el.experiment) === no)
        if (id > 0) updated[id] = { ...updated[id], codeId }
        else updated = [...updated, { experiment: no.toString(), codeId }]
        const res = await axios.put(`http://localhost:1337/api/progresses/1?populate=*`, { data: { progress: updated } })
        setProgress(res.data.data.attributes.progress)
    }
    const fetchProgress = async (roll) => {
        const res = await axios.get(
            `${api}/progresses?filters[roll][$eqi]=${roll}&populate=*`
        );
        setProgress(res.data.data[0].attributes.progress)
    }
    const fetchUser=async()=>{
        const res = await axios.get(
            `${api}/users?filters[email][$eqi]=${cookies.get("user")}&populate=*`
        );
          setUser(res.data[0]);
        fetchProgress(res.data[0].roll)
    }
    const contextValues={
        user,
        setUser,
        experiments,
        setExperiments,
        keys,
        setKeys,
        selected,
        setSelected,
        progress,
        progressUpdateHandler,
        selectedProgressId,
        setSelectedProgressId
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