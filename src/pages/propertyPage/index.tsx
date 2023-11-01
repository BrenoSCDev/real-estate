import React, {useState, useEffect} from 'react'
import { PiToilet } from 'react-icons/pi'
import { BiBed, BiSolidCarGarage, BiMap } from 'react-icons/bi'
import { FaMoneyBillTransfer } from 'react-icons/fa6'
import { BsHouse } from "react-icons/bs"
import { SlSizeFullscreen } from 'react-icons/sl'
import { TfiGallery } from "react-icons/tfi"
import { FaRegCircleUser } from "react-icons/fa6"
import { useParams } from 'react-router-dom';
import { MdPool, MdOutlineAttachMoney } from "react-icons/md"
import { SiWindicss } from "react-icons/si"
import { IProperty } from '../../interfaces';
import { IPhoto } from '../../interfaces';
import { use } from 'i18next';
import axiosApi from '../../services';
import { IUser } from '../../interfaces'
import "./styles.css"
import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { Carousel, Modal } from 'react-bootstrap'

export const PropertyPage = () => {

  const { id } = useParams();

  const [property, setProperty] = useState<IProperty | null>(null)
  const [propertyUser, setPropertyUser] = useState<IUser | null>(null)

  const getPropertyById = async () => {
    try {
      const response = await axiosApi.get(`/property/${id}`)
      setProperty(response.data[0])
      setPropertyUser(response.data[0].user)
      console.log(response.data[0])
    }catch(e){
      console.log(e)
    }
  }

  const formatedNumber = propertyUser?.phoneNumber.substring(3)
  const whatsappLink = `https://api.whatsapp.com/send?phone=${formatedNumber}`;


  const formattedPrice = property?.price?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  useEffect(() => {
    getPropertyById()
  },[]) 
  
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          padding: '0',
          border: 'none',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
          
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      };
      const [isCopied, setIsCopied] = useState(false);

      const handleCopyClick = () => { 
        // navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      };

  return (
    <>
      <div className="container">
      <h3 className="title-d mt-4 mb-4">{property?.city} | {property?.street}</h3>
      <div className='col-12' style={{justifyContent: 'center'}}>
            {/* <Carousel>
              {
                property?.photo?.map((photo: IPhoto, index: any) => (
                  <Carousel.Item
                  key={index}
                  >
                    <img src={photo.fileUrl}/>
                  </Carousel.Item>
                ))
              }
          </Carousel> */}
          <div style={{position: 'relative'}}>
            <img key={0} src={property?.photo[0].fileUrl} alt={"Loading..."} className='border-radius-1 m-2 col-lg-12 col-md-12 col-sm-12' style={{height: '35em', overflow: 'hidden', backgroundSize: '100%'}}/>
            <button className='absolute-button' onClick={openModal}>
              <TfiGallery color={'#007bff'}/>
              Ver mais
            </button> 
          </div>
      </div>
        <div className="row mb-4 info-container">
          <div className="col-sm-12 mb-4">

            <div className="row justify-content-between">
              <div className="col-md-5 col-lg-4">
                
                <div className="property-summary">
                  <div className="row">
                    <div className="col-md-12 col-sm-12 col-sm-12">
                      <div className="title-box-d section-t4">
                        <h3 className="title-d">Detalhes</h3>
                      </div>
                    </div>
                  </div>
                  <div className="summary-list">
                    <ul className="list">
                    <li className="d-flex justify-content-between mb-2">
                        <strong><MdOutlineAttachMoney/>Preço:</strong>
                        <span>{formattedPrice}</span>
                      </li>
                      <li className="d-flex justify-content-between mb-2">
                        <strong><BiMap/>Endereço:</strong>
                        <span>{property?.street}</span>
                      </li>
                      <li className="d-flex justify-content-between mb-2">
                        <strong><BsHouse/>Tipo do imóvel:</strong>
                        <span>{property?.propertyType}</span>
                      </li>
                      <li className="d-flex justify-content-between mb-2">
                        <strong><FaMoneyBillTransfer/> Operação:</strong>
                        <span>{property?.typeNegotiation}</span>
                      </li>
                      <li className="d-flex justify-content-between mb-2">
                        <strong><SlSizeFullscreen/> Area:</strong>
                        <span>{property?.squareFeet}m
                          <sup>2</sup>
                        </span>
                      </li>
                      <li className="d-flex justify-content-between mb-2">
                        <strong><BiBed/> Quartos:</strong>
                        <span>{property?.room}</span>
                      </li>
                      <li className="d-flex justify-content-between mb-2">
                        <strong><PiToilet/> Banheiros:</strong>
                        <span>{property?.bathroom}</span>
                      </li>
                      <li className="d-flex justify-content-between mb-2">
                        <strong><BiSolidCarGarage/> Estacionamentos:</strong>
                        <span>{property?.garage}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-lg-7 section-md-t3 mt-4">
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <div className="title-box-d">
                      <h3 className="title-d">Descrição do imóvel</h3>
                    </div>
                  </div>
                </div>
                <div className="property-description">
                  <p className="description color-text-a">
                    {property?.description}
                  </p>
                </div>
              </div>
          <div className="col-md-12 col-sm-12 mb-4">
            <div className="row">
              <div className="col-md-6 col-lg-4 mt-4">
                <div className="property-agent">
                  <h4 className="title-agent">Anunciante: {propertyUser?.name} {propertyUser?.familyName}</h4>
                  <ul className="list-unstyled">
                    <li className="d-flex justify-content-between">
                      <strong>Telefone:</strong>
                      <span className="color-text-a">{propertyUser?.phoneNumber}</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      <strong>Email:</strong>
                      <span className="color-text-a">{propertyUser?.email}</span>
                    </li>
                    <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-button col-md-12 mt-4"
                    >
                    <FaWhatsapp className="whatsapp-icon" /> Contatar via WhatsApp
                  </a>
                  </ul>
                </div>
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton>
        </Modal.Header>
      </Modal>
    </>
  )
}