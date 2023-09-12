import Auth from "./components/authentication/auth";
import { BrowserRouter as Router ,Routes,Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import { Helmet } from "react-helmet";
import "./App.css";


const  App =  ()=>{
  return (
      <div>
        <Helmet>
        <title>Virtual Lab</title>
      </Helmet>
        <Router>
            <Routes>
                <Route path="/" element={<Auth/>} />
                {/* <Route path="/" element={<PricingTable/>} /> */}
                <Route path="/home" element={<NavBar/>} /> 
              
            </Routes>
        </Router>
      </div>
   
  );
}

export default App;

