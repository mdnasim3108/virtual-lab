import { Button, Dropdown, notification } from "antd";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import userContext from "../../../contextStore/context";
import { useParams } from "react-router";
const Editor = () => {

    const { id } = useParams("id")
    const [codeid, setcodeid] = useState(id)
    console.log(id)
    const { experiments, selected, setSelected, user, progressUpdateHandler, progress } = useContext(userContext)
    console.log(experiments)
    console.log(selected)
    useEffect(() => {
        axios.get(`http://localhost:1337/api/progresses?filters[roll][$eqi]=${user.roll}&populate=*`).then((res) => console.log(res))
    }, [])
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message,
            description
        });
    };

    useEffect(() => {
        console.log(progress)
        console.log(selected)
        const id = progress.findIndex((el) => +(el.experiment) === selected.no)
        if (id >= 0) setcodeid(progress[id].codeId)
        else setcodeid("12345")
    }, [selected])

    const items = experiments.map((exp) => {
        return {
            key: exp.key,
            label: <p onClick={() => {
                setSelected({ name: exp.expTitle, no: exp.expNo })

            }}>
                {exp.expTitle}
            </p>
        }
    })
    const [code, setCode] = useState({ content: "", id: "" })
    const [exp, setExp] = useState("")
    const [out, setOut] = useState("")
    window.onmessage = function (e) {

        console.log(e)
        if (e.data && e.data.language) {
            if (e.data.result) {
                setOut(e.data.result.output)
                console.log(e.data._id)
            }
            setCode({ content: e.data.files[0].content, id: e.data._id })
        }
    };
    // useEffect(() => {
    //     var iFrame = document.getElementById('oc-editor');
    //     iFrame.contentWindow.postMessage({
    //         eventType: 'populateCode',
    //         language: 'python',
    //         files: [
    //             {
    //                 "name": "HelloWorld.py",
    //                 "content": "print('hello guys')"
    //             }
    //         ]
    //     }, "*");
    // }, [out])
    useEffect(() => {
        console.log("user:", user)
        axios.get(`http://localhost:1337/api/submissions/${user.id}?populate=*`).then((res) => setExp(res.data.data.attributes))
    }, [])
    const submitHandler = async () => {
        const updated = [...exp.Experiments]

        updated[selected.no - 1] = { ...updated[selected.no - 1], code: code.content, outputContent: out }
        console.log(code.content)
        console.log(out)
        if (code.content === "" || out === "") {
            openNotificationWithIcon('warning', 'Output required', 'Run the code atleast once to submit your code')
            return
        }
        axios.put("http://localhost:1337/api/submissions/1?populate=*", { data: { ...exp, Experiments: updated } }).then((res) => {
            console.log(res)
            openNotificationWithIcon('success', 'Work submitted', 'Your work had been submitted sucessfully')
        })
    }
    return <div className="w-full h-[100vh]">
        <div className="w-full h-[93%] relative">
            {contextHolder}
            <p className="text-lg font-semi-bold absolute top-[1.4vh] left-[30%]">
                {selected.name}
            </p>

            <iframe
                id="oc-editor"
                frameBorder="0"
                height="450px"
                src={`https://onecompiler.com/embed/python/${codeid}?codeChangeEvent=true&disableCopyPaste=true&hideTitle=true&hideNew=true&listenToEvents=true`}
                width="100%"
                className="h-full"
            ></iframe>

        </div>
        <div className="w-full h-[7%] flex items-center justify-center  bg-gray-200">
            <Button className="mr-2" onClick={submitHandler}>submit code</Button>
            <Button className="mr-2" onClick={() => {
                if (code.id === "") {
                    openNotificationWithIcon('warning', 'Nothing to save', 'Everything up to date')
                    return
                }

                // if (out === "") {
                //     openNotificationWithIcon('warning', 'Output required', 'Run the code atleast once to save your progress')
                //     return
                // }

                var iFrame = document.getElementById('oc-editor');
                iFrame.contentWindow.postMessage({
                    eventType: 'triggerRun'
                }, "*");

                progressUpdateHandler(selected.no, code.id)
                openNotificationWithIcon('success', 'Progress saved', 'Your progress has been saved sucessfully')
            }}>save progress</Button>
            <Dropdown menu={{ items }}>
                <Button className="">
                    {selected.name.split(" ")[0] + " " + selected.name.split(" ")[1]}
                    <UpOutlined className=" w-5 ml-1 mb-1 text-black" />
                </Button>
            </Dropdown>
        </div>
    </div>
}
export default Editor