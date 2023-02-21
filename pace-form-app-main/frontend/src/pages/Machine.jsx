import React, { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate, useParams } from "react-router-dom"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import instance from "../utils/fetch"
import Turno from "./Turno"
import { dateToSend } from "../utils/formatDates"
import logo from "../assets/logo.png"
import './Machine.css'

const Machine = () => {

    let navigate = useNavigate()
    const [machine, setMachine] = useState({})
    const { id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [dateSend, setDateSend] = useState(dateToSend)   //2022-12-15 format
    const [fecha, setFecha] = useState({ turnos: [{}, {}, {}] })
    const [active, setActive] = useState("1")
    const [tabIndex, setTabIndex] = useState(0)

    useEffect(() => {
        console.log(dateSend)
        const fetchData = async () => {
            const machine = await instance.machine.getOne(id)
            setMachine(machine)
            fetchDateInformation(dateSend)
        }
        fetchData()
        setIsLoaded(true)

    }, [])


    const handleDate = async (e) => {
        const inputDate = e.target.value
        setDateSend(inputDate)
        fetchDateInformation(inputDate)
    }

    const fetchDateInformation = async (inputDate) => {
        const dateReceived = await instance.machine.getDate(id, inputDate)
        setFecha(dateReceived)
    }


    const handleBack = () => {
        navigate('/')
    }

    const handleTab = (e) => {
        e.preventDefault()
        const currentPositionY = window.scrollY
        const numberButton = e.target.getAttribute('name')

        setActive(numberButton)

        setTimeout(() => {
            //this is because when change of turno, scroll in Y change idk why, this return the same place
            window.scrollTo(0, currentPositionY)
        }, .05)
    }


    return (
        <section className='main'>
            <div className='x'>
                <img className='logo-space' src={logo} alt='logo-space' />
            </div>

            <div className='group-row'>
                <button onClick={handleBack}>Back</button>
                <input className='picker' name='fecha' onChange={handleDate} type='date' value={dateSend} />
            </div>

            {fecha?.turnos?.[0] || fecha?.turnos?.[1] || fecha?.turnos?.[2] ?
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className='flex-row btn-sticky-top'>
                        <Tab name='1' onClick={handleTab} className={`button btn-turno ${active === "1" ? "active" : ""}`} autoFocus={true}>Turno 1</Tab>
                        <Tab name='2' onClick={handleTab} className={`button btn-turno ${active === "2" ? "active" : ""}`}>Turno 2</Tab>
                        <Tab name='3' onClick={handleTab} className={`button btn-turno ${active === "3" ? "active" : ""}`}>Turno 3</Tab>
                    </TabList>

                    <section>
                        <h3 className='title-machine'>Name Machine</h3>
                        <input name='nameMachine' type='text' value={machine.nameMachine || ''} disabled inputMode='numeric' />
                        <h3 className='title-machine'>Number Part</h3>
                        <input name='nPart' type='number' value={machine.nPart || ''} disabled inputMode='numeric' />
                        <h3 className='title-machine'>Number Model</h3>
                        <input name='nModel' type='number' value={machine.nModel || ''} disabled inputMode='numeric' />
                    </section>

                    <TabPanel><Turno turn={'turno1'} isLoaded={isLoaded} date={dateSend} setMachine={setMachine} setFecha={setFecha} machine={machine} turno={fecha || {}} /></TabPanel>
                    <TabPanel><Turno turn={'turno2'} isLoaded={isLoaded} date={dateSend} setMachine={setMachine} setFecha={setFecha} machine={machine} turno={fecha || {}} /></TabPanel>
                    <TabPanel><Turno turn={'turno3'} isLoaded={isLoaded} date={dateSend} setMachine={setMachine} setFecha={setFecha} machine={machine} turno={fecha || {}} /></TabPanel>
                </Tabs> :
                <>
                    <h3 className='center-text'>dont exist data of this machine</h3>
                    <h3 className='center-text'>🤔🤔🤔</h3>
                </>}

        </section>
    )
}

export default Machine
