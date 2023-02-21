import React, { useEffect, useState } from 'react'
import './App.css'
import ListMachines from "./pages/ListMachines"
import Machine from "./pages/Machine"
import NewMachine from "./pages/NewMachine"
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom"
import Login from "./pages/Login"
import ProtectedRoutes from "./pages/ProtectedRoutes"
import NotFound from "./pages/NotFound"
import instance from "./utils/fetch"

const App = () => {
    const [user, setUser] = useState('')
    const [activeSpinner, setActiveSpinner] = useState(false)
    const [alert, setAlert] = useState(null)


    useEffect(() => {
        const loggedUser = window.localStorage.getItem('token')
        if (loggedUser) {
            const { username } = JSON.parse(loggedUser)
            setUser(username)
        }

    }, [])


    const sendSubmit = async (e) => {
        e.preventDefault()

        if (!e.target.user.value || !e.target.pass.value) {

            setAlert("complete all fields")
            return ''
        }


        setActiveSpinner(true)

        const user = {
            username: e.target.user.value,
            password: e.target.pass.value
        }

        const response = await instance.login.login(user)

        if (!response) {
            setAlert('the user or password is incorrect')
            setActiveSpinner(false)
            return
        }


        if (response) {
            setUser(response.username)
            window.localStorage.setItem('token', JSON.stringify(response))
            setActiveSpinner(false)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('token')
        setAlert('')
        setUser('')
        setAlert(false)
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={
                        <Login alert={alert} user={user} sendSubmit={sendSubmit} handleLogout={handleLogout} activeSpinner={activeSpinner} setAlert={setAlert} />} />

                    <Route path='/list' element={
                        <ProtectedRoutes user={user}>
                            <ListMachines />
                        </ProtectedRoutes>} />

                    <Route path='/machine/:id' element={
                        <ProtectedRoutes user={user}>
                            <Machine />
                        </ProtectedRoutes>} />

                    <Route path='/machine/new' element={
                        <ProtectedRoutes user={user}>
                            <NewMachine />
                        </ProtectedRoutes>} />

                    <Route path='*' element={<NotFound />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
