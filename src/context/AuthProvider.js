import { createContext, useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { LoginMethod } from "../assets/APIs";

export const AuthContext = createContext({});

const ROLES = ['doctor', 'patient'];

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const login = async (username, password) => {
        try {
            setIsLoading(true)
            const res = await LoginMethod({
                url: 'user/login',
                body: {
                    userName: username,
                    password: password
                }
            })
            if (ROLES.includes(res.body.user.role.name)) {
                setUserInfo(res.body.user)
                setUserToken(res.body.user.token)
                setUserRole(res.body.user.role.name)
                localStorage.setItem('userToken', res.body.user.token)
                localStorage.setItem('userRole', res.body.user.role.name)
                localStorage.setItem('userInfo', JSON.stringify(res.body.user))
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Sorry, Unauthorize to log in'
                })
            }
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            Toast.fire({
                icon: 'error',
                title: `${err?.response.data.error.message}`
            })
        }
    }
    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        setUserInfo(null)
        setUserRole(null)
        localStorage.removeItem('userToken')
        localStorage.removeItem('userRole')
        localStorage.removeItem('userInfo')
        setIsLoading(false)
    }
    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userInfo = localStorage.getItem('userInfo')
            const userToken = localStorage.getItem('userToken')
            const userRole = localStorage.getItem('userRole')
            userInfo = JSON.parse(userInfo)
            if (userInfo) {
                setUserInfo(userInfo)
                setUserToken(userToken)
                setUserRole(userRole)
            }
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        isLoggedIn()
    }, [])
    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo, userRole }}>
            {children}
        </AuthContext.Provider>
    )
}
