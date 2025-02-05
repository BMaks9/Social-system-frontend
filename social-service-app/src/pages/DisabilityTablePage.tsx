import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_LABELS, ROUTES } from "../Routes";
import { AppDispatch, RootState } from "../store";
import { getDisabilities } from "../slices/disabilitiesSlice";
import { Button, Table, Spinner } from "react-bootstrap";
import "./DisabilityTablePage.css";
import { BreadCrumbs } from "../components/BreadCrumbs";

const DisabilityTablePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { disabilities, loading } = useSelector(
    (state: RootState) => state.disabilities
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDisabilities());
  }, [dispatch]);

  const handleCardClick = (id: number | undefined) => {
    navigate(`${ROUTES.DISABILITY}/${id}`);
  };

  return (
    <>
      {loading && (
        <div className="loadingBg">
          <Spinner animation="border" />
        </div>
      )}
      <BreadCrumbs
        crumbs={[
          {
            label: ROUTE_LABELS.DISABILITY,
            path: ROUTES.DISABILITY,
          },
        ]}
      />
      <div className="overflow-x-auto p-4">
        <Table striped bordered hover responsive className="text-center">
          <thead className="table-header">
            {" "}
            {/* Применяем кастомный класс */}
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
            {disabilities.map((item) => (
              <tr key={item.id}>
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
                  <Button
                    variant="success"
                    onClick={() => handleCardClick(item.id)}
                  >
                    Открыть
                  </Button>
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
