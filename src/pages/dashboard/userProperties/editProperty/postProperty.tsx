import React, {useState, ChangeEvent, ChangeEventHandler, useEffect, useRef} from 'react'
import axiosApi from '../../../../services'
import { IProperty } from '../../../../interfaces'
import { UseAuth } from '../../../../hooks'
import { ModalComponent } from '../../../../components/modal'
import axios from 'axios'
import { IBGECITYResponse } from '../../../../interfaces'
import "./styles.css"
import { AiOutlineCloudUpload, AiOutlineSearch } from 'react-icons/ai'


export const PostProperty = () => {
  const {user} = UseAuth()
  const [surname, setSurname] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [state, setState] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [cep, setCep] = useState<string>("")
  const [neighborhood, setNeighborhood] = useState<string>("")
  const [street, setStreet] = useState<string>("")
  const [propertyType, setPropertyType] = useState<string>("HOUSE")
  const [houseFloors, setHouseFloors] = useState<number | null>(null)
  const [buildingFloor, setBuildingFloor] = useState<number | null>(null)
  const [squareFeet, setSquareFeet] = useState<number | null>(null)
  const [typeNegociation, setTypeNegociation] = useState<string>("SALE")
  const [price, setPrice] = useState<number | null>(null)
  const [room, setRoom] = useState<number | null>(null)
  const [bathroom, setBathRoom] = useState<number | null>(null)
  const [garage, setGarage] = useState<number | null>(null)
  const [pool, setPool] = useState<boolean>(false)
  const [sauna, setSauna] = useState<boolean>(false)
  const [selectedImages, setSelectedImages] = useState<{ file: File; base64: string }[]>([]);
  const [images, setImages] = useState<any[]>([]);
  
  const [successShow, setSuccessShow] = useState<boolean>(false)
  const [errorShow, setErrorShow] = useState<boolean>(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    if (files.length === 0) return;

    convertFilesToBase64(files).then((base64Images) => {
      setImages([...images, ...base64Images])
    });
  };
  console.log(images)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    convertFilesToBase64(files).then((base64Images) => {
      setImages([...images, ...base64Images]);
    });
  };

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const convertFilesToBase64 = (files: File[]): Promise<string[]> => {
    const imagePromises: Promise<string>[] = files.map((file) => {
      if (file.type.startsWith('image/')) {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      }
      return Promise.resolve('');
    });

    return Promise.all(imagePromises);
  };

  
  const fileInputRef = useRef<any>(null);

  function selectFiles() {
    fileInputRef?.current?.click();
  }

  const photos = images.map((image) => {
    const base64Data = image.indexOf(',');
    const base64Image = base64Data !== -1 ? image.substring(base64Data + 1) : image;
  
    return {
      documentType: 'image',
      suffix: 'png',
      major: false,
      active: true,
      base64Image: base64Image,
    };
  });



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
  
  const [propertyState, setPropertyState] = useState<any>()
  
  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    loadCities(uf);
    setPropertyState({ ...propertyState, state: uf })

  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setPropertyState({ ...propertyState, city: city })
  }

  
  
  // useEffect(() => {
    //   if (state === "0") {
      //     return;
  //   }
  //   axios
  //     .get(
  //       `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
  //     )
  //     .then((response) => {
    //       // const sortedCities = response.data.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
    //       setCities(response.data);
    //     });
    //   }, );
    
  //   useEffect(() => {
  //     axios
  //     .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
  //     .then((response) => {
  //       // Ordena os municípios em ordem alfabética
  //       const sortedUfs = response.data.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
  //       setUfs(sortedUfs);
  //     });
  // }, []);

  // function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
  //   const uf = event.target.value;
  //   setState(uf);
  // }

  // function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
  //   const city = event.target.value;
  //   setCity(city);
  // }

  const handleClose = () => {
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }
  
  const handlePropertyType = (event: ChangeEvent<HTMLSelectElement>) => {
    if(event.target.value === "house"){
      setPropertyType("HOUSE")
    } else {
      setPropertyType("APARTMENT")
    }
  }

  const handleNegociationType = (event: ChangeEvent<HTMLSelectElement>) => {
    if(event.target.value === "rent"){
      setTypeNegociation("RENT")
    } else {
      setTypeNegociation("SALE")
    }
  }

  const handlePoolSelection = (event: ChangeEvent<HTMLSelectElement>) => {
    if(event.target.value === "true"){
      setPool(true)
    } else {
      setPool(false)
    }
  }

  const handleSaunaSelection = (event: ChangeEvent<HTMLSelectElement>) => {
    if(event.target.value === "true"){
      setSauna(true)
    } else {
      setSauna(false)
    }
  }
  


  const NewPropertyObject: IProperty = {
    priority: 1,
    description: description,
    state: state,
    city: city,
    cep: cep,
    neighborhood: neighborhood,
    street: street,
    propertyType: propertyType,
    houseFloors: houseFloors,
    buildingFloor: buildingFloor ? buildingFloor : null,
    squareFeet: squareFeet,
    typeNegotiation: typeNegociation,
    price: price,
    room: room,
    bathroom: bathroom,
    garage: garage,
    pool: pool,
    sauna: sauna,
    user: {"id": user.id},
    corporationId: null,  
    active: true,
    documentCreateDto: photos
  }

  const postProperty = async () => {
    console.log(NewPropertyObject)
    try{
      const response = await axiosApi.post("/property", NewPropertyObject)
      if(response.status === 201){
        setSuccessShow(true)
      }
    }catch(e){
      console.error(e)
      setErrorShow(true)
    }
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">Anunciar</h1>
      <form>
        <div className="row g-3">
          <div className="col-md-12">
            <label htmlFor="titulo" className="form-label">
              Titulo do Imóvel
            </label>
            <input
              placeholder='Digite o Titulo do imóvel'
              type="text"
              className="form-control"
              value={surname}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}
              
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="descricao" className="form-label">
              Descrição
            </label>
            <textarea
              placeholder='Digite a descrição do imóvel'
              className="form-control"
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              rows={4}
              
            ></textarea>
          </div>
          <div className="col-md-2">
            <label htmlFor="endereco" className="form-label">
              Bairro
            </label>
            <input
              placeholder='Insira o bairro'
              type="text"
              className="form-control"
              value={neighborhood}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNeighborhood(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="endereco" className="form-label">
              Rua
            </label>
            <input
              placeholder='Insira a rua'
              type="text"
              className="form-control"
              value={street}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setStreet(e.target.value)}
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
              value={cep}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCep(e.target.value)}
              
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="cep" className="form-label">
              Estado
            </label>
            <select className="form-select" id="dropdownExample" aria-label="Dropdown Example" onChange={handleSelectUf}>
                <option selected >Estado</option>
                {UF.map((uf) => (
                <option value={uf}>{uf}</option>
                ))}
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="cep" className="form-label">
              Cidade
            </label>
            <select className="form-select" id="dropdownExample" aria-label="Dropdown Example"  onChange={handleSelectCity}>
                <option selected>Cidade</option>
                {cities.map((city: any) => (
                  <option value={city}>{city}</option>
                ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="tipoImovel" className="form-label">
              Tipo do Imóvel
            </label>
            <select className="form-select" id="dropdownExample" aria-label="Dropdown Example" onChange={handlePropertyType}>
              <option value="" disabled selected>Selecione o tipo do imóvel</option>
              <option value="house">Casa</option>
              <option value="ap">Apartamento</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="tipoImovel" className="form-label">
              Qual o tipo da operação?
            </label>
            <select className="form-select" id="dropdownExample" aria-label="Dropdown Example" onChange={handleNegociationType}>
              <option value="" disabled selected>Selecione a operação</option>
              <option value="rent">Aluguel</option>
              <option value="sale">Venda</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="andar" className="form-label">
              Andar do Imóvel
            </label>
            <input
              type="number"
              className="form-control"
              placeholder='opcional'
              value={Number(buildingFloor)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBuildingFloor(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="totalAndares" className="form-label">
              Total de Andares
            </label>
            <input
              type="number"
              className="form-control"
              placeholder='opcional'
              value={Number(houseFloors)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setHouseFloors(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="piscinas" className="form-label">
              Tem Piscina?
            </label>
            <select className="form-select" id="dropdownExample" aria-label="Dropdown Example" onChange={handlePoolSelection}>
              <option value="false">Não</option>
              <option value="true">Sim</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="saunas" className="form-label">
              Tem Sauna?
            </label>
            <select className="form-select" id="dropdownExample" aria-label="Dropdown Example" onChange={handleSaunaSelection}>
              <option value="false">Não</option>
              <option value="true">Sim</option>
            </select>
          </div>
            <div className="col-md-2">
            <label htmlFor="quartos" className="form-label">
              Número de Quartos
            </label>
            <input
              type="number"
              className="form-control"
              id="quartos"
              name="quartos"
              placeholder='Ex: 2'
              // value={formData.quartos}
              // onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="banheiros" className="form-label">
              Número de Banheiros
            </label>
            <input
              type="number"
              className="form-control"
              id="banheiros"
              name="banheiros"
              placeholder='Ex: 2'
              value={Number(bathroom)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBathRoom(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="garagens" className="form-label">
              Número de Garagens
            </label>
            <input
              type="number"
              className="form-control"
              id="garagens"
              name="garagens"
              placeholder='Ex: 2'
              value={Number(garage)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setGarage(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="preco" className="form-label">
              Preço
            </label>
            <input
              placeholder='R$0,00'
              type="number"
              className="form-control"
              id="preco"
              name="preco"
              value={Number(price)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
              
            />
          </div>
          <div className="col-md-4 ">
            <label htmlFor="andar" className="form-label">
              Quantos m² tem o imóvel
            </label>
            <input
              type="number"
              className="form-control"
              id="andar"
              name="andar"
              placeholder='Ex: 70'
              value={Number(squareFeet)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSquareFeet(e.target.value)}
            />
          </div>
        </div>
      </form>
      <button className='btn btn-secondary mt-4' onClick={selectFiles}>
                Escolher arquivos
                <AiOutlineSearch size={25}/>
      </button>
                <div className='card-drop'>
              <div
              onDrop={handleDrop}
              className='drag-area'>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                multiple
                style={{ display: 'none' }}
                ref={fileInputRef}
              />
              {images.length > 0 ? (
                <div className='photo-container'>
                  {images.map((image, index) => (
                    <div key={index}>
                      <span className='delete' onClick={() => removeImage(index)}>&times;</span>
                      <img
                        src={image}
                        alt={`Selected ${index}`}
                        className='image'
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <AiOutlineCloudUpload size={55}/>
                <p>Arraste suas imagens aqui ou clique em escolher arquivos</p>
                </div>
              )}
              </div>
            </div>      
        <button className="btn btn-primary mt-3" onClick={() => postProperty()}>
          Postar Imóvel
        </button>
      <ModalComponent 
        success={successShow === true ? true : false}
        onShow={successShow === true ? successShow : errorShow}
        onClose={handleClose}
        modalTitle={successShow === true ? 'Imóvel postado com sucesso!' : 'Algo deu errado. Tente novamente mais tarde.'}/>
    </div>
  )
}
