import "./PatronagesDetail.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { useParams } from "react-router-dom";
import { Patronage, getPatronageId } from "../modules/SocialServiceApi";
import { Col, Row, Spinner, Image } from "react-bootstrap";
import { PATRONAGES_MOCK } from "../modules/mock";
import defaultImg from "../components/defaultImg.jpg";
import { GetPatronagesDetail } from "../api/Api";

export const PatronageDetailPage: FC = () => {
  const [pageData, setPageDdata] = useState<GetPatronagesDetail>();
  const { id } = useParams(); // ид страницы

  useEffect(() => {
    if (!id) return;
    getPatronageId(id)
      .then((response) => setPageDdata(response))
      .catch(() =>  // В случае ошибки используем mock данные, фильтруем по имени 
        setPageDdata(
          PATRONAGES_MOCK.find((patronage) => String(patronage.id) == id)
          )
      )
  }, [id]);

  return (
    <div>
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.SERVICES, path: ROUTES.SERVICES },
          { label: pageData?.title || "Услуга" },
        ]}
      />
      {pageData ? ( // проверка на наличие данных, иначе загрузка
        <div className="container">
          <Row>
            <Col md={6} style={{alignContent:'center'}}>
              <p className="font-60">
                {pageData.title}
              </p>
              <p className="font-30">для пожилых и маломобильных граждан</p>
            </Col>
            <Col md={6} style={{display: 'flex',justifyContent:'center'}}>
              <Image className="image"
                src={pageData.img || defaultImg} // дефолтное изображение, если нет artworkUrl100
                alt="Картинка"
              />
            </Col>
            <p className="font-40">Что мы делаем?</p>
            <p className="font-20">
                {pageData.description}
              </p>
          </Row>
        </div>
      ) : (
        <div className="album_page_loader_block">{/* загрузка */}
          <Spinner animation="border" />
        </div>
      )}
    </div>
  );
};