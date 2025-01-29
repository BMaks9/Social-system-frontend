import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Disability, getDisabilities } from "../modules/SocialServiceApi";
import {ROUTES} from '../Routes'
const DisabilityTablePagePage = () => {
  const [loading, setLoading] = useState(true); // Состояние для анимации загрузки
  const [error, setError] = useState(''); // Состояние для обработки ошибок
  const { isAuthenticated } = useSelector((state:any) => state.auth); // Проверка на авторизацию
  const [requests, setDisability] = useState<Disability[]>([]);

  const handleSearch = () => {
    setLoading(true);
    getDisabilities()
      .then((response) => {
        setDisability(
          response
        )
        setLoading(false);
      })
      .catch(() => { // В случае ошибки используем mock данные, фильтруем по имени 
        setLoading(false);
      });
  };

  useEffect(() => {
    handleSearch();
  }, [isAuthenticated]);

  return (
<div className="container-fluid bg-white text-dark min-vh-100">
  <div className="container my-4">
    <h2 className="mb-9 text-success">Мои заявки</h2>

    {loading ? (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    ) : error ? (
      <div className="alert alert-danger">{error}</div>
    ) : (
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="bg-success text-white table-success">
            <tr>
              <th className="text-center">Номер заявки</th>
              <th className="text-center">Статус</th>
              <th className="text-center">Дата создания</th>
              <th className="text-center">Дата формирования</th>
              <th className="text-center">Дата завершения</th>
              <th className="text-center">Модератор</th>
              <th className="text-center">Дата доставки</th>
              <th className="text-center">Действия</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="text-center">{request.id}</td>
                <td className="text-center">{request.status}</td>
                <td className="text-center">{new Date(request.data_created).toLocaleString()}</td>
                <td className="text-center">
                  {request.data_compilation != null ? new Date(request.data_compilation).toLocaleString() : '—'}
                </td>
                <td className="text-center">
                  {request.data_finished != null ? new Date(request.data_finished).toLocaleString() : '—'}
                </td>
                <td className="text-center">{request.moderator}</td>
                <td className="text-center">{request.date_dilivery}</td>
                <td className="text-center">
                  <Link to={`${ROUTES.DISABILITY}/${request.id}`} className="btn btn-outline-success">
                    Просмотр
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>



  );
};

export default DisabilityTablePagePage;