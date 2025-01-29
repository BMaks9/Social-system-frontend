import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import "./PatronageCard.css";
import defaultImg from './defaultImg.jpg'
import { ROUTES } from "../Routes";
import { NavLink } from "react-router-dom";

import { addPatronageToDisability } from '../slices/disabilityDraftSlice';
import { getPatronageList } from '../slices/patronageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

interface ICardProps {
  id?: number
  title?: string;
  img?: string;
}

export const PatronageCard: FC<ICardProps> = ({
  id,
  title,
  img,
}) => {
  if (!id) {return null}
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

// Обработчик события нажатия на кнопку "Добавить"
  const handleAdd = async () => {
    if (id) {
        await dispatch(addPatronageToDisability(id));
        await dispatch(getPatronageList()); // Для обновления отображения состояния иконки "корзины" 
    }
}
  return (
    <Card className="patronage-card">
      <Card.Img
        className="cardImage"
        variant="none"
        src={img || defaultImg}
      />
      <Card.Body className="card-body">
        <div className="titleStyle">
          <Card.Title>{title}</Card.Title>
        </div>
        <Button className="cardButton"  variant="none">
          <NavLink to = {`${ROUTES.SERVICES}/${id}`} className='textButton'>Подробней</NavLink>
        </Button>
        { isAuthenticated && 
        <Button className="buttonAdd"  variant="none" onClick={() => handleAdd() }>
          <p className='textAddButton'>ЗАКАЗАТЬ УСЛУГУ</p>
        </Button>
        }
      </Card.Body>
    </Card>
  );
};