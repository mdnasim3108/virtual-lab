import { Table, Spin, Button } from "antd";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { api } from "../../../constants";
import userContext from "../../../contextStore/context";
import useHttp from "../../../hooks/use-http";
import { useNavigate } from "react-router";
const Experiments = () => {
  const navigate = useNavigate()
  const { setExperiments, experiments, setKeys, setSelected, progress, addExperiment } = useContext(userContext);
  const { loading, data, error } = useHttp({ url: `${api}/experiments`, method: "GET" })
  // useEffect(() => {
  //   if(!experiments.length){
  //   axios.get(`${api}/experiments`).then((res) => {
  //     const experiments = res.data.data.map((exp) => {
  //       return {
  //         key: exp.id,
  //         expNo: exp.id,
  //         expTitle: exp.attributes.Experiment_Name,
  //         expDesc: exp.attributes.Description,
  //         Due: exp.attributes.Due_Date,
  //         expLink: (
  //           <a href="/" className="underline">
  //             do Experiment
  //           </a>
  //         ),
  //       };
  //     });
  //     setExperiments(experiments);
  //   })
  // }
  // }, []);
  useEffect(() => {
    if (data) {
      console.log(progress)

      console.log(data.data)

      const experiments = data.data.map((exp) => {

        let code
        const id = progress.findIndex((el) => el.experiment === exp.attributes.ExperimentNo)
        console.log(id)

        if (id >= 0) {
          code = progress[id].codeId
        }
        return {
          key: exp.id,
          expNo: exp.id,
          expTitle: exp.attributes.Experiment_Name,
          expDesc: exp.attributes.Description,
          Due: exp.attributes.Due_Date,
          expLink: (
            <p onClick={() => {
              setSelected({ name: exp.attributes.Experiment_Name, no: +(exp.id) })
              setKeys(["/editor"]) 
              navigate(`/editor/${code ? code : "12345"}`)
            }} className="underline cursor-pointer">
              do Experiment
            </p>
          ),
        };
      });
      setExperiments(experiments);
    }
  }, [data])

  const dataSource = [
    {
      key: "1",
      expNo: "1",
      expTitle: "addition of two numbers",
      expDesc: "read two numbers from the input stream and print their sum",
      Due: "	2023-09-24 15:30:45",
      expLink: (
        <a href="/" className="underline">
          do Experiment
        </a>
      ),
    },
    {
      key: "2",
      expNo: "2",
      expTitle: "addition of two numbers",
      expDesc: "read two numbers from the input stream and print their sum",
      Due: "	2023-09-24 15:30:45",
      expLink: (
        <a href="/" className="underline">
          do Experiment
        </a>
      ),
    },
    {
      key: "3",
      expNo: "3",
      expTitle: "addition of two numbers",
      expDesc: "read two numbers from the input stream and print their sum",
      Due: "	2023-09-24 15:30:45",
      expLink: (
        <a href="/" className="underline">
          do Experiment
        </a>
      ),
    },
    {
      key: "4",
      expNo: "4",
      expTitle: "addition of two numbers",
      expDesc: "read two numbers from the input stream and print their sum",
      Due: "	2023-09-24 15:30:45",
      expLink: (
        <a href="/" className="underline">
          do Experiment
        </a>
      ),
    },
    {
      key: "5",
      expNo: "5",
      expTitle: "addition of two numbers",
      expDesc: "read two numbers from the input stream and print their sum",
      Due: "	2023-09-24 15:30:45",
      expLink: (
        <a href="/" className="underline">
          do Experiment
        </a>
      ),
    },
  ];

  const columns = [
    {
      title: "Exp No.",
      dataIndex: "expNo",
      key: "expNo",
      width: "10%",
    },
    {
      title: "Exp Title",
      dataIndex: "expTitle",
      key: "expTitle",
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "expDesc",
      key: "expDesc",
      width: "30%",
    },
    {
      title: "Due Date",
      dataIndex: "Due",
      key: "Due",
      width: "20%",
    },
    {
      title: "Exp Link",
      dataIndex: "expLink",
      key: "expLink",
      width: "20%",
    },
  ];
  return (
    <Spin spinning={experiments.length === 0}>
      <div className="w-full h-screen pt-[1rem]  bg-gray-100 text-center">
        <Table
          dataSource={experiments}
          columns={columns}
          className="w-[95%] mx-auto" pagination={{
            style: { visibility: "hidden" },
          }}
          scroll={{
            y: 450,
          }}
        />
      </div>
    </Spin>
  );
};
export default Experiments;
