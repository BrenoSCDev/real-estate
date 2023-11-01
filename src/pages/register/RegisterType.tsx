import "../login/styles.css"
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

export const RegisterType = () => {
  const navigate = useNavigate()
  return (
<div className='image'>
  <section className="vh-90 mt-5 mb-5">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black" style={{ borderRadius: "25px" }}>
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 text-center">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-primary">Que tipo de pessoa você é?</p>
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary btn-lg m-2 col-6" onClick={() => navigate('/RegisterUserCpf')}>CPF</button> {/* Updated */}
                    <button className="btn btn-primary btn-lg m-2 col-6" onClick={() => navigate('/RegisterUserCnpj')}>CNPJ</button>
                  </div>
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src="src/assets/PNG/DrawKit Vector Illustration Project Manager (2).png"
                    className="img-fluid" alt="Sample image" />
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

