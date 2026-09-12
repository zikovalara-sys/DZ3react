import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HomePage from "./pages/HomePage";
import {Route, Routes} from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainNavbar from "./layouts/main/MainNavbar";
import QRPage from "./pages/QRPage";

function App() {

  return (
      <>
        <MainNavbar/>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage/>}/>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="qr" element={<QRPage/>}/>
          </Route>
        </Routes>
      </>
  );
}

export default App;
