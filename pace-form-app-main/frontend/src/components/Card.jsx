import React from 'react'
import './Card.css'
import { Link } from "react-router-dom"
import { BsFillTrashFill } from "react-icons/bs";

const Card = ({id, nameMachine, handleDelete}) => {
    return (
        <>
            <div className='card'>
                <Link to={'/machine/' + id}>{nameMachine}</Link>
                <BsFillTrashFill className='button-delete' onClick={() => handleDelete(id)}>delete</BsFillTrashFill>
            </div>
        </>
    )
}

export default Card

