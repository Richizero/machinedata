import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import instance from '../utils/fetch'
import './ListMachine.css'
import Card from '../components/Card'
import { MdAddCircle } from "react-icons/all"
import Spinner from "../components/Spinner"


const ListMachines = () => {
    const [machines, setMachines] = useState([])
    const [Isloaded, setIsloaded] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const { machines } = await instance.machine.get()
            setMachines(machines)
            setIsloaded(true)
        }
        fetchData()
    }, [])


    const handleDelete = async (id) => {
        await instance.machine.delete(id)
        const machinesFiltered = machines.filter(machine => machine.id !== id)
        setMachines(machinesFiltered)
    }


    return (
        <>
            {Isloaded ? <>   <Link to='/machine/new'>
                <button><MdAddCircle /></button>
            </Link>
                <ul className='card-container'>
                    {machines.map(machine => {
                        return (
                            <li key={machine.id}>
                                <Card id={machine.id} nameMachine={machine.nameMachine} handleDelete={handleDelete} />
                            </li>
                        )
                    })}
                </ul>
            </> : <Spinner />}
        </>
    )
}

export default ListMachines
