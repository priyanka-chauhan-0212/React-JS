import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem('Token');
        navigate('/');
    };

    return (
        <div>
            <h2>Sign In Successfully ..</h2>
            <h1> :) </h1>
            <button onClick={handleClick}>Log out</button>
        </div>
    );
}
