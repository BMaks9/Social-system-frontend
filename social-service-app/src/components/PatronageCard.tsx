import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import "./PatronageCard.css";
import defaultImg from './defaultImg.jpg'
import { ROUTES } from "../Routes";

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
        <Button className="cardButton"  variant="none" href={`${ROUTES.SERVICES}/${id}`}>
          Подробней
        </Button>
      </Card.Body>
    </Card>
  );
};