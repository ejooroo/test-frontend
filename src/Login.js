import React, { useState } from "react";
import axios from 'axios';
import { setUserSession } from './service/AuthService';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const loginAPIURL = 'https://1dm9lngs6g.execute-api.us-east-1.amazonaws.com/prod/login';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate(); // Usa useNavigate para obtener la función de navegación

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            setErrorMessage('Both username and password are required');
            return;
        }

        setErrorMessage(null);

        const requestConfig = {
            headers: {
                'x-api-key': '58TEcBUZKGaipxa9nYEAT3whCCTGwPTz1jpKahv3'
            }
        };

        const requestBody = {
            username: username,
            password: password
        }

        axios.post(loginAPIURL, requestBody, requestConfig).then(response => {
            setUserSession(response.data.user, response.data.token);
            navigate('/premium-content'); // Usa la función navigate para redirigir
        }).catch(error => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('Sorry, the server is down! Please try again later.');
            }
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p className="message">{errorMessage}</p>}
        </div>
    );
};

export default Login;
