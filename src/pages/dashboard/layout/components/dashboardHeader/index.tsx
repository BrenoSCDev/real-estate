import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "/src/layout/components/header/styles.css"

export const DashboardHeader = () => {
  const navigate = useNavigate()
    return (
      <Navbar expand="lg" className="bg-body-tertiary" style={{boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
      <Container fluid>
        <Navbar.Brand onClick={() => navigate('/')} className='m-2'><h1 className='header-title'>Sexto Andar</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >
            <Nav.Link onClick={() => navigate('/')} className='m-2'>Home</Nav.Link>
            <Nav.Link onClick={() =>navigate('/DashBoard/UserDetails')} className='m-2'>Meu Perfil</Nav.Link>
            <Nav.Link onClick={() =>navigate('/DashBoard/MyProperties')} className='m-2'>Meus Imóveis</Nav.Link>
            <Nav.Link onClick={() =>navigate('/DashBoard/Favorites')} className='m-2'>Favoritos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}