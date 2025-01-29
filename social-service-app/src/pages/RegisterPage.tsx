import {FC} from 'react'
import { InputGroup, Col, Button, Row, Container, Card, Form } from 'react-bootstrap'
import { ROUTES } from "../Routes";
import { NavLink } from "react-router-dom";
import './LoginPage.css'

export const RegisterPage: FC = () => {
  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={10} lg={8} xs={12}>
          <div className="border-3 border-success border"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <h2 className="fw-bold text-uppercase mb-2">Регистрация</h2>
                <p className="mb-5">Пожалуйста введите свои данные!</p>
                <Form>
                  <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="formFullName">
                      <Form.Label className="text-center">Логин</Form.Label>
                      <Form.Control type="text" placeholder="Введите логин" className='custom-focus'/>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formPhoneNumber">
                      <Form.Label>Номер телефона</Form.Label>
                      <Form.Control type="number" placeholder="Введите номер телефона" className='custom-focus'/>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="formUsername">
                      <Form.Label className="text-center">Email адрес</Form.Label>
                      <InputGroup>
                        <Form.Control type="email" placeholder="Введите email" className='custom-focus'/>
                        <InputGroup.Text className="text-success">@yandex.com</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Пароль</Form.Label>
                      <Form.Control type="password" placeholder="Пароль" className='custom-focus' />
                    </Form.Group>
                  </Row>
                  <div className="d-grid">
                    <Button variant="success" type="submit">
                      Регистрация
                    </Button>
                  </div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0 text-center">
                    Уже есть акаунт?{' '}
                    <NavLink to = {ROUTES.LOGIN}>Авторизация</NavLink>
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