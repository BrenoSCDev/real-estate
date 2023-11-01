import React, { useEffect, useState, ChangeEvent } from 'react'
import { PropertyCard } from '../../components/card/property'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import {BsHouseSlashFill } from "react-icons/bs"
import { UseAuth } from '../../hooks'
import axiosApi from '../../services'
import { IProperty } from '../../interfaces'
import { IPhoto } from '../../interfaces'
import "./styles.css"
import { IBGECITYResponse } from '../../interfaces'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Pagination } from '../../components/pagination'


export const PropertiesPage = () => {
  const [cities, setCities] = useState<IBGECITYResponse[]>([])
  const [selectedNegotiation,setSelectedNegotiation] = useState("0")
  const [selectedProperty,setSelectedProperty] = useState("0")
  const [selectedUf, setSelectedUf] = useState("0")
  const [selectedCity, setSelectedCity] = useState("0")
  const { params } = useParams()
  const paramsObj = params ? JSON.parse(params) : null
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [properties, setProperties] = useState<IProperty[]>([])
  const [imagesByProperty, setImagesByProperty] = useState<{ [propertyId: string]: string[] }>({})
  const itemsPerPage = 6
  const totalPages = 3
  console.log(properties?.length)

  const UF = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

    
  const loadCities = async (uf: string) => {
  try {
    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
    const data = response.data
    if (response.status === 200) {
      setCities(data.map((city: any) => city.nome))
    }
  } catch (e) {
    console.log(e)
  }
} 


function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
  const uf = event.target.value;
  loadCities(uf);
  setSelectedUf(uf)

}

function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
  const city = event.target.value;
  setSelectedCity(city)
}



  function handleSelectNegotiation(event: ChangeEvent<HTMLSelectElement>) {
    const negotiation = event.target.value
    negotiation === "1" ? setSelectedNegotiation("SALE") : setSelectedNegotiation("RENT")
  }

  function handlePropertyType(event: ChangeEvent<HTMLSelectElement>) {
    const type = event.target.value
    type === "1" ? setSelectedProperty("HOUSE") :
    type === "2" ? setSelectedProperty("APARTMENT") :
    type === "3" ? setSelectedProperty("SHED") :
    setSelectedProperty("BATCH")
  }


  const [fav, setFav] = useState<boolean>(false)

  const getProperties = async () => {
    console.log(selectedCity, selectedUf)
    try {
      const response = await axiosApi.get(`/property?active=true&size=${itemsPerPage}&page=${currentPage}`, {params: paramsObj})
      setProperties(response.data)
      
    }catch(e){
      console.error(`Error: ${e}`)
    }
  }

  
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const handleSearch = async () => {
    try {
      const queryParams = {
        propertyType: selectedProperty === "0" ? undefined : selectedProperty,
        typeNegotiation: selectedNegotiation === "0" ? undefined : selectedNegotiation,
        state: selectedUf === "0" ? undefined : selectedUf,
        city: selectedCity === "0" ? undefined : selectedCity,
      }
      const response = await axiosApi.get(`/property?active=true&size=${itemsPerPage}&page=${currentPage}`, { params: queryParams })
      setProperties(response.data);
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

  useEffect(() => {
    getProperties()
  },[currentPage]) 

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
  }, [properties]);

  const { user } = UseAuth()

  const handleFav = async (propertyId: number) => {
    const favBodyReq = {
      property: {"id": propertyId},
      user: {"id": user.id},
    }
    const response = await axiosApi.post('/favorite', favBodyReq)
    if(response.status === 201){
      setFav(true)
    }
    console.log(response)
  }
  return (
    <>
            <div className="container-fluid bg-secondary mb-5 wow fadeIn" data-wow-delay="0.1s" style={{padding: "35px"}}>
            <div className="container">
                <div className="row g-2">
                    <div className="col-md-10">
                        <div className="row g-2">
                        <div className="col-md-3">
                                <select className="form-select border-0 py-3" onChange={handlePropertyType}>
                                    <option selected>Tipo de imóvel</option>
                                    <option value="1">Casa</option>
                                    <option value="2">Apartamento</option>
                                    <option value="3">Galpão</option>
                                    <option value="3">Terreno</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select border-0 py-3" onChange={handleSelectNegotiation}>
                                    <option selected>Operação</option>
                                    <option value="1">Venda</option>
                                    <option value="2">Aluguel</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select border-0 py-3" name="uf" id="uf" onChange={handleSelectUf}>
                                  <option selected >Estado</option>
                                  {UF.map((uf) => (
                                  <option value={uf}>{uf}</option>
                                  ))}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select border-0 py-3" name="City" id="City" value={selectedCity}onChange={handleSelectCity}>
                                  <option selected>Cidade</option>
                                  {cities.map((city: any) => (
                                    <option value={city}>{city}</option>
                                  ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-dark border-0 w-100 py-3" onClick={handleSearch}>Procurar</button>
                    </div>
                </div>
            </div>
        </div>
    { properties.length ? 
    <>
      <div className='card-container'>
        {properties.map((property, index) => (
          <PropertyCard
          key={index}
          typeNegotiation={property.typeNegotiation}
          square={property.squareFeet}
          onFav={() => handleFav(property.id)}
          isFav={fav}
          images={imagesByProperty[property.id] || []}
          price={property.price}
          city={property.city}
          address={property.address}
          bathroom={property.bathroom}  
          room={property.room}
          propertyLink={`/PropertyPage/${property.id}`}
          />
          ))}
        </div>
      <Pagination 
      totalPages={totalPages}
      handlePageClick={handlePageClick}
      />
      </>
      : 
      <div className='not-found-container'>
        <BsHouseSlashFill size={100} color={"#6E6969"}/>
        <h1 className='not-found-text'>Nenhum imóvel encontrado</h1>
      </div>}
    </>
  )
}
