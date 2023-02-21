import React, { useEffect, useState } from 'react'
import '../App.css'
import ListMachines from "./ListMachines"
import './Login.css'
import logo from '../assets/logo.png'

function App({ user, sendSubmit, activeSpinner, handleLogout, alert, setAlert }) {

    const handleChange = (e) => {
        console.log(e.target.value)
        if (alert) {
            setAlert(null)
        }
    }


    return (
        <>
            {!user ?
                <div>
                    <form className='login' onSubmit={sendSubmit}>
                        <div className='flex te'>
                            <img src={logo} alt='' />
                            <input onChange={handleChange} placeholder='User' name='user' type='text' />
                            <input onChange={handleChange} placeholder='Password' name='pass' type='password' autoComplete='on' />
                            <span className='alert'>{alert}</span>
                            <button className={`buttonNew ${activeSpinner ? "button-loading" : null}`}>
                                <span className='button-text'>Log in</span>
                            </button>
                        </div>
                    </form>
                </div>
                : <>
                    <div className='x'>
                        <img className='logo-space' src={logo} alt='logo-space' />
                    </div>
                    <button onClick={handleLogout}>logout</button>
                    <ListMachines />
                </>
            }
        </>
    )
}

export default App

