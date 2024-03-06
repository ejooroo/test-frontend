import React from "react";
import { getUser, resetUserSession } from './service/AuthService';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const PremiumContent = () => {
    const user = getUser();
    const name = user ? user.name : '';

    const navigate = useNavigate(); // Usa useNavigate para obtener la función de navegación

    const logoutHandler = () => {
        resetUserSession();
        navigate('/login'); // Usa la función navigate para redirigir
    }

    return (
        <div>
            Hello {name}! You have been logged in!!! Welcome to the premium content. <br />
            <input type="button" value="Logout" onClick={logoutHandler} />
        </div>
    )
}

export default PremiumContent;

