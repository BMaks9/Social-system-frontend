import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import "./PatronageCard.css";
import defaultImg from "./defaultImg.jpg";
import { ROUTES } from "../Routes";
import { NavLink } from "react-router-dom";

import { addPatronageToDisability } from "../slices/disabilityDraftSlice";
import { getPatronageList } from "../slices/patronageSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { toast } from "react-toastify";

interface ICardProps {
  id?: number;
  title?: string;
  img?: string;
}

export const PatronageCard: FC<ICardProps> = ({ id, title, img }) => {
  if (!id) {
    return null;
  }
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  // Обработчик события нажатия на кнопку "Добавить"
  const handleAdd = async () => {
    if (id) {
      try {
        await dispatch(addPatronageToDisability(id)).unwrap();
      } catch (error) {
        toast.warn("Услуга уже есть в заявке", {
          position: "bottom-right",
          autoClose: 2000, // Авто-закрытие через 3 сек
        });
      }
      await dispatch(getPatronageList()); // Для обновления отображения состояния иконки "корзины"
    }
  };
  return (
    <Card className="patronage-card">
      <Card.Img className="cardImage" variant="none" src={img || defaultImg} />
      <Card.Body className="card-body">
        <div className="titleStyle">
          <Card.Title>{title}</Card.Title>
        </div>
        <Button className="cardButton" variant="none">
          <NavLink to={`${ROUTES.SERVICES}/${id}`} className="textButton">
            Подробней
          </NavLink>
        </Button>
        {isAuthenticated && (
          <Button
            className="buttonAdd"
            variant="none"
            onClick={() => handleAdd()}
          >
            ЗАКАЗАТЬ УСЛУГУ
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
