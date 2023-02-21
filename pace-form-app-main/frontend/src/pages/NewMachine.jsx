import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import instance from "../utils/fetch"
import logo from "../assets/logo.png"
import './NewMachine.css'

const NewMachine = () => {
    let navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const  tokenString  = window.localStorage.getItem('token')
        const {token} = JSON.parse(tokenString)


        const newMachine = {
            nameMachine: e.target.machineNumber.value,
            nPart: e.target.partNumber.value,
            nModel: e.target.modelNumber.value,
        }

        const response = await instance.machine.create(newMachine, token)
        console.log(response)

        navigate('/')
    }

    return (
        <>
            <div className='x'>
                <img className='logo-space' src={logo} alt='logo-space' />
            </div>
            <form onSubmit={handleSubmit}>
                <input name='machineNumber' className='flex' type='text' placeholder='Machine Number' />
                <input name='partNumber' className='flex' type='number' placeholder='Part Number' inputMode='numeric' />
                <input name='modelNumber' className='flex' type='number' placeholder='Model Number' inputMode='numeric' />
                <div className='group'>
                    <button onClick={() => navigate('/')}>Cancel</button>
                    <button>Save</button>
                </div>

            </form>
        </>
    )
}

export default NewMachine