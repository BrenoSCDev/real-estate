import React from 'react'
import { PiToilet } from 'react-icons/pi'
import { BiBed, BiArea } from 'react-icons/bi'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IPropertyCardProps } from '../../interfaces'
import { RiHeartAddLine, RiHeartFill } from "react-icons/ri"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CarouselComponent from '../../carousel'
import {FaLink} from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { BsFillTrashFill } from 'react-icons/bs'
import { RxUpdate } from 'react-icons/rx'
import { AiFillEye } from 'react-icons/ai'

export const UserPropertyCard: React.FC<IPropertyCardProps> = ({ images, city, address, price, propertyLink, onUpdate, onDelete }) => {
  const formattedPrice = price?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const navigate = useNavigate()
    return (
        <>
        <Card style={{ width: '30em', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', border: 'none', cursor: 'pointer', height: 'fit-content'}}>
        <CarouselComponent images={images}/>
        <div className='row pt-4'>
          <Card.Text className='col m-2 mr-auto'><span className='text-success fs-4'>{formattedPrice}</span></Card.Text>
        </div>
        <Card.Body>
          <Card.Text className='fs-3'>{address}</Card.Text>
          <Card.Text className='fs-5 text'>{city}</Card.Text>
        <span>
        <Button variant='danger' className='btn-md m-1' onClick={onDelete}><BsFillTrashFill size={18}/>Deletar</Button>
        <Button variant='primary' className='btn-md m-1' onClick={onUpdate}><RxUpdate size={18}/>Atualizar</Button>
        <Button variant='secondary' className='btn-md m-1' onClick={() => navigate(propertyLink)}><AiFillEye size={18}/>Visualizar</Button>
        </span>
        </Card.Body>
      </Card>
        </>
        )
}
