import './HomePage.css'
import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../Routes";
import { Button, Col, Container, Row, Carousel } from "react-bootstrap";
import imgCorouselOne from '../components/imgCarousel1.jpg'
import imgCorouselTwo from '../components/imgCarousel2.jpg'
import imgCorouselThree from '../components/imgCarousel3.png'

export const HomePage: FC = () => {
  return (
    <Container style={{display:'flex', alignItems: 'center', marginTop: '80px'}}>
      <Row>
        <Col md={6}>
          <p className="font-40" id='font-40-home'>
            Услуги центра здоровья
          </p>
          <p className="font-40" id='font-40-home'>
            ДЛЯ ПОЖИЛЫХ И МАЛОМОБИЛЬНЫХ ГРАЖДАН
          </p>
          <p className="font-30" id='font-40-home'>
            с выездом на дом по Москве и области
          </p>
        </Col>
      </Row>
      <Carousel style={{width: '900px', height: '350px'}}>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100 mx-auto" src={imgCorouselOne}
            alt="Image One"
          />
          <Carousel.Caption>
            <h3>Более 8000 довольных клиентов за 9 лет работы</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
        <img
            className="d-block w-100 mx-auto" src={imgCorouselTwo}
            alt="Image Two"
          />
          <Carousel.Caption>
            <h3>У нас работают мастера высшей категории</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100 mx-auto" src={imgCorouselThree}
            alt="Image Three"
          />
          <Carousel.Caption>
            <h3>Повышение качества Вашей жизни – наша главная миссия!</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>    
  );
};