import './HomePage.css'
import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../Routes";
import { Button, Col, Container, Row } from "react-bootstrap";

export const HomePage: FC = () => {
  return (
    <Container style={{marginTop: '100px'}}>
      <Row>
        <Col md={6}>
          <p className="font-40" id='font-40-home'>
            Услуги центра здоровья
          </p>
          <p className="font-40" id='font-40-home'>
            ДЛЯ ПОЖИЛЫХ И МАЛОМОБИЛЬНЫХ ГРАЖДАН
          </p>
          <p className="font-30">
            с выездом на дом по Москве и области
          </p>
            <Button variant="none" className='button-home' href={ROUTES.SERVICES}>Просмотреть услуги</Button>
        </Col>
      </Row>
    </Container>
  );
};