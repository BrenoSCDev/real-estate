import React, {ChangeEvent, useState} from 'react'
import { Link } from 'react-router-dom'
import { UseAuth } from '../../hooks'
import { useNavigate } from 'react-router-dom'

import "../login/styles.css"

export const RegisterUserCNPJ = () => {
    const {registerCorporation} = UseAuth()
    const navigate = useNavigate()

    const [fantasyame, setFantasyName] = useState<string>("")
    const [corporationName, setCorporationName] = useState<string>("")
    const [corporationType, setCorporationType] = useState<string>("")
    const [number, setNumber] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [confEmail, setConfEmail] = useState<string>("")
    const [cnpj, setCnpj] = useState<string>("")
    const [cep, setCep] = useState<string>("")
    const [stateRegistration, setStateRegistration] = useState<string>("")
    const [municipalRegistration, setMunicipalRegistration] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    const handleRegister = () => {
        if (email === "" || confEmail === "" || password === ""){
          setError("Fill In All Fields")
        } else if (email !== confEmail){
          setError("Your Email Credentials Do Not Match")
        } else {
          try {
             navigate("/Login")
             alert("User Registered Succesfully")
          }catch(e){
            setError("Failed to register")
            console.log(e)
          }
        }
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
                          placeholder='Fantasy Name'
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
                          placeholder='Corporation Name' />
                        </div>
                      </div>
    
                      <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-caret-down fa-lg me-3 fa-fw"></i> {/* Add a suitable icon */}
                      <div className="form-outline flex-fill mb-0">
                        <select className="form-select" id="dropdownExample" aria-label="Dropdown Example">
                          <option value="" disabled selected>Select your corporation type</option>
                          <option value="option1">Real Estate</option>
                          <option value="option2">Constructor</option>
                        </select>
                      </div>
                    </div>


                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input 
                          type="email" 
                          id="form3Example3c" 
                          className="form-control"
                          placeholder='Email' />
                        </div>
                      </div>
    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input 
                          type="email" 
                          id="form3Example3c" 
                          className="form-control"
                          placeholder='CNPJ' />
                        </div>
                      </div>
    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input 
                          type="email" 
                          id="form3Example3c" 
                          className="form-control"
                          placeholder='CEP' />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input 
                          type="text"
                          id="form3Example3c" 
                          className="form-control"
                          placeholder='Municipal Registration' />
                        </div>
                      </div>                  
    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input 
                          type="text" 
                          id="form3Example3c" 
                          className="form-control"
                          placeholder='State Registration' />
                        </div>
                      </div>
    
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input 
                          type="password" 
                          id="form3Example4c" 
                          className="form-control"
                          placeholder='Password' />
                        </div>
                      </div>
    
    
                      <div className="d-grid gap-2 d-md-block'">
                      <button className="btn btn-primary btn-lg" type="button">Register</button>
                      </div>
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
    </div>
      )
    }
    