import { Table } from "antd";
const Experiments = () => {
  const dataSource = [
    {
      key: "1",
      expNo: "1",
      expTitle: "addition of two numbers",
      expDesc: "read two numbers from the input stream and print their sum",
      expLink:<a href="/" className="underline">do Experiment</a>
    },
    {
        key: "2",
        expNo: "2",
        expTitle: "addition of two numbers",
        expDesc: "read two numbers from the input stream and print their sum",
        expLink:<a href="/" className="underline">do Experiment</a>
    },
      {
        key: "3",
        expNo: "3",
        expTitle: "addition of two numbers",
        expDesc: "read two numbers from the input stream and print their sum",
        expLink:<a href="/" className="underline">do Experiment</a>
    },
      {
        key: "4",
        expNo: "4",
        expTitle: "addition of two numbers",
        expDesc: "read two numbers from the input stream and print their sum",
        expLink:<a href="/" className="underline">do Experiment</a>
    },
    {
        key: "5",
        expNo: "5",
        expTitle: "addition of two numbers",
        expDesc: "read two numbers from the input stream and print their sum",
        expLink:<a href="/" className="underline">do Experiment</a>
    },
    {
        key: "6",
        expNo: "6",
        expTitle: "addition of two numbers",
        expDesc: "read two numbers from the input stream and print their sum",
        expLink:<a href="/" className="underline">do Experiment</a>
    },
    {
        key: "7",
        expNo: "7",
        expTitle: "addition of two numbers",
        expDesc: "read two numbers from the input stream and print their sum",
        expLink:<a href="/" className="underline">do Experiment</a>
    },
    {
        key: "8",
        expNo: "8",
        expTitle: "addition of two numbers",
        expDesc: "read two numbers from the input stream and print their sum",
        expLink:<a href="/" className="underline">do Experiment</a>
    },
  
    {
        key: "9",
        expNo: "9",
        expTitle: "addition of two numbers",
        expDesc: "read two numbers from the input stream and print their sum",
        expLink:<a href="/" className="underline">do Experiment</a>
    },
    {
        key: "10",
        expNo: "10",
        expTitle: "addition of two numbers",
        expDesc: "read two numbers from the input stream and print their sum",
        expLink:<a href="/" className="underline">do Experiment</a>
    },
    {
        key: "11",
        expNo: "11",
        expTitle: "addition of two numbers",
        expDesc: "read two numbers from the input stream and print their sum",
        expLink:<a href="/" className="underline">do Experiment</a>
    },
    
  ];

  const columns = [
    {
      title: "Exp No.",
      dataIndex: "expNo",
      key: "expNo",
      width:"10%"
    },
    {
      title: "Exp Title",
      dataIndex: "expTitle",  
      key: "expTitle",
      width:"20%"
    },
    {
      title: "Exp Description",
      dataIndex: "expDesc",
      key: "expDesc",
      width:"50%"
    },
    {
      title: "Exp Link",
      dataIndex: "expLink",
      key: "expLink",
      width:"20%"
    },
  ];
  return (
    <div className="w-full h-[calc(100vh-70px)] pt-[1rem]  bg-gray-100"> 
      <Table dataSource={dataSource} columns={columns} className="w-full m-0 scrollable-element"  pagination={{
      style:{visibility:"hidden"}
    }}
    scroll={{
        y:450
    }}
     />
    </div>
  );
};
export default Experiments;
