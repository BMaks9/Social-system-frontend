import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import "./PatronageCard.css";
import defaultImg from './defaultImg.jpg'
import { ROUTES } from "../Routes";
import { NavLink } from "react-router-dom";

interface ICardProps {
  id: number
  title: string;
  img: string;
}

export const PatronageCard: FC<ICardProps> = ({
  id,
  title,
  img,
}) => {
  if (!id) {return null}
  return (
    <Card className="card">
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
      </Card.Body>
    </Card>
  );
};