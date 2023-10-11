import { createContext, useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { LoginMethod, PutMethod } from "../assets/APIs";

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
    const login = async (email, password) => {
        try {
            setIsLoading(true)
            const res = await LoginMethod({
                url: 'user/login',
                body: {
                    email: email,
                    password: password
                }
            })
            if (ROLES.includes(res.body.role)) {
                setUserInfo(res.body)
                setUserToken(res.body.token)
                setUserRole(res.body.role.name)
                localStorage.setItem('userToken', res.body.token)
                localStorage.setItem('userRole', res.body.role)
                localStorage.setItem('userInfo', JSON.stringify(res.body))
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
    const submitData = async (body, id) => {
        try {
            const res = await PutMethod({
                url: 'user/updatePatientData',
                id: id,
                body: body
            })
            setUserInfo(res.body)
            Toast.fire({
                icon: 'success',
                title: 'Data Updated !'
            })
        } catch (err) {
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
        <AuthContext.Provider value={{ login, logout, submitData, isLoading, userToken, userInfo, userRole }}>
            {children}
        </AuthContext.Provider>
    )
}
