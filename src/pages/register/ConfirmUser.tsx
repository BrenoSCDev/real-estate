import React, {useState, ChangeEvent, useEffect} from 'react'
import "../login/styles.css"
import { useNavigate } from "react-router-dom";
import axiosApi from '../../services';
import { UseAuth } from '../../hooks';
import { useParams } from 'react-router-dom';

export const ConfirmUser = () => {
const [code, setCode] = useState<string>("")
const { email } = useParams()
console.log(email)
const validateCode = async () => {
    const reqBody = {
        "email": `${email}`,
        "confirmationdCode": `${code}`
    }
    await axiosApi.put("/user/confirm-user", reqBody)
}
  
const resendCode = async () => {
    await axiosApi.post(`user/resend-confirmation-code?username=${email}`)
}

useEffect(() => {
  resendCode()
}, [])



return (

<div className='image'>
  <section className="vh-80 mt-5 mb-5">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black" style={{ borderRadius: "25px" }}>
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-12 col-xl-5 order-2 order-lg-1 text-center">
                  <p className="h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-primary">Preencha com o código enviado no seu email</p>
                  <div className="d-flex justify-content-center">
                    <input 
                    className="m-2 col-lg-8 col-md-6 col-sm-4" 
                    placeholder='Insira o código'
                    value={code}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                    />
                    <button className='btn btn-primary btn-lg m-2 col-lg-6 col-md-6 col-sm-4' onClick={validateCode}>Enviar</button>
                  </div>
                  <div>
                    <p className='text-primary' style={{cursor: 'pointer'}} onClick={resendCode}>
                        Reenviar código
                    </p>
                  </div>
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
