import React, { useState } from "react";
import axios from 'axios';


const registerURL = 'https://1dm9lngs6g.execute-api.us-east-1.amazonaws.com/prod/register';


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos del formulario a un servidor o manejarlos de otra manera
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);

        if (username.trim() === '' || email.trim() ==='' || password.trim() === ''){
            setMessage('All fields are required');
            return;
        }

        setMessage(null);
        
        const requestConfig = {
            headers: {
                'x-api-key': '58TEcBUZKGaipxa9nYEAT3whCCTGwPTz1jpKahv3'
            }
        };

        const requestBody = {
            username: username,
            mail: email,
            password: password
        }

        axios.post(registerURL, requestBody, requestConfig).then(response => {
            setMessage('Registeration Successful');
        }).catch(error => {
            if (error.response.status === 401 || error.response.status === 403) {
                setMessage(error.response.data.message)
            } else {
                setMessage('sorry... system is down!!! please try again later');
            }
        })
    };

    return (
        <div>
            <h2>Register</h2>
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
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
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
                <button type="submit">Register</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Register;
