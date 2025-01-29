import { FC } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import "./PatronageCard.css";
import defaultImg from './defaultImg.jpg'
import { ROUTES } from "../Routes";
import { NavLink } from "react-router-dom";
import { deletePatronagesFromDisability, setPatronages } from "../slices/disabilityDraftSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../store';
import {DisabilityData} from "../slices/disabilityDraftSlice"

interface ICardProps {
  id?: number
  title?: string    
  img?: string
  comment?:string  
  isDraft?: boolean
  disabilityData?: DisabilityData
}

export const DisabilityCard: FC<ICardProps> = ({
  id,
  title,
  img,
  comment,
  isDraft,
  disabilityData,
}) => {
  if (!id) {return null}
  const dispatch = useDispatch<AppDispatch>();

  const handleDeletePatronage = async () => {
    if (id && disabilityData?.id) {
        await dispatch(deletePatronagesFromDisability({ disabilityId: disabilityData.id, patronageId: id }));
        dispatch(setPatronages(disabilityData.disability_patronages?.filter(
          patronage => patronage.id !== id)));
    }
}

  return (
<Card className="disability-patronage" style={{width:'736px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.38)', margin: '10px', padding: '10px' }}>
  <Card.Body style={{display: 'block' }}>
    <Row className="align-items-center" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      
      {/* Картинка */}
      <Col xs="auto" className="d-flex justify-content-start" style={{ paddingRight: '5px' }}>
        <img
          src={img}
          className="image"
          id="disability-img"
          style={{ width: '105px', height: '100px' }}
          alt="Patronage"
        />
      </Col>

      {/* Текст с кнопкой */}
      <Col style={{ flex: 1, paddingLeft: '5px' }}>
        <div id="disability-text" style={{ fontWeight: '500', fontSize: '24px', lineHeight: '120%' }}>
          <p>{title}</p>
        </div>
        <NavLink
          to={`${ROUTES.SERVICES}/${id}`} // Навигация по id патронажа
          className="button-detail"
          id="disability-button-detail"
        >
          <Button
            variant="outline-dark"
            style={{ width: '147px', height: '41px', fontWeight: '500', fontSize: '16px' }}
          >
            Подробнее
          </Button>
        </NavLink>
      </Col>

      {/* Подпись и поле ввода комментария */}
      <Col xs="auto" className="d-flex flex-column align-items-end" style={{ paddingLeft: '5px' }}>
        <label htmlFor="comment-input" style={{ fontWeight: '500', fontSize: '14px', marginBottom: '5px' }}>
          Комментарий
        </label>
        <Form.Control
          as="textarea"
          id="comment-input"
          rows={3}
          className="input-comment"
          defaultValue={comment}
          style={{ width: '100%', resize: 'none' }}
        />
      </Col>

    </Row>
  </Card.Body>
  {(isDraft) && (
    <Button className="fav-btn-open" onClick={() => handleDeletePatronage()}>
        Удалить
    </Button>
)}
</Card>


  );
};