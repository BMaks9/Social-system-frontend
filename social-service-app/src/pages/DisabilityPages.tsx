import "./PatronagesDetail.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { AppDispatch, RootState } from '../store';
import { Card, Button, Form, Col, Row, Spinner, Image } from "react-bootstrap";
import {DisabilityCard} from '../components/disabilityCard'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams} from "react-router-dom";
import { deletePatronagesFromDisability, getDisability } from "../slices/disabilityDraftSlice";
import { deleteDisability, setError, setDisabilityData, saveDisability } from '../slices/disabilityDraftSlice';

const DisabilityPage: FC = () => {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isDraft = useSelector((state: RootState) => state.disabilityDraft.isDraft);

  const {
    disabilityData,
    error,
  } = useSelector((state: RootState) => state.disabilityDraft);

  useEffect(() => {
    if (id) {
      dispatch(getDisability(id));
    }
  }, [dispatch]);

  const handleCardClick = (id: number | undefined) => {
    navigate(`${ROUTES.SERVICES}/${id}`);
  };

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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(
        setDisabilityData({
            ...disabilityData,
            [name]: value,
        })
    );
  };
  const handleSaveDisability = () => {
    if (id) {
      const disabilityDataToSend = {
        disability_address: disabilityData.disability_address ?? '',
        disability_phone: disabilityData.disability_phone ?? '',
      };
      try {
        dispatch(saveDisability({ appId: id, disabilityData: disabilityDataToSend }));
      } catch (error) {
        dispatch(setError(error));
      }
    }
  }
  return (
    <div>
      {/* <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.DISABILITY, path: ROUTES.DISABILITY },
          { label: disabilityData?.id.toString() || "" },
        ]}
      /> */}
      {(!isDraft) ? (
                <div>
                <h4>Название вакансии: {disabilityData.disability_address}</h4>
                <h4>Обязанности: {disabilityData.disability_phone}</h4>
              </div>
          ) : (
            <div style={{ padding: '0', display: 'flex', justifyContent: 'center' }}>
            <Row className="mb-3">
                <Col xs={12}>
                <Form.Group controlId="formPhone" style={{marginRight:'100px'}}>
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control
                    type="tel"
                    name="disability_phone"
                    placeholder="Введите телефон"
                    value={disabilityData.disability_phone ?? ''}
                    onChange={handleInputChange}
                    required
                    disabled={!isDraft}
                    />
                </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12}>
                <Form.Group controlId="formPhone" style={{marginLeft:'100px'}}>
                    <Form.Label>Адрес</Form.Label>
                    <Form.Control
                    type="tel"
                    name="disability_address"
                    placeholder="Введите адрес"
                    value={disabilityData.disability_address ?? ''}
                    onChange={handleInputChange}
                    required
                    disabled={!isDraft}
                    />
                </Form.Group>
                </Col>
            </Row>
            <Button type="submit" className="save-button" onClick={handleSaveDisability}>
      Сохранить
    </Button>
        </div>
          )}
          {disabilityData ? (          
            disabilityData.disability_patronages?.map((item) => (
              <Col key={item.id} style={{ padding: '0', display: 'flex', justifyContent: 'center' }}>
                <DisabilityCard {...item} isDraft={isDraft} disabilityData={disabilityData}/>
              </Col>
            ))
            ) : (
            <div className="album_page_loader_block">{/* загрузка */}
            <Spinner animation="border" />
            </div>
            )}
        {(isDraft) &&
            <Button className="save-button" onClick={handleDelete}>
              Очистить
            </Button>
          }    
    </div>
  );
};
export default DisabilityPage;

