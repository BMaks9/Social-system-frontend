import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap'
import { ROUTES } from "../Routes";
import { NavLink, useNavigate} from "react-router-dom";
import './LoginPage.css'
import './PatronagesDetail.css'
import Cookie from 'js-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import { AppDispatch, RootState } from '../store';
import { loginUserAsync } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', password: '' });
  const error = useSelector((state: RootState) => state.user.error);

  // Обработчик события изменения полей ввода (username и password)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Обработчки события нажатия на кнопку "Войти"
  const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (formData.username && formData.password) {
          await dispatch(loginUserAsync(formData)); // Отправляем 'thunk'
          navigate(`${ROUTES.SERVICES}`); // переход на страницу услуг
      }
  };
    return (
        <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
            <div className="border-3 border-success border"></div>
            <Card className="shadow">
                <Card.Body>
                <div className="mb-3 mt-4">
                    <h2 className="fw-bold text-uppercase mb-2">Авторизация</h2>
                    <p className="mb-5">Пожалуйста введите логин и пароль!</p>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {/* {success && <div className="alert alert-success">{success}</div>} */}

                    <Form className="mb-3" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicLogin">
                        <Form.Label className="text-center">Логин</Form.Label>
                        <Form.Control 
                            name='username'
                            type="login" 
                            placeholder="Введите логин" 
                            className='custom-focus'
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control 
                            name='password'
                            type="password" 
                            placeholder="Введите пароль" 
                            className='custom-focus'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <div className="d-grid">
                        <Button variant="success" type="submit">
                        Войти
                        </Button>
                    </div>
                    </Form>
                    <div className="mt-3">
                    <p className="mb-0 text-center">
                        Нет акаунта?{' '}
                        <NavLink to = {ROUTES.REGISTER}>Зарегистрируйся</NavLink>
                    </p>
                    </div>
                </div>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
    )
    }
    // return (
    //     <div className="min-vh-100 bg-dark text-light d-flex flex-column">
    
    
    //       {/* Content Section */}
    //       <div className="container-fluid d-flex justify-content-center align-items-center flex-grow-1">
    //         <div className="card bg-dark text-light border-light p-4" style={{ maxWidth: '400px', width: '100%' }}>
    //           <h2 className="text-center mb-4">Вход</h2>
    
 
    
    //           <form onSubmit={handleLogin}>
    //             <div className="mb-3">
    //               <label htmlFor="username" className="form-label">Имя пользователя</label>
    //               <input
    //                 type="text"
    //                 className="form-control"
    //                 id="username"
    //                 placeholder="Введите ваше имя пользователя"
    //                 value={username}
    //                 onChange={(e) => setUsername(e.target.value)}
    //                 required
    //               />
    //             </div>
    //             <div className="mb-3">
    //               <label htmlFor="password" className="form-label">Пароль</label>
    //               <input
    //                 type="password"
    //                 className="form-control"
    //                 id="password"
    //                 placeholder="Введите пароль"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 required
    //               />
    //             </div>
    //             <button type="submit" className="btn btn-success w-100">Войти</button>
    //           </form>
    //           <div className="text-center mt-3">
    //             <p className="mb-0">Нет аккаунта?</p>
    //             <Link to="/register" className="text-success">Зарегистрироваться</Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // };
    export default LoginPage;