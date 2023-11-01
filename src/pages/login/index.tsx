import React, {ChangeEvent, useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./styles.css"
import { UseAuth } from '../../hooks'
import { ModalComponent } from '../../components/modal'

export const LoginPage = () => {
  
  const { signIn, error } = UseAuth()
  const navigate = useNavigate()
  
  
  const [cpf, setCpf] = useState<string>("brenosousacastro03@gmail.com")
  const [password, setPassword] = useState<string>("Breno@123")
  const [errorInpt, setErrorInpt] = useState<string>("")
  const [modalShow, setModalShow] = useState<boolean>(false)

  const handleLogin = async () => {
    if (cpf === '' || password === ''){
      setErrorInpt("Preencha todos os campos.")
    } else {
      try{
        await signIn(cpf, password)
        navigate('/')
        setTimeout(() => {
          window.location.reload()
        }, 200)
      }catch(e){

      }
    }
  }

  const showModal = () => { error === "Usuário com confirmação pendente." ? setModalShow(true) : null }
  const closeModal = () => { setModalShow(false) }

  useEffect(() => {
    showModal()
  },[error])

  const handleConfirmationRedirect = () => {
    navigate(`/ConfirmUser/${cpf}`)
  }
  
  return (
  <div className='image'>
    <section className="vh-90 mt-5 mb-5">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-10">
          <div className="card text-black" style={{borderRadius: "25px"}}>
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-primary col-6">Bem-vindo de volta</p>
                  <form className="mx-1 mx-md-4 col-6">
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input 
                        type="text"
                        id="form3Example3c" 
                        className="form-control"
                        placeholder='CPF'
                        value={cpf}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)} />
                      </div>
                    </div>                  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input 
                        type="password" 
                        id="form3Example4c" 
                        className="form-control"
                        placeholder='Password'
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
                      </div>
                    </div>
                    <div className="d-grid gap-2 d-md-block'">
                    <button className="btn btn-primary btn-lg" type="button" onClick={handleLogin}>Entrar</button>
                    </div>
                    {error ? <p className='text-danger'>{error}</p> : ''}
                    {errorInpt ? <p className='text-danger'>{errorInpt}</p> : '' }
                        <div className="form-check d-flex justify-content-center mb-5">
                          <label className="form-check-label" >
                            Ainda não tem uma conta? <a onClick={() => navigate('/Register')} href=''>Registrar conta</a>
                          </label>
                        </div>
                  </form>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <ModalComponent
  info={true}
  modalTitle={error}
  onShow={modalShow}
  onClose={closeModal}
  onClickButton={handleConfirmationRedirect}
  />
  </div>
  )
}
