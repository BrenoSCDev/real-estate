import React, {ChangeEvent, useState, useEffect} from 'react'
import { UseAuth } from '../../hooks'
import "../login/styles.css"
import { useNavigate } from 'react-router-dom'
import { ModalComponent } from '../../components/modal'

export const RegisterUserCPF = () => {

    const {registerUser, error} = UseAuth()

    const [name, setName] = useState<string>("Breno")
    const [secondName, setSecondName] = useState<string>("Sousa")
    const [number, setNumber] = useState<string>("+5568971505832")
    const [email, setEmail] = useState<string>("brenosousacastro03@gmail.com")
    const [cpf, setCpf] = useState<string>("94055674031")
    const [date, setDate] = useState<string>("2003-08-12")
    const [password, setPassword] = useState<string>("Breno@123")
    const [errorInpt, setErrorInpt] = useState<string>("")
    const [modalShow, setModalShow] = useState<boolean>(false)
    
  
    const handleRegister = () => {
        if (email === "" || secondName === "" || number === "" || email === "" || cpf === "" || date === "" || password === ""){
          setErrorInpt("Preencha todos os campos")
        } else {
          registerUser(email, password, name, secondName, number, cpf, date)
        }
      }

      const showModal = () => {
        error === "This 'cpf' is already registered!" ? setModalShow(true) : null
      }
      const closeModal = () => {
        setModalShow(false)
      }
    
      useEffect(() => {
        showModal()
      },[error])
    
      const navigate = useNavigate()
      const handleConfirmationRedirect = () => {
        navigate('/ConfirmUser/id')
      }
    return (
  <div className='image'>
  <section className="vh-90 mt-5 mb-5">
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-primary">Sign up</p>

                <form className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input 
                      type="text" 
                      id="form3Example1c" 
                      className="form-control" 
                      placeholder='Name'
                      value={name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input 
                      type="text"
                      id="form3Example3c" 
                      className="form-control"
                      placeholder='Second Name'
                      value={secondName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setSecondName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input 
                      type="email" 
                      id="form3Example3c" 
                      className="form-control"
                      placeholder='Email'
                      value={email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

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
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input 
                      type="date"
                      id="form3Example3c" 
                      className="form-control"
                      value={date}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                      />
                    </div>
                  </div>                  

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input 
                      type="text" 
                      id="form3Example3c" 
                      className="form-control"
                      placeholder='Phone Number' 
                      value={number}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setNumber(e.target.value)}
                      />
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
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>


                  <div className="d-grid gap-2 d-md-block'">
                  <button className="btn btn-primary btn-lg" type="button" onClick={handleRegister}>Register</button>
                  </div>
                      {error || errorInpt ? <p className='text-danger'>{error || errorInpt}</p> : ''}
                      
                  <div className="form-check d-flex justify-content-center mb-3">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                        <label className="form-check-label" >
                          I agree all statements in <a href="#!">Terms of service</a>
                        </label>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <label className="form-check-label" >
                          Alreay have an account? <a onClick={() => navigate('/Login')} href=''>Sign in</a>
                        </label>
                      </div>
                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img src="src/assets/PNG/DrawKit Vector Illustration Project Manager (5).png"
                  className="img-fluid" alt="Sample image"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<ModalComponent
  info={true}
  modalTitle='Usuário com confirmação pendente.'
  onShow={modalShow}
  onClose={closeModal}
  onClickButton={handleConfirmationRedirect}
  />
</div>
  )
}
