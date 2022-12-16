import React, { useRef, useState } from 'react'
import axios from 'axios';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useJwt } from "react-jwt";
import { toast } from 'react-toast';

export default function ResetPassword() {

    let { token } = useParams();

    console.log("token ---", token);
    const { decodedToken, isExpired } = useJwt(token);
    // const { decodedToken, isExpired } = useJwt.decode(JSON.parse(token))
    console.log("decode:", decodedToken);

    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    // const [repwd, setRepwd] = useState('');
    // const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);
    const [newpswd, setNewpswd] = useState('');
    const [newrepswd, setNewrepswd] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log("password:", decodedToken);

        let bodydata = {
            email: decodedToken.email,
            new_password: newpswd,
            cnfm_password: newrepswd

        }
        axios.post('http://localhost:3010/aliens/resetpassword', bodydata).then((res) => {
            console.log(res);
            console.log("Response:", res.data.success);
            if (res.data.success === 1) {
                alert("success")
                toast(res.data.message);
                // console.log("pasword changed.")
                navigate('/');
            } else {
                alert("error")
                // console.log("pasword not changed.")
                toast(res.data.message);
            }
        })
    }
    return (
        <>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">password:</label>
                <input
                    type="password"
                    id=" password"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setNewpswd(e.target.value)}
                    value={newpswd}
                    required
                />

                <label htmlFor="password">cnfm Password:</label>
                <input
                    type="password"
                    id="repassword"
                    onChange={(e) => setNewrepswd(e.target.value)}
                    value={newrepswd}
                    required
                />
                <div className='btn-div'>
                    <button className="btn-sign">Sign In</button>
                </div>
            </form>

        </>
    )
}
