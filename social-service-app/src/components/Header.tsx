import { Navbar, Nav, Container } from 'react-bootstrap';
import { ROUTES } from '../Routes';
import { NavLink } from "react-router-dom";

const Header = () => {
  const headerStyle = {
    width: '100%',
    height: '54px',
    background: 'linear-gradient(180deg, #0e6f31 0%, #4aa317 100%)',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
    color: 'white',
  };

  return (
    <Navbar style={headerStyle}>
      <Container fluid style={{ display: 'flex', flexDirection: 'row', margin: '0px'}}>
        {/* Логотип или название сайта */}
        <Navbar.Brand>
        <NavLink to = {`${ROUTES.HOME}`} style={{
            fontWeight: '700',
            fontSize: '24px', 
            color: '#fff',
            textDecoration: 'none'
          }}>Домой</NavLink>  
        </Navbar.Brand>
        
        {/* Навигация (ссылки) */}
        <Nav className="ml-auto"> {/* Используем ml-auto для отступа справа */}
            {
              <NavLink to ={`${ROUTES.SERVICES}`} style={{
                fontWeight: '700',
                fontSize: '18px',
                color: '#fff',
                textDecoration: 'none'
              }}>Услуги</NavLink>
            // <Nav.Link href="#pricing">Заявки</Nav.Link>
            }
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
