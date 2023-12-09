import "./App.css";
import "./Pages/State.js"
import "./Components/Dashbord.css"
// import Contactdetailes from "./Components/Contactdetailes";
// import PageRoutes from "./Components/PageRoutes";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registrationpage from "./Pages/Registrationpage";
import Dashbord from "./Components/Dashbord";
import PageRoutes from "./Components/PageRoutes";
import Home from "./Components/Home";
import LoginPage from "./Pages/LoginPage";
import AdminRegistration from "./Pages/AdminRegistration";
import ReadFormat from "./Pages/ReadFormat";

function App() {
  return (

    <>
      <Router>
        {/* <Routes>
          <Route exact path="/" element={<Registrationpage />}></Route>
          <Route path="/LoginPage" element={<LoginPage />}></Route>
          <Route path="/Dashboard/*" element={<Dashbord />}> </Route>
        </Routes> */}
        <Dashbord />
        {/* <AdminRegistration /> */}
      </Router>
      {/* <ReadFormat/> */}
    </>
  );
}

export default App;
