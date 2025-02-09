import "./PatronagesList.css";
import { FC, useState, useEffect } from "react";
import { Button, Col, Row, Spinner, Table } from "react-bootstrap";

import InputField from "../components/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTE_LABELS, ROUTES } from "../Routes";
import { PatronageCard } from "../components/PatronageCard";
import { PATRONAGES_MOCK } from "../modules/mock";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../slices/dataSlices";
import { AppDispatch, RootState } from "../store";

import { getPatronageList } from "../slices/patronageSlice";
import "./DisabilityTablePage.css";
import { deletePatronageAsync } from "../slices/PatronageEditSlice";
import { toast } from "react-toastify";

const PatronageListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { searchValue, patronage, loading } = useSelector(
    (state: RootState) => state.patronages
  ); // получение данных из стора
  const { isStaff, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(getPatronageList()); // отправляем `thunk`
  }, [dispatch]);

  const handleCardClick = (
    id: number | undefined,
    action: "open" | "edit" | "delete"
  ) => {
    if (!id) return;

    switch (action) {
      case "open":
        navigate(`${ROUTES.SERVICES}/${id}`);
        break;
      case "edit":
        navigate(`${ROUTES.SERVICES}/${id}/edit`);
        break;
      case "delete":
        dispatch(deletePatronageAsync({ id })).then(() => {
          // Дожидаемся завершения операции удаления и затем перезагружаем список
          dispatch(getPatronageList());
          toast.warn("Услуга удалена!", {
            position: "bottom-right",
            autoClose: 2000, // Авто-закрытие через 3 сек
          });
        });
        break;
      default:
        console.warn("Неизвестное действие:", action);
    }
  };

  return (
    <>
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.SERVICES }]} />
      <InputField loading={loading} value={searchValue} />
      {!isStaff ? (
        <div className="container">
          {loading && (
            <div className="loadingBg">
              <Spinner animation="border" />
            </div>
          )}

          {!loading &&
            (!patronage.length /* Проверка на существование данных */ ? (
              <div>
                <h1>Пусто</h1>
              </div>
            ) : (
              <Row
                className="g-2" /* Большее расстояние между карточками */
                style={{ marginInline: "auto" }}
              >
                {patronage.slice(0, patronage.length - 1).map((item) => (
                  <Col
                    key={item.id}
                    style={{
                      padding: "0",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <PatronageCard {...item} />
                  </Col>
                ))}
              </Row>
            ))}
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto p-4">
            <Table striped bordered hover responsive className="text-center">
              <thead className="table-header">
                <tr>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Изображение</th>
                  <th>Действие</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {patronage
                  .slice(0, patronage.length - 1)
                  .sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
                  .map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleCardClick(item.id, "open")}
                    >
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.img || "default image"}</td>
                      <td>
                        <Button
                          variant="link"
                          onClick={(event) => {
                            event.stopPropagation(); // Остановить всплытие события
                            handleCardClick(item.id, "edit");
                          }}
                        >
                          Изменить
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="link"
                          onClick={(event) => {
                            event.stopPropagation(); // Остановить всплытие события
                            handleCardClick(item.id, "delete");
                          }}
                        >
                          Удалить
                        </Button>
                      </td>
                    </tr>
                  ))}

                {/* Строка для перехода на страницу добавления */}
                <tr
                  className="add-service-row"
                  onClick={() => navigate(`${ROUTES.SERVICES}/add-service`)}
                >
                  <td colSpan={6} className="py-3">
                    <span style={{ color: "#207e2a" }}>✚</span>{" "}
                    <strong>Добавить новую услугу</strong>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};
export default PatronageListPage;
