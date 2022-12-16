
import React from 'react'
import { useRef, useState, useEffect } from 'react';
import "./login.css";
import axios from 'axios';
// import Home from './Home'
import { useNavigate, Navigate } from 'react-router-dom';


// const Login = () => {
export default function Login() {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        setErrMsg("");

        const token = localStorage.getItem("Token");

        if (!token) {
            setErrMsg("");
        } else {
            navigate("/home");
        }
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let bodydata = {
            "email": "digital@esparza.com",
            "password": "Esparza@del12"
        }
        // axios.post('http://192.168.1.118:8000/api/v1/loginUser', bodydata).then((res) => {
        axios.post('http://localhost:3010/aliens/login', bodydata).then((res) => {
           
            let apiemail = res.data.data.email;
            let apipswd = res.data.data.password;

            let tokenapi = res.data.token;
            let setToken = localStorage.setItem('Token', tokenapi);
            const token = localStorage.getItem('Token');
            console.log("here token", token);

            // const PrivateRoute = ({ auth: { token }, children }) => {
            //     return isAuthenticated ? children : <Navigate to="/home" />;
            // };
            // console.log("Data", apiemail, apipswd);
            setUser(apiemail);
            setPwd(apipswd)

            if (user === apiemail || pwd === apipswd) {
                // alert("login")
                navigate('/home');
            } else {
                alert(res.data.message);
            }
            userRef.current.focus();
        })

        // console.log(user, pwd);
        setUser('');
        setPwd('');
        setSuccess(true);
    }
    return (
        <>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <div className='btn-div'>
                    <button className="btn-sign">Sign In</button>
                </div>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    {/*put router link here*/}
                    <a href="#">Sign Up</a>
                </span>
            </p>
        </>
    )
}

// export default Login
