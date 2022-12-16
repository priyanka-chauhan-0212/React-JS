// import logo from './logo.svg';
import './App.css';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home'
import PrivateRouter from './PrivateRouter';
import Dashboard from './Dashboard';
import ResetPassword from './ResetPassword';
import { ToastContainer} from 'react-toast';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/forgetpassword/:token" element={<ResetPassword />} />

          <Route element={<PrivateRouter />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  );
}
export default App;