import React, { useEffect, useState } from 'react'
import "/src/pages/dashboard/userFavoriteProperties/styles.css"
import { BsFillHouseSlashFill } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import axiosApi from '../../../services'
import { UseAuth } from '../../../hooks'
import { IProperty } from '../../../interfaces'
import { IPhoto } from '../../../interfaces'
import { UserPropertyCard } from '../../../components/card/userProperty'
import { Button } from 'react-bootstrap'
import { ModalComponent } from '../../../components/modal'

export const UserProperties = () => {
  
  const navigate = useNavigate()
  const { user } = UseAuth()

  const [properties, setProperties] = useState<IProperty[]>([])
  const [imagesByProperty, setImagesByProperty] = useState<{ [propertyId: string]: string[] }>({});

  const [successMessage, setSuccessMessage] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<boolean>(false)

  const getUserProperties = async () => {
    try {
      const response = await axiosApi.get(`/property/user/${user.id}`)
      setProperties(response.data)
    }catch(e){
      console.error(`Error: ${e}`)
    }
  }
  
  const handleDelete = async (property: string) => {
    try{
      await axiosApi.delete(`/property?propertyId=${property}`)
      setSuccessMessage(true)
    }catch(e){
      setErrorMessage(true)
    }
  } 
  useEffect(() => {
    getUserProperties()
  },[])

  const handleClose = () => {
    setTimeout(() => {
      window.location.reload()
    }, 500)}

  useEffect(() => {
    const updatedImagesByProperty: { [propertyId: string]: string[] } = {};

    properties.forEach((property: IProperty) => {
      const propertyId = property.id;
      const propertyImages: string[] = [];

      property.photo.forEach((photo: IPhoto) => {
        propertyImages.push(photo.fileUrl);
      });

      updatedImagesByProperty[propertyId] = propertyImages;
    });

    setImagesByProperty(updatedImagesByProperty);
    console.log(imagesByProperty)
  }, [properties]);

  return (
    <>
        <div className='position-absolute m-2'>
        <Button onClick={() => navigate("/DashBoard/PostProperty")}>Anunciar novo imóvel</Button>
        </div>
    { properties.length ? 
    <>
      <div className='card-container'>
        {properties.map((property, index) => (
          <UserPropertyCard
              key={index}
              square={property.squareFeet}
              images={imagesByProperty[property.id] || []}
              price={property.price}
              city={property.city}
              address={property.address}
              bathroom={property.bathroom}  
              room={property.room}
              onDelete={() => handleDelete(`${property.id}`)}
              onUpdate={() => navigate(`/DashBoard/UpdateProperty/${property.id}`)}
              propertyLink={`/PropertyPage/${property.id}`}
            />
            ))}
       </div>
      </> 
      : 
      <div className='not-found-container'>
        <BsFillHouseSlashFill size={100} color={"#6E6969"}/>
        <h1 className='not-found-text'>Nenhum imóvel anunciado</h1>
      </div>}
    <ModalComponent 
        success={successMessage === true ? true : false}
        onShow={successMessage === true ? successMessage : errorMessage}
        onClose={handleClose}
        modalTitle={successMessage === true ? 'Imóvel removido com sucesso!' : 'Algo deu errado. Tente novamente mais tarde.'}/>
    </>
  )
}
