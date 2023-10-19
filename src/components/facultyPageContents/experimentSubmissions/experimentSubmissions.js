import { Dropdown, Button, Tag, Table } from "antd"
import { useContext, useEffect, useState } from "react"
import { api } from "../../../constants"
import axios from "axios"
import userContext from "../../../contextStore/context"
import { DownOutlined } from "@ant-design/icons"
const ExperimentSubmissions = () => {
    const { experiments, selected, setSelected } = useContext(userContext)

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
    const columns = [
        {
            title: "Roll",
            dataIndex: "Roll",
            key: "Roll",
            render: (text) => <a>{text}</a>,
            width: "20%"
        },
        {
            title: "Student Name",
            dataIndex: "Student_Name",
            key: "Student Name",
            width: "30%"
        },
        {
            title: "Last Submitted",
            dataIndex: "lastSub",
            key: "lastSub",
            width: "20%"

        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (_, { status }) => {
                let color = status === "unGraded" ? "geekblue" : "green";
                return (

                    <Tag color={color} key={status}>
                        {status.toUpperCase()}
                    </Tag>

                );
            },
            width: "10%"
        },
        {
            title: "Timeliness",
            key: "timeliness",
            dataIndex: "timeliness",
            render: (_, { timeliness }) => {
                let color = timeliness === "overdue" ? "red" : "green";
                return (

                    <Tag color={color} key={timeliness}>
                        {timeliness}
                    </Tag>

                );
            },
            width: "10%"

        },
        {
            title: "Link",
            key: "Link",
            dataIndex: "Link",
            width: "20%"
        },
    ];
    const dataSource = [
        {
            key: "1",
            Roll: "2018127",
            Student_Name: "mohamed nasim m",
            lastSub: "2023-09-24 15:30:45",
            status: "graded",
            timeliness: "timely",
            Link: <p className="underline cursor-pointer">download link</p>
        },
        {
            key: "2",
            Roll: "2018125",
            Student_Name: "kulasekarapandian v",
            lastSub: "2023-09-24 15:30:45",
            status: "unGraded",
            timeliness: "timely",
            Link: <p className="underline cursor-pointer">download link</p>
        },
        {
            key: "1",
            Roll: "2018L18",
            Student_Name: "shameer k",
            lastSub: "2023-09-24 15:30:45",
            status: "unGraded",
            timeliness: "overdue",
            Link: <p className="underline cursor-pointer">download link</p>
        },
        {
            key: "1",
            Roll: "2018L05",
            Student_Name: "anbarasan m",
            lastSub: "2023-09-24 15:30:45",
            status: "unGraded",
            timeliness: "overdue",
            Link: <p className="underline cursor-pointer">download link</p>
        },

    ];
    useEffect(() => {
        axios.get(`${api}/submissions?populate=*`).then((res) => console.log(res))
    }, [])
    return <div className="flex flex-col justify-center items-center">
        <Dropdown menu={{ items }} className="my-5" >
            <Button className="">
                {selected.name.split(" ")[0] + " " + selected.name.split(" ")[1]}

                <DownOutlined className=" w-5 ml-1 mb-1 text-black" />
            </Button>
        </Dropdown>
        <Table dataSource={dataSource} columns={columns} className="w-[95%] mx-auto" pagination={{
            style: { visibility: "hidden" }
        }}
            scroll={{
                y: 450
            }}
        />

    </div>
}
export default ExperimentSubmissions