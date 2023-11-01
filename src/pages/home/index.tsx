import { useState, useEffect, ChangeEvent } from 'react'
import { PropertyCard } from '../../components/card/property'
import { useNavigate } from 'react-router-dom'
import "./styles.css"
import axios from 'axios'
import { IBGECITYResponse } from '../../interfaces'

export const Home = () => {
  const [selectedNegotiation,setSelectedNegotiation] = useState("0")
  const [selectedProperty,setSelectedProperty] = useState("0")
  const [selectedUf, setSelectedUf] = useState("0")
  const [selectedCity, setSelectedCity] = useState("0") 

  const UF = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

  
  const [cities, setCities] = useState<IBGECITYResponse[]>([])
    
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
    const negotiation = event.target.value;
    negotiation === "1" ? setSelectedNegotiation("SALE") : setSelectedNegotiation("RENT")
  }

  function handlePropertyType(event: ChangeEvent<HTMLSelectElement>) {
    const type = event.target.value;
    type === "1" ? setSelectedProperty("HOUSE") :
    type === "2" ? setSelectedProperty("APARTMENT") :
    type === "3" ? setSelectedProperty("") :
    setSelectedProperty("")
  }
  const handleSearchRedirect = () => {
      const queryParams = {
        propertyType: selectedProperty === "0" ? undefined : selectedProperty,
        typeNegotiation: selectedNegotiation === "0" ? undefined : selectedNegotiation,
        state: selectedUf === "0" ? undefined : selectedUf,
        city: selectedCity === "0" ? undefined : selectedCity,
      }
      const queryString = JSON.stringify(queryParams)
      navigate(`PropertiesPage/${queryString}`)
  }
  
  const propertiesArr = [
    {
      id: 1,
      images: {
        id: 1,
        fileURL: 
        [
          'https://img.freepik.com/fotos-gratis/bairro-residencial-moderno-com-telhado-verde-e-varanda-gerado-por-ia_188544-10276.jpg?w=1380&t=st=1692635812~exp=1692636412~hmac=9b57b2bb9e5ab9c56d6948b8064131472bc4c996d48b8e9c81356349d029c354',
          'https://img.freepik.com/fotos-gratis/villa-com-piscina-de-luxo-espetacular-design-contemporaneo-arte-digital-imoveis-casa-casa-e-propriedade-ge_1258-150749.jpg?w=1380&t=st=1693335076~exp=1693335676~hmac=8acffe199124cd9eb2e8f386bf3a64229a59963514c356c4d72eb4a9fa4d84e0',
        ],
      },
      surname: 'Casa grande',
      price: 800000,
      city: 'Goiânia',
      address: 'Setor Parque Amazônia',
      toilets: 2,
      beds: 3,
      square: 60
    },
    {
      id: 1,
      images: {
        id: 1,
        fileURL: 
        [
          'https://img.freepik.com/fotos-gratis/villa-com-piscina-de-luxo-espetacular-design-contemporaneo-arte-digital-imoveis-casa-casa-e-propriedade-ge_1258-150749.jpg?w=1380&t=st=1693335076~exp=1693335676~hmac=8acffe199124cd9eb2e8f386bf3a64229a59963514c356c4d72eb4a9fa4d84e0',
          'https://img.freepik.com/fotos-gratis/bairro-residencial-moderno-com-telhado-verde-e-varanda-gerado-por-ia_188544-10276.jpg?w=1380&t=st=1692635812~exp=1692636412~hmac=9b57b2bb9e5ab9c56d6948b8064131472bc4c996d48b8e9c81356349d029c354',
        ],
      },
      surname: 'Casa grande',
      price: 800000,
      city: 'Goiânia',
      address: 'Setor Parque Amazônia',
      toilets: 2,
      beds: 3,
      square: 60
    },
    {
      id: 1,
      images: {
        id: 1,
        fileURL: 
        [
          'https://img.freepik.com/fotos-gratis/bairro-residencial-moderno-com-telhado-verde-e-varanda-gerado-por-ia_188544-10276.jpg?w=1380&t=st=1692635812~exp=1692636412~hmac=9b57b2bb9e5ab9c56d6948b8064131472bc4c996d48b8e9c81356349d029c354',
          'https://img.freepik.com/fotos-gratis/villa-com-piscina-de-luxo-espetacular-design-contemporaneo-arte-digital-imoveis-casa-casa-e-propriedade-ge_1258-150749.jpg?w=1380&t=st=1693335076~exp=1693335676~hmac=8acffe199124cd9eb2e8f386bf3a64229a59963514c356c4d72eb4a9fa4d84e0',
        ],
      },
      surname: 'Casa grande',
      price: 800000,
      city: 'Goiânia',
      address: 'Setor Parque Amazônia',
      toilets: 2,
      beds: 3,
      square: 60
    },
  ]

  const navigate = useNavigate()
  return (
    <>
        <div className="container-fluid header bg-white p-0 banner">
            <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
                <div className="col-md-12 p-5 mt-lg-5">
                    <h1 className="text-primary">Descubra o Imóvel dos Seus Sonhos em um Clique!</h1>
                    <p className="animated fadeIn mb-4 pb-2" style={{color: 'white'}}>Simples, Rápido e Sob Medida.</p>
                    <button className="btn btn-primary py-3 px-5 me-3" onClick={() => navigate('/PropertiesPage/{}')}>Ver Imóveis</button>
                </div>
            </div>
        </div>
  

        <div className="container-fluid bg-primary mb-5 wow fadeIn" data-wow-delay="0.1s" style={{padding: "35px"}}>
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
                                <select className="form-select border-0 py-3" name="City" id="City" value={selectedCity} onChange={handleSelectCity}>
                                  <option selected>Cidade</option>
                                  {cities.map((city: any) => (
                                    <option value={city}>{city}</option>
                                  ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-dark border-0 w-100 py-3" onClick={handleSearchRedirect}>Procurar</button>
                    </div>
                </div>
            </div>
        </div>
        
    <div className="title-container">
      <h1 className="mb-3">Imóveis em destaque</h1>
    </div>

    <div className="card-container">
    {propertiesArr.map((property, index) => (
      <PropertyCard
      key={index}
      square={property.square}
      surname={property.surname}
      price={property.price}
      images={property.images.fileURL}
      city={property.city}
      address={property.address}
      bathroom={property.toilets}
      room={property.beds}
      propertyLink={`/PropertyPage/${property.id}`}
      />
      ))}
    </div>
    </>
  )
}
