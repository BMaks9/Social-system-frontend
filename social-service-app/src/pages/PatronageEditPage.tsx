import { FC, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { ROUTE_LABELS, ROUTES } from "../Routes";
import { useNavigate, useParams } from "react-router-dom";
import "./LoginPage.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import React, { FormEvent } from "react";
import { toast } from "react-toastify";
import { BreadCrumbs } from "../components/BreadCrumbs";
import {
  addPatronageAsync,
  getPatronageDetail,
  imgPatronageAsync,
  setFile,
  setPatronage,
  updatePatronageAsync,
} from "../slices/PatronageEditSlice";
import ForbiddenPage from "./ForbiddenPage";

export const PatronageEditPage: FC = () => {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { patronage, file } = useSelector(
    (state: RootState) => state.patronageEdit
  );

  const { isStaff } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(getPatronageDetail(id));
    } else {
      dispatch(setPatronage([])); // Очистить patronage, если id нет
    }
  }, [dispatch, id]);

  if (!isStaff) {
    // если произошла ошибка или данные не найдены
    return <ForbiddenPage />;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(
      setPatronage({
        ...patronage,
        [name]: value,
      })
    );
  };

  const handleSavePatronage = async (event: FormEvent) => {
    event.preventDefault();
    if (id) {
      try {
        await dispatch(updatePatronageAsync({ id, patronage })).unwrap();
        await dispatch(imgPatronageAsync({ id, file })).unwrap();

        toast.success("Услуга обновлена!", {
          position: "bottom-right",
          autoClose: 2000, // Авто-закрытие через 3 сек
        });
      } catch (error) {
        toast.error("Ошибка!", {
          position: "bottom-right",
          autoClose: 2000, // Авто-закрытие через 3 сек
        });
      }
    } else {
      try {
        await dispatch(addPatronageAsync({ patronage })).unwrap();
        navigate(`${ROUTES.SERVICES}`);
        toast.success("Услуга добавлена!", {
          position: "bottom-right",
          autoClose: 2000, // Авто-закрытие через 3 сек
        });
      } catch (error) {
        toast.error("Ошибка!", {
          position: "bottom-right",
          autoClose: 2000, // Авто-закрытие через 3 сек
        });
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(setFile(file));
    }
  };

  return (
    <>
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.SERVICES, path: ROUTES.SERVICES },
          { label: id ? "Редактирование услуги" : "Добавление новой услуги" },
        ]}
      />
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={10} lg={8} xs={12}>
            <div className="border-3 border-success border"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-4">
                  <h2 className="fw-bold text-uppercase mb-2 text-center">
                    {id ? "Редактирование услуги" : "Добавление новой услуги"}
                  </h2>
                  <p className="mb-4 text-center">
                    {id
                      ? "Измените данные услуги и сохраните изменения."
                      : "Добавьте данные услуги и сохраните изменения."}
                  </p>

                  <Form onSubmit={handleSavePatronage}>
                    {/* Название */}
                    <Form.Group className="mb-3">
                      <Form.Label>Название</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        required
                        className="custom-focus"
                        value={patronage?.title || ""}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    {/* Изображение (файл) */}
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Изображение (Текущее {patronage?.img || "default"})
                      </Form.Label>
                      <div className="mb-2">
                        {/* Если есть начальное изображение, показываем его */}
                      </div>
                      <Form.Control
                        type="file"
                        name="img"
                        className="custom-focus"
                        onChange={handleFileChange} // Обработчик для файла
                      />
                    </Form.Group>

                    {/* Описание */}
                    <Form.Group className="mb-3">
                      <Form.Label>Описание</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        rows={3}
                        className="custom-focus"
                        value={patronage?.description || ""}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    {/* Кнопки */}
                    <div className="d-flex justify-content-evenly mt-3">
                      {/* <Button variant="secondary">Очистить</Button> */}
                      <Button variant="success" type="submit">
                        Сохранить
                      </Button>
                    </div>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
