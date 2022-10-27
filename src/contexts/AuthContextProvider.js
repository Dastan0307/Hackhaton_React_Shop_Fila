import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const authContext = React.createContext();
export const useAuth = () => useContext(authContext);

const API = 'http://35.239.251.89/';

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [picture, setPicture] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const config = {
        headers: { "Content-Type": "multipart/form-data" },
    };

    const register = async (username, password) => {
        let formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        try {
            const res = await axios.post(`${API}register/`, formData, config);
            navigate('/login');
        } catch (error) {
            console.log(error);
            setError('Error occured!');
        };
    };

    const login = async (username, password, picture) => {
        let formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        try {
            const res = await axios.post(`${API}api/token/`, formData, config);
            navigate('/');
            localStorage.setItem("token", JSON.stringify(res.data));
            localStorage.setItem("username", JSON.stringify(username));
            localStorage.setItem("picture", JSON.stringify(picture));
            setUser(username);
            setPicture(picture);
        } catch (error) {
            console.log(error);
            setError('Wrong username or password', error);
        };
    };

    async function checkAuth(){
        let token = JSON.parse(localStorage.getItem('token'));

        try {
            const Authorization = `Bearer ${token.access}`;
            let res = await axios.post(
                `${API}api/token/refresh/`,
                { refresh: token.refresh },
                { headers: { Authorization } }
            );

            localStorage.setItem("token", JSON.stringify({ refresh: token.refresh, access: res.data.access }));

            let username = localStorage.getItem('username');
            setUser(username);
            let picture = localStorage.getItem('picture');
            setPicture(picture);
        } catch (error) {
            console.log(error);
            logout();
        };
    };

    function logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("picture");
        setUser('');
        setPicture('');
        navigate('/');
    };
    
  return (
    <authContext.Provider value={{
        user,
        error,
        picture,
        register,
        login, 
        checkAuth,
        logout
    }}>
        { children }
    </authContext.Provider>
  )
}

export default AuthContextProvider