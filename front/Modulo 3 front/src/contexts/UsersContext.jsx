import axios from "axios";
import { createContext, useCallback, useState } from "react";
import PropTypes from "prop-types";

export const UsersContext = createContext({
    user: "",
    userAppointements: [],
    registerUser: async () => {},
    loginUser: async () => {},
    logOutUser: () => {},
    createAppointement: async () => {},
    getUserAppointements: async () => {},
    cancelAppointement: async () => {}
})


export const UsersProvider = ({ children }) => {
    
    const [user, setUser] = useState(localStorage.getItem("user") || "")
    const [userAppointements, setUserAppointements] = useState([])

    const registerUser = async (userData) => {
       const response =  await axios.post("http://localhost:3020/users/register", userData)
        return response;
    }

    const loginUser = async (userData) => {
        const response = await axios.post("http://localhost:3020/users/login", userData)
        localStorage.setItem("user", response.data.user.id)
        setUser(response.data.user.id)
        return response;
    }

    const logOutUser = () => {
        localStorage.removeItem("user")
        setUser(false)
        setUserAppointements([])
    }

    const createAppointement = async (appointement) => {
        const response = axios.post("http://localhost:3020/appointements/schedule", appointement)
        return response;
    }

    const getUserAppointements = useCallback(async (userId) => {
        if (!userId) return;
        const response = await axios.get(`http://localhost:3020/users/${userId}`);
        setUserAppointements(response.data.appointements);
        return response;
    }, []);

    const cancelAppointement = async (appointementId) => {
        const response = await axios.put(`http://localhost:3020/appointements/cancel/${appointementId}`)
        const newAppointements = userAppointements.map((appointement) => appointement.id === appointementId ? {...appointement, status: "cancelled"} : appointement)
        setUserAppointements(newAppointements)
        return response;
    }

    const value = {
        user,
        userAppointements,
        loginUser,
        registerUser,
        logOutUser,
        createAppointement,
        getUserAppointements,
        cancelAppointement
    }

    return (
        <UsersContext.Provider value={value}>
            { children }
        </UsersContext.Provider>
    )
}

UsersProvider.propTypes = {
    children: PropTypes.node.isRequired,
};