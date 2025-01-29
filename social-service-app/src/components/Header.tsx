import { Navbar, Nav, Container } from 'react-bootstrap';
import { ROUTES } from '../Routes';
import { NavLink } from "react-router-dom";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Импортируем необходимые хуки из Redux
import { logout } from '../slices/authSlice'; // Импортируем экшн logout
import axios from 'axios'; // Импортируем axios
import Cookies from 'js-cookie'; // Импортируем js-cookie для работы с cookies

import { AppDispatch, RootState } from '../store';
import { logoutUserAsync } from '../slices/userSlice'; 
import { setSearchValue, getPatronageList } from '../slices/patronageSlice'; 

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
  const linkStyle = {
    fontWeight: '700',
    fontSize: '18px',
    color: '#fff',
    textDecoration: 'none',
    paddingLeft: '20px',
  };

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const username = useSelector((state: RootState) => state.user.username); // получение значения username из стора
  console.log("Username from store: ", username);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);


  const handleExit = async ()  => {
    await dispatch(logoutUserAsync());

    dispatch(setSearchValue('')); // можно реализовать в `extrareducers` у функции logoutUserAsynс
    
    navigate('/login'); // переход на страницу списка услуг

    await dispatch(getPatronageList()); // для показа очищения поля поиска

}
  // const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   e.preventDefault();

  //   try {
  //     const csrfToken = Cookies.get('csrftoken'); // Получаем CSRF токен из cookies

  //     const response = await axios.post('/logout/', {}, {
  //       headers: {
  //         'X-CSRFToken': csrfToken, // Подставляем CSRF токен в заголовок запроса
  //         'Content-Type': 'application/json',
  //       },
  //       // withCredentials: true,
  //     });

  //     if (response.status === 200) {
  //       dispatch(logout());
  //       navigate('/login');
  //     }
  //   } catch (error) {
  //     console.error('Ошибка при выходе:', error);
  //     alert('Ошибка при выходе. Пожалуйста, попробуйте позже.');
  //   }
  // };
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
              <NavLink 
                to ={`${ROUTES.SERVICES}`} 
                style={linkStyle}>
                  Услуги
              </NavLink>
            {(isAuthenticated == true) ? // && !is_staff
            (
              <NavLink to={ROUTES.DISABILITY} style={linkStyle}>Заявки</NavLink>
            ):
            (
              <></>
            )}
            {(isAuthenticated == true) ? 
            (
              <NavLink to="/profile" style={linkStyle}>Личный кабинет({username})</NavLink>
            ): 
            (
              <span></span>
            )}

            {(isAuthenticated == true) ? 
            (
              <NavLink 
                to="/" 
                onClick={handleExit } 
                style={linkStyle}>
                  Выход
              </NavLink>
            ):
            (
              <NavLink 
                to ={`${ROUTES.LOGIN}`} 
                style={linkStyle}>
                  Вход
              </NavLink> 
            )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
