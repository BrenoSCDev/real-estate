import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate()
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted' style={{boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.1)'}}>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Anuncie conosco:</span>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>


            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Anunciantes:</h6>
              <p>
                <a>
                  Imobiliária
                </a>
              </p>
              <p>
                <a>
                  Construtora
                </a>
              </p>
              <p>
                <a>
                  Proprietário
                </a>
              </p>
            </MDBCol>
            
            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Links Úteis:</h6>
              <p> 
                <a onClick={() => navigate('/TermsOfCondition')} className='text-reset' href=''>
                  Termos de condição e uso
                </a>
              </p>
              <p>
                <a onClick={() => navigate('/CookiePolicy')} className='text-reset' href=''>
                  Política de cookie
                </a>
              </p>
              <p>
                <a onClick={() => navigate('/Privacy')} className='text-reset' href=''>
                  Política de privacidade
                </a>
              </p>
            </MDBCol>


            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Países:</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                Brasil
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright: Sexto Andar
      </div>
    </MDBFooter>
  );
}