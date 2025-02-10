import "./PatronagesDetail.css";
import { FC, useEffect } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { AppDispatch, RootState } from "../store";
import { Button, Form, Col, Row, Spinner, Image } from "react-bootstrap";
import { DisabilityCard } from "../components/disabilityCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDisability,
  saveDataDisability,
} from "../slices/disabilityDraftSlice";
import {
  deleteDisability,
  setError,
  setDisabilityData,
  saveDisability,
} from "../slices/disabilityDraftSlice";
import "../components/PatronageCard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgDisability from "../components/disability.png";
import NotFoundPage from "./NotFoundPage";
import ForbiddenPage from "./ForbiddenPage";

const DisabilityPage: FC = () => {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isDraft = useSelector(
    (state: RootState) => state.disabilityDraft.isDraft
  );

  const { disabilityData } = useSelector(
    (state: RootState) => state.disabilityDraft
  );

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  useEffect(() => {
    // if (!isAuthenticated) {
    //   //navigate(ROUTES.H);
    //   return;
    // }

    if (id) {
      dispatch(getDisability(id));
    }
  }, [dispatch]);

  if (!id) {
    // если произошла ошибка или данные не найдены
    return <NotFoundPage />;
  }
  if (!isAuthenticated) {
    // если произошла ошибка или данные не найдены
    return <ForbiddenPage />;
  }

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      try {
        await dispatch(deleteDisability(id)).unwrap();
        navigate(ROUTES.SERVICES);
      } catch (error) {
        dispatch(setError(error));
      }
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(
      setDisabilityData({
        ...disabilityData,
        [name]: value,
      })
    );
  };
  const handleBlur = () => {
    if (id) {
      const disabilityDataToSend = {
        disability_address: disabilityData.disability_address ?? "",
        disability_phone: disabilityData.disability_phone ?? "",
      };
      try {
        dispatch(
          saveDataDisability({
            appId: id,
            disabilityData: disabilityDataToSend,
          })
        );
      } catch (error) {
        dispatch(setError(error));
      }
    }
  };

  const handleSaveDisability = async () => {
    if (id) {
      try {
        await dispatch(saveDisability({ appId: id })).unwrap();
        navigate(`${ROUTES.SERVICES}`);
      } catch (error) {
        dispatch(setError(error));
        toast.error("Ошибка! Заполните поля заявки", {
          position: "bottom-right",
          autoClose: 2000, // Авто-закрытие через 3 сек
        });
      }
    }
  };
  return (
    <>
      <div>
        {!isDraft ? (
          <div>
            <BreadCrumbs
              crumbs={[
                { label: ROUTE_LABELS.DISABILITY, path: ROUTES.DISABILITY },
                {
                  label: "№" + disabilityData.id?.toString() || "",
                },
              ]}
            />
          </div>
        ) : (
          <div>
            <BreadCrumbs
              crumbs={[
                { label: ROUTE_LABELS.SERVICES, path: ROUTES.SERVICES },
                {
                  label: "Заявка №" + disabilityData.id?.toString() || "",
                },
              ]}
            />
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center", // Центрируем содержимое по горизонтали
            alignItems: "flex-start", // Выравнивание по верхнему краю
            width: "100%", // Занимает всю ширину экрана
            padding: "20px 0", // Отступ сверху и снизу
          }}
        >
          {/* Контейнер для двух колонок */}
          <div
            style={{
              display: "flex",
              justifyContent: "center", // Центрируем колонки
              width: "auto", // Ограничиваем ширину контейнера
              gap: "150px", // Расстояние между колонками
            }}
          >
            {/* Левая колонка с полями */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Выравнивание полей по центру
                justifyContent: "flex-start",
                flex: 1, // Растягиваем колонку по ширине
              }}
            >
              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Group
                    controlId="formPhone"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "10px",
                      marginTop: "20px",
                    }}
                  >
                    <Form.Label
                      style={{
                        width: "80px",
                        textAlign: "right",
                        marginRight: "10px",
                      }}
                    >
                      Телефон
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="disability_phone"
                      className="input-comment"
                      placeholder="Введите телефон"
                      value={disabilityData.disability_phone ?? ""}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      disabled={!isDraft}
                      style={{ width: "300px" }} // Устанавливаем ширину
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Group
                    controlId="formAddress"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Form.Label
                      style={{
                        width: "80px",
                        textAlign: "right",
                        marginRight: "10px",
                      }}
                    >
                      Адрес
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="disability_address"
                      className="input-comment"
                      placeholder="Введите адрес"
                      value={disabilityData.disability_address ?? ""}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      disabled={!isDraft}
                      style={{ width: "300px" }} // Устанавливаем ширину
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>

            {/* Правая колонка с картинкой */}
            <div
              style={{
                display: "flex",
                justifyContent: "center", // Центрируем картинку
                alignItems: "center", // Выравнивание по вертикали
                flex: 1, // Растягиваем колонку по ширине
                width: "auto", // Контейнер картинкой должен иметь ширину, соответствующую картинке
              }}
            >
              <Image
                src={imgDisability}
                alt="Корзина"
                fluid
                style={{
                  maxWidth: "100%", // Картинка не превышает ширину контейнера
                  height: "auto", // Сохраняем пропорции картинки
                  maxHeight: "100px", // Ограничиваем высоту картинки
                }}
              />
            </div>
          </div>
        </div>

        {disabilityData ? (
          disabilityData.disability_patronages?.map((item) => (
            <Col
              key={item.id}
              style={{
                padding: "0",
                display: "flex",
                justifyContent: "center", // Центрируем карточки
              }}
            >
              <DisabilityCard
                {...item}
                isDraft={isDraft}
                disabilityData={disabilityData}
              />
            </Col>
          ))
        ) : (
          <div className="album_page_loader_block">
            {/* загрузка */}
            <Spinner animation="border" />
          </div>
        )}

        {isDraft && (
          <div
            className="d-flex justify-content-center mt-3"
            style={{ marginBottom: "20px" }}
          >
            <Button className="delete-button me-2" onClick={handleDelete}>
              Очистить
            </Button>
            <Button
              type="submit"
              className="save-button me-2"
              variant="success"
              onClick={handleSaveDisability}
            >
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
export default DisabilityPage;
