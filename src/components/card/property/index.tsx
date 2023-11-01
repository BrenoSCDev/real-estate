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

export const PropertyCard: React.FC<IPropertyCardProps> = ({ images, city, surname, address, bathroom, room, propertyLink, price, square, typeNegotiation ,isFav, onFav }) => {
  const navigate = useNavigate()
  const formattedPrice = price?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  
    return (
        <>
        <Card style={{ width: '30em', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', border: 'none', cursor: 'pointer', }}>
          <CarouselComponent images={images}/>
          <div className='row pt-4'>
            <Card.Text className='col m-2 mr-auto'>
              <span className='text-success fs-4'>
              {formattedPrice}{typeNegotiation === 'RENT' ? (<span>/mês</span>) : ''} 
              </span>
            </Card.Text>
            <span className='col-2' onClick={onFav}>
              {isFav ? <RiHeartFill size={45} color={'#007bff'}/> : <RiHeartAddLine size={45} color={'#007bff'}/>}  
            </span>
            {typeNegotiation === 'RENT' ? (<span className='m-2'>Aluguel</span>) : (<span className='m-2'>Venda</span>)}
          </div>  
          <Card.Body  onClick={() => navigate(propertyLink)}>
            <Card.Text className='fs-3'>{address}</Card.Text>
            <Card.Text className='fs-5 text'>{city}</Card.Text>
          </Card.Body>
          <Card.Body>
          <div className='row'>
            <div className='col-4' style={{color: '#C1C1C1'}}><BiBed size={20} color={'#C1C1C1'}/>{room} Rooms</div>
            <div className='col-4' style={{color: '#C1C1C1'}}><PiToilet size={20} color={'#C1C1C1'}/>{bathroom} Bathrooms</div>
            <div className='col-4' style={{color: '#C1C1C1'}}><BiArea size={20} color={'#C1C1C1'}/>{square} m² </div>
          </div>
          </Card.Body>
        </Card>
        </>
      )
}
