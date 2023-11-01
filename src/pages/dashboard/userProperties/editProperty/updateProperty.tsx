import React, { useState, ChangeEvent, ChangeEventHandler, useEffect } from 'react'
import { BsFillHouseSlashFill } from "react-icons/bs"
import axiosApi from '../../../../services'
import { IPhoto, IProperty } from '../../../../interfaces'
import { UseAuth } from '../../../../hooks'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const UpdateProperty = () => {

  const { user } = UseAuth()
  const { id } = useParams()

  const UF = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

  const [cities, setCities] = useState<string[]>([])

  const [successShow, setSuccessShow] = useState<boolean>(false)
  const [errorShow, setErrorShow] = useState<boolean>(false)

  const [property, setProperty] = useState<IProperty>()

  const getPropertyById = async () => {
    try {
      const response = await axiosApi.get(`/property/${id}`)
      const data = response.data[0]
      if (response.status === 200) {
        console.log(data)
        loadCities(data.state)
        setProperty(data)
        setPropertyState(
          {
            description: data.description,
            state: data.state,
            city: data.city,
            cep: data.cep,
            neighborhood: data.neighborhood,
            street: data.street,
            propertyType: data.propertyType,
            houseFloors: data.houseFloors,
            buildingFloor: data.buildingFloor,
            squareFeet: data.squareFeet,
            typeNegotiation: data.typeNegotiation,
            price: data.price,
            room: data.room,
            bathroom: data.bathroom,
            garage: data.garage,
            pool: data.pool,
            sauna: data.sauna,
            photo: data.photo,
          }
        )

      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getPropertyById()
  }, [])


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
    setPropertyState({ ...propertyState, state: uf })

  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setPropertyState({ ...propertyState, city: city })
  }

  
  const [propertyState, setPropertyState] = useState<any>()
  
  const [selectedImages, setSelectedImages] = useState<{ file: File; base64: string }[]>([]);
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // console.log(event.target.value)
    console.log(event.target)
    const { name, value } = event.target
    console.log(propertyState.street)
    setPropertyState({ ...propertyState, [name]: value })
  }

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject(new Error('Failed to read the file as a base64 string.'));
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const selectedFiles = Array.from(files)
      Promise.all(
        selectedFiles.map(async (file) => {
          const base64 = await readFileAsBase64(file)
          return { file, base64 }
        })
      ).then((base64Images) => {
        setSelectedImages([...selectedImages, ...base64Images])
      });
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const selectedFiles = Array.from(files)
      Promise.all(
        selectedFiles.map(async (file) => {
          const base64 = await readFileAsBase64(file)
          return { file, base64 }
        })
      ).then((base64Images) => {
        setSelectedImages([...selectedImages, ...base64Images])
      });
    }
  }



  const handleRemoveImage = (index: number) => {
    const newImages = [...selectedImages]
    newImages.splice(index, 1)
    setSelectedImages(newImages)
  };
  const photos = selectedImages.map((image) => {
    const base64Data = image.base64.indexOf(',')
    const base64Image = base64Data !== -1 ? image.base64.substring(base64Data + 1) : image.base64

    return {
      documentType: 'image',
      suffix: 'png',
      major: false,
      active: true,
      base64Image: base64Image,
    }
  })

  const updateProperty = async () => {
    console.log(propertyState)
    try {
      const response = await axiosApi.put(`/property/${property?.id}`, propertyState)
      console.log(response)
      if (response.status === 201) {
        setSuccessShow(true)
      }
    } catch (e) {
      console.error(e)
      setErrorShow(true)
    }
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">Atualizar Anúncio</h1>
      <form>
        <div className="row g-3">
          <div className="col-md-12">
            <label htmlFor="titulo" className="form-label">
              Imóvel
            </label>
            <input
              placeholder='Digite o Titulo do imóvel'
              type="text"
              className="form-control"
              id="titulo"
              name="titulo"
              value={`${property?.street} - ${property?.neighborhood}`}
              defaultValue={`${property?.street} - ${property?.neighborhood}`}
              readOnly
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="descricao" className="form-label">
              Descrição
            </label>
            <textarea
              placeholder='Digite a descrição do imóvel'
              className="form-control"
              id="description"
              name="description"
              value={propertyState?.description}
              defaultValue={property?.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange(e)}
              rows={4}
              required
            ></textarea>
          </div>
          <div className="col-md-2">
            <label htmlFor="endereco" className="form-label">
              Bairro
            </label>
            <input
              placeholder='Insira o bairro'
              type="text"
              name='neighborhood'
              className="form-control"
              value={property?.neighborhood}
              defaultValue={property?.neighborhood}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="endereco" className="form-label">
              Rua
            </label>
            <input
              placeholder='Insira a rua'
              type="text"
              name='street'
              className="form-control"
              value={propertyState?.street}
              defaultValue={property?.street}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="cep" className="form-label">
              CEP
            </label>
            <input
              placeholder='Insira o CEP do imóvel'
              type="text"
              className="form-control"
              id="cep"
              name="cep"
              value={propertyState?.cep}
              defaultValue={property?.cep}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              required
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="UF" className="form-label">
              Estado
            </label>
            <select className="form-select" id="tipoimovel" aria-label="Dropdown Example" defaultValue={property?.state}
              onChange={handleSelectUf} >
              {UF.map((uf) => (
                <option value={uf} selected={property?.state == uf}>{uf}</option>
              ))}
            </select>
          </div>
          {property?.state && (
            <div className="col-md-2">
              <label htmlFor="cidade" className="form-label">
                Cidade
              </label>
              <select className="form-select" id="tipoimovel" aria-label="Dropdown Example" defaultValue={property?.city} onChange={handleSelectCity} >
                {cities.map((city) => (
                  <option value={city} selected={property?.city == city}>{city}</option>
                ))}
              </select>
            </div>
          )}
          <div className="col-md-4">
            <label htmlFor="tipoImovel" className="form-label">
              Tipo do Imóvel
            </label>
            <select className="form-select" id="tipoimovel" aria-label="Dropdown Example">
              <option value="" disabled selected>Selecione o tipo do imóvel</option>
              <option value="option1">Casa</option>
              <option value="option2">Apartamento</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="tipoImovel" className="form-label">
              Qual o tipo da operação?
            </label>
            <select className="form-select" id="tioImovel" aria-label="Dropdown Example">
              <option value="" disabled selected>Selecione a operação</option>
              <option value="option1">Aluguel</option>
              <option value="option2">Venda</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="andar" className="form-label">
              Andar do Imóvel
            </label>
            <input
              type="number"
              className="form-control"
              id="houseFloors"
              name="houseFloors"
              placeholder='opcional'
              value={Number(propertyState?.houseFloors)}
              defaultValue={Number(property?.houseFloors)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="buildingFloors" className="form-label">
              Total de Andares
            </label>
            <input
              type="number"
              name="buildingFloor"
              className="form-control"
              id="buildingFloor"
              defaultValue={Number(property?.buildingFloor)}
              value={Number(propertyState?.buildingFloor)}
              placeholder='opcional'
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="piscinas" className="form-label">
              Tem Piscina?
            </label>
            <select className="form-select" id="dropdownExample" aria-label="Dropdown Example">
              <option value="option2">Não</option>
              <option value="option1">Sim</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="saunas" className="form-label">
              Tem Sauna?
            </label>
            <select className="form-select" id="dropdownExample" aria-label="Dropdown Example">
              <option value="option2">Não</option>
              <option value="option1">Sim</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="room" className="form-label">
              Número de Quartos
            </label>
            <input
              type="number"
              className="form-control"
              id="room"
              name="room"
              placeholder='Ex: 2'
              value={Number(propertyState?.room)}
              defaultValue={Number(property?.room)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="bathroom" className="form-label">
              Número de banheiros
            </label>
            <input
              type="number"
              min={0}
              className="form-control"
              id="bathroom"
              name="bathroom"
              placeholder='Ex: 2'
              value={Number(propertyState?.bathroom)}
              defaultValue={Number(property?.bathroom)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="garage" className="form-label">
              Número de Garagens
            </label>
            <input
              type="number"
              className="form-control"
              id="garage"
              name="garage"
              placeholder='Ex: 2'
              value={Number(propertyState?.garage)}
              defaultValue={Number(property?.garage)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="price" className="form-label">
              Preço
            </label>
            <input
              placeholder='R$0,00'
              min={0}
              type="number"
              className="form-control"
              id="price"
              name="price"

              value={Number(propertyState?.price)}
              defaultValue={Number(property?.price)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              required
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="squareFeet" className="form-label">
              Quantos m² tem o imóvel
            </label>
            <input
              type="number"
              className="form-control"
              id="squareFeet"
              name="squareFeet"
              placeholder='Ex: 70'
              min={0}
              value={Number(propertyState?.squareFeet)}
              defaultValue={Number(property?.squareFeet)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="imagens" className="form-label">
              Upload de Imagens
            </label>
            <input
              type="file"
              className="form-control"
              id="imagens"
              name="imagens"
              accept="image/*"
              multiple
            onChange={handleImageUpload}
            />
          </div>


          <div className="row ">
            {propertyState?.photo && propertyState?.photo.map((image: any, index: number) => (
              <div className="col-md-3" key={index}>
                <div className="card">
                  <img
                    src={image.fileUrl}
                    className="card-img-top"
                    alt="..."
                  />

                  <div className="card-body">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
      <button type="submit" className="btn btn-primary mt-3" onClick={() => { updateProperty() }}>
        Atualizar Imóvel
      </button>
    </div>
  )
}
