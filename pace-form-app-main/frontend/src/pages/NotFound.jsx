import React, { useEffect, useState } from 'react'
import './NotFound.css'
import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const [time, setTime] = useState(4)
    const navigate = useNavigate()

    useEffect(() => {

        const interval = setInterval(() => {
            setTime(time - 1)
            if (time < 1) {
                navigate('/')
            }
        }, 1000)

        return () => clearInterval(interval)

    }, [time])


    return (
        <div className='container'>
            <div className='message'>
                <h1>Redirection in {time} seconds</h1>
                <button onClick={() => navigate('/')}>Return Home</button>
            </div>

            <figure className='background'>
                <div className='sad-mac' />
                <figcaption>
                    <span className='sr-text'>Error 404: Not Found</span>
                    <span className='e' />
                    <span className='r' />
                    <span className='r' />
                    <span className='o' />
                    <span className='r' />
                    <span className='_4' />
                    <span className='_0' />
                    <span className='_4' />
                    <span className='n' />
                    <span className='o' />
                    <span className='t' />
                    <span className='f' />
                    <span className='o' />
                    <span className='u' />
                    <span className='n' />
                    <span className='d' />
                </figcaption>
            </figure>
        </div>
    )
}

export default NotFound
