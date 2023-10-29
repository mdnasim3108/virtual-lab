import { Dropdown, Button, Tag, Table, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { api } from "../../../constants";
import axios from "axios";
import userContext from "../../../contextStore/context";
import { DownOutlined } from "@ant-design/icons";
import { jsPDF } from "jspdf";
const ExperimentSubmissions = () => {
  const { experiments, selected, setSelected, students } =
    useContext(userContext);

  const [data, setData] = useState([]);
  const [submission, setSubmission] = useState([]);
  const items = experiments.map((exp) => {
    return {
      key: exp.key,
      label: (
        <p
          onClick={() => {
            setSelected({ name: exp.expTitle, no: +exp.expNo });
          }}
        >
          {exp.expTitle}
        </p>
      ),
    };
  });
  const columns = [
    {
      title: "Roll",
      dataIndex: "Roll",
      key: "Roll",
      render: (text) => <a>{text}</a>,
      width: "20%",
    },
    {
      title: "Student Name",
      dataIndex: "Student_Name",
      key: "Student Name",
      width: "30%",
    },
    {
      title: "Last Submitted",
      dataIndex: "lastSub",
      key: "lastSub",
      width: "20%",
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
      width: "10%",
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
      width: "10%",
    },
    {
      title: "Link",
      key: "Link",
      dataIndex: "Link",
      width: "20%",
    },
  ];
  //   const dataSource = [
  //     {
  //       key: "1",
  //       Roll: "2018127",
  //       Student_Name: "mohamed nasim m",
  //       lastSub: "2023-09-24 15:30:45",
  //       status: "graded",
  //       timeliness: "timely",
  //       Link: <p className="underline cursor-pointer">download link</p>,
  //     },
  //     {
  //       key: "2",
  //       Roll: "2018125",
  //       Student_Name: "kulasekarapandian v",
  //       lastSub: "2023-09-24 15:30:45",
  //       status: "unGraded",
  //       timeliness: "timely",
  //       Link: <p className="underline cursor-pointer">download link</p>,
  //     },
  //     {
  //       key: "1",
  //       Roll: "2018L18",
  //       Student_Name: "shameer k",
  //       lastSub: "2023-09-24 15:30:45",
  //       status: "unGraded",
  //       timeliness: "overdue",
  //       Link: <p className="underline cursor-pointer">download link</p>,
  //     },
  //     {
  //       key: "1",
  //       Roll: "2018L05",
  //       Student_Name: "anbarasan m",
  //       lastSub: "2023-09-24 15:30:45",
  //       status: "unGraded",
  //       timeliness: "overdue",
  //       Link: <p className="underline cursor-pointer">download link</p>,
  //     },
  //   ];
  const pdfGenerateHandler = (code,output,roll,name,experimentName) => {
    const doc = new jsPDF();
  
    doc.text(`
                                  ${selected.no}.) ${experimentName}


    roll no: ${roll}                                          name: ${name}

  
    code:
    
    ${code}




    

    output:

    ${output}
     `
    , 10, 10);
  
    doc.save("a4.pdf");
  };
  useEffect(() => {
    axios.get(`${api}/submissions?populate=*`).then((res) =>
      setSubmission(
        res.data.data.map((el) => {
          return {
            id: el.id,
            roll: el.attributes.roll,
            finishedExperiments: el.attributes.Experiments,
          };
        })
      )
    );
  }, []);

  useEffect(() => {
    if (submission.length && experiments.length) {
      const completedStudents = submission.filter((el) =>
        el.finishedExperiments.map((el) => el.ExpNo).includes(selected.no)
      );
      if (completedStudents.length) {
        setData(
          completedStudents.map((el) => {
            const id = el.finishedExperiments.findIndex(
              (el) => el.ExpNo === selected.no
            );
            const exp = el.finishedExperiments[id];
            const expIndex = experiments.findIndex(
              (experiment) => experiment.expNo == selected.no
            );
            const experimentData = experiments[expIndex];
            const studentId = students.findIndex(
              (student) => student.roll === el.roll
            );
            const studentData = students[studentId];
            return {
              key: el.id,
              Roll: el.roll,
              Student_Name: studentData.username,
              lastSub: exp.Submitted_Date,
              status: "unGraded",
              timeliness:
                new Date(exp.Submitted_Date) < new Date(experimentData.Due)
                  ? "timely"
                  : "overdue",
              Link: <p className="underline cursor-pointer" onClick={()=>pdfGenerateHandler(exp.code,exp.outputContent,el.roll,studentData.username,experimentData.expTitle)}>download link</p>,
            };
          })
        );
      } else {
        setData(false);
      }
    }
  }, [selected, submission,experiments]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Dropdown menu={{ items }} className="my-5">
        <Button className="">
          {selected.name}

          <DownOutlined className=" w-5 ml-1 mb-1 text-black" />
        </Button>
      </Dropdown>
      <Table
        dataSource={data}
        columns={columns}
        className="w-[95%] mx-auto"
        pagination={{
          style: { visibility: "hidden" },
        }}
        scroll={{
          y: 450,
        }}
      />
    </div>
  );
};
export default ExperimentSubmissions;
