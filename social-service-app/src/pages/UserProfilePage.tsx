import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  InputGroup,
} from "react-bootstrap";
import { ROUTE_LABELS, ROUTES } from "../Routes";
import { NavLink, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import "./PatronagesDetail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppDispatch, RootState } from "../store";
import { loginUserAsync, updateUserAsync } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { toast } from "react-toastify";
import ForbiddenPage from "./ForbiddenPage";

const UserProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { username } = useSelector((state: RootState) => state.user); // получение значения username из стора
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const error = useSelector((state: RootState) => state.user.error);

  // Обработчик события изменения полей ввода
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.warn("Пароли не совпадают!", {
        position: "bottom-right",
        autoClose: 2000, // Авто-закрытие через 3 сек
      });
      return;
    }

    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== "")
    );
    try {
      await dispatch(updateUserAsync(filteredData)).unwrap();
    } catch (error) {
      toast.warn("Такой пользователь уже существует", {
        position: "bottom-right",
        autoClose: 2000, // Авто-закрытие через 3 сек
      });
    }
  };
  if (!isAuthenticated) {
    // если произошла ошибка или данные не найдены
    return <ForbiddenPage />;
  }
  return (
    <>
      <BreadCrumbs
        crumbs={[{ label: ROUTE_LABELS.PROFILE, path: ROUTES.PROFILE }]}
      />
      <Container>
        <Row className="vh-100 d-flex justify-content-center">
          <Col md={10} lg={8} xs={12}>
            <div className="border-3 border-success border"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-4">
                  <h2 className="fw-bold text-uppercase mb-2">
                    Настройки аккаунта
                  </h2>
                  <p className="mb-5">
                    Привет, {username}! Измените свои данные ниже.
                  </p>
                  <Form onSubmit={handleSubmit}>
                    {/* Поле для логина */}
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        className="mb-3"
                        controlId="formUsername"
                      >
                        <Form.Label className="text-center">Логин</Form.Label>
                        <Form.Control
                          name="username"
                          type="text"
                          placeholder="Введите новый логин"
                          className="custom-focus"
                          value={formData.username}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>

                    {/* Поле для email */}
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        className="mb-3"
                        controlId="formEmail"
                      >
                        <Form.Label className="text-center">
                          Email адрес
                        </Form.Label>
                        <Form.Control
                          name="email"
                          type="email"
                          placeholder="Введите новый email"
                          className="custom-focus"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>

                    {/* Поля для пароля и подтверждения пароля */}
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        className="mb-3"
                        controlId="formPassword"
                      >
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                          name="password"
                          type="password"
                          placeholder="Введите новый пароль"
                          className="custom-focus"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="mb-3"
                        controlId="formConfirmPassword"
                      >
                        <Form.Label>Подтвердите пароль</Form.Label>
                        <Form.Control
                          name="confirmPassword"
                          type="password"
                          placeholder="Повторите новый пароль"
                          className="custom-focus"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>

                    {/* Кнопка для сохранения изменений */}
                    <div className="d-grid">
                      <Button variant="success" type="submit">
                        Сохранить изменения
                      </Button>
                    </div>
                  </Form>

                  {/* Ссылка на главную страницу */}
                  <div className="mt-3">
                    <p className="mb-0 text-center">
                      Не хотите менять данные?{" "}
                      <NavLink to={ROUTES.HOME}>Вернуться на главную</NavLink>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default UserProfilePage;
