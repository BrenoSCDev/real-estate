import { useEffect, useState } from 'react'
import axiosApi from '../../../services'
import { UseAuth } from '../../../hooks'
import { IProperty } from '../../../interfaces'
import { PropertyCard } from '../../../components/card/property'
import { IPhoto } from '../../../interfaces'
import './styles.css'
import {IoMdHeartDislike} from 'react-icons/io'
import { ModalComponent } from '../../../components/modal'

export const FavoriteProperties = () => {
  const { user } = UseAuth()

  const [properties, setProperties] = useState<any[]>([])
  const [imagesByProperty, setImagesByProperty] = useState<{ [propertyId: string]: string[] }>({})

  const [successShow, setSuccessShow] = useState<boolean>(false)
  const [errorShow, setErrorShow] = useState<boolean>(false)

  const getFavoriteProperties = async () => {
    try{
      const response = await axiosApi.get(`favorite?userId=${user.id}`)
      console.log(response.data)
      setProperties(response.data)
    }catch(e){
      console.error(e)
    }
  }

  const handleRemoveFavoriteProperty = async (propertyId: number) => {
    try{
      const response = await axiosApi.delete(`favorite?propertyId=${propertyId}&ownerId=${user.id}&ownerType=user`)
      if(response.status === 200){
        setSuccessShow(true)
      }
    }catch(e){
      console.error(e)
      setErrorShow(true)
    }
  }

  const handleClose = () => {
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  useEffect(() =>{
    getFavoriteProperties()
  },[])

  useEffect(() => {
    const updatedImagesByProperty: { [propertyId: string]: string[] } = {};

    properties.forEach((property: IProperty) => {
      const propertyId = property.id;
      const propertyImages: string[] = [];

      property?.photo?.forEach((photo: IPhoto) => {
        propertyImages.push(photo.fileUrl);
      });

      updatedImagesByProperty[propertyId] = propertyImages;
    });

    setImagesByProperty(updatedImagesByProperty);
  }, [properties]);

  return (
    <>
    { properties.length ? 
    <>
      <div className='card-container'>
        {properties.map((property, index) => (
            <PropertyCard
              key={index}
              square={property.squareFeet}
              isFav={true}
              onFav={() => handleRemoveFavoriteProperty(property.id)}
              images={imagesByProperty[property.id] || []}
              price={property.price}
              city={property.city}
              address={property.address}
              bathroom={property?.bathroom}  
              room={property.room}
              propertyLink={`/PropertyPage/${property.id}`
              }
            />
          ))}
        </div>
      </>
      : 
      <div className='not-found-container'>
      <IoMdHeartDislike size={100} color={"#6E6969"}/>
      <h1 className='not-found-text'>Nenhum imóvel favoritado</h1>
    </div>}
    <ModalComponent 
        success={successShow === true ? true : false}
        onShow={successShow === true ? successShow : errorShow}
        onClose={handleClose}
        modalTitle={successShow === true ? 'Imóvel desfavoritado com sucesso!' : 'Algo deu errado. Tente novamente mais tarde.'}/>
    </>
  )
}
