import React, { ChangeEvent, FC, useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_LABELS, ROUTES } from "../Routes";
import { AppDispatch, RootState } from "../store";
import {
  completedDisabilities,
  getDisabilities,
  setCreator,
  setEndDate,
  setStartDate,
  setStatus,
} from "../slices/disabilitiesSlice";
import "./DisabilityTablePage.css";
import { BreadCrumbs } from "../components/BreadCrumbs";
import ForbiddenPage from "./ForbiddenPage";
import { Table, Button, Row, Col, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const DisabilityTablePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { disabilities, loading, status, startDate, endDate, creatorFilter } =
    useSelector((state: RootState) => state.disabilities);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const filteredDisabilities = disabilities.filter((item) =>
    item?.creator?.toLowerCase().startsWith(creatorFilter.toLowerCase())
  );
  useEffect(() => {
    const fetchData = () => {
      dispatch(getDisabilities());
    };
    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleCardClick = (id: number | undefined) => {
    navigate(`${ROUTES.DISABILITY}/${id}`);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setStatus(e.target.value));
  };
  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setStartDate(e.target.value));
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    dispatch(setEndDate(e.target.value));
  };

  const handleSaveFilters = async () => {
    try {
      await dispatch(getDisabilities()).unwrap();
    } catch (error) {
      toast.error("Ошибка фильтрации!", {
        position: "bottom-right",
        autoClose: 2000, // Авто-закрытие через 3 сек
      });
    }
  };

  const handleButtonClick = (
    id: number | undefined,
    action: "completed" | "rejected"
  ) => {
    if (!id) return;
    dispatch(completedDisabilities({ id, action }));
  };

  const handleCreatorFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCreator(e.target.value)); // Обновляем фильтр по создателю
  };
  if (!isAuthenticated) {
    // если произошла ошибка или данные не найдены
    return <ForbiddenPage />;
  }

  return (
    <>
      <BreadCrumbs
        crumbs={[
          {
            label: ROUTE_LABELS.DISABILITY,
            path: ROUTES.DISABILITY,
          },
        ]}
      />
      <div
        className="filter-container"
        style={{
          padding: "20px",
          backgroundColor: "#f7f7f7",
        }}
      >
        <Row>
          <Col md={3}>
            <Form.Group controlId="statusFilter">
              <Form.Label>Статус</Form.Label>
              <Form.Control
                as="select"
                className="custom-focus"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="">Все</option>
                <option value="formed">Сформирована</option>
                <option value="completed">Принята</option>
                <option value="rejected">Отклонена</option>
                <option value="deleted">Удалена</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="startDateFilter">
              <Form.Label>Начальная дата</Form.Label>
              <Form.Control
                type="date"
                className="custom-focus"
                value={startDate || ""}
                onChange={handleStartDateChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="endDateFilter">
              <Form.Label>Конечная дата</Form.Label>
              <Form.Control
                type="date"
                className="custom-focus"
                value={endDate}
                onChange={handleEndDateChange || ""}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="creatorFilter">
              <Form.Label>Создатель</Form.Label>
              <Form.Control
                type="text"
                className="custom-focus"
                value={creatorFilter}
                onChange={handleCreatorFilterChange} // Событие для обновления фильтра по создателю
                placeholder="Введите имя создателя"
              />
            </Form.Group>
          </Col>
          {/* <Col md={3} style={{ display: "flex", alignItems: "flex-end" }}>
            <Button variant="success" onClick={handleSaveFilters}>
              Применить фильтры
            </Button>
          </Col> */}
        </Row>
      </div>
      {/* Форма фильтрации */}

      <div className="overflow-x-auto p-4">
        <Table striped bordered hover responsive className="text-center">
          <thead className="table-header">
            <tr>
              <th>ID</th>
              <th>Телефон</th>
              <th>Адрес</th>
              <th>Статус</th>
              <th>Дата создания</th>
              <th>Дата компиляции</th>
              <th>Дата завершения</th>
              <th>Дата доставки</th>
              <th>Создатель</th>
              <th>Модератор</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {filteredDisabilities.map((item) => (
              <tr key={item.id} onClick={() => handleCardClick(item.id)}>
                <td>{item.id}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.status}</td>
                <td>{item.data_created}</td>
                <td>{item.data_compilation}</td>
                <td>{item.data_finished}</td>
                <td>{item.date_dilivery}</td>
                <td>{item.creator}</td>
                <td>{item.moderator}</td>
                <td>
                  {/* Показываем кнопки только если статус 'formated' */}
                  {item.status === "formed" && (
                    <>
                      <Button
                        variant="success"
                        className="mx-2"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleButtonClick(item.id, "completed");
                        }}
                      >
                        Принять
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleButtonClick(item.id, "rejected");
                        }}
                      >
                        Отклонить
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default DisabilityTablePage;
