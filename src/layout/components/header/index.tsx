import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../../hooks';
import axiosApi from '../../../services';

function Header() {
  const [selectedNegotiation,setSelectedNegotiation] = useState("0")
  const handlePropertyNegotiation = () => {
    const queryParams = {
      typeNegotiation: selectedNegotiation === "0" ? undefined : selectedNegotiation,
    }
    const queryString = JSON.stringify(queryParams)
    navigate(`PropertiesPage/${queryString}`)
}
  const navigate = useNavigate()
  const {isAuth} = UseAuth()  
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
      <Container fluid>
        <Navbar.Brand onClick={() => navigate('/')}><h1 className='header-title'>Sexto Andar</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <NavDropdown title="Imovéis" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => navigate('/PropertiesPage/{"typeNegotiation":"SALE"}')}>Comprar</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/PropertiesPage/{"typeNegotiation":"RENT"}')}>Alugar</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate('/DashBoard/PostProperty')}>Anunciar</NavDropdown.Item>
            </NavDropdown>
            {
              isAuth ? <Nav.Link onClick={() => navigate('/DashBoard/UserDetails')}>Meu Perfil</Nav.Link> :
              <>
              <Nav.Link onClick={() => navigate('/Register')}>Sign up</Nav.Link>
              <Nav.Link onClick={() => navigate('/Login')}>Login</Nav.Link>
              </> 
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
