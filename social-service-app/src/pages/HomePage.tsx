import './HomePage.css'
import { FC } from "react";
// import { Link } from "react-router-dom";
// import { ROUTES } from "../Routes";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import imgCorouselOne from '../components/imgCarousel1.jpg'
import imgCorouselTwo from '../components/imgCarousel2.jpg'
import imgCorouselThree from '../components/imgCarousel3.png'

export const HomePage: FC = () => {
  return (
    <Container className = 'cont'>
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
      
      <Carousel className='carouselHome'>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100 mx-auto" src={imgCorouselOne}
            alt="Image One"
          />
          <Carousel.Caption>
          <p className="font-carousel">
              Более 8000 довольных клиентов за 9 лет работы
          </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
        <img
            className="d-block w-100 mx-auto" src={imgCorouselTwo}
            alt="Image Two"
          />
          <Carousel.Caption>
          <p className="font-carousel">
              У нас работают мастера высшей категории
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100 mx-auto" src={imgCorouselThree}
            alt="Image Three"
          />
          <Carousel.Caption>
            <p className="font-carousel">
              Повышение качества Вашей жизни – наша главная миссия!
              </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </Row>
    </Container>    
  );
};