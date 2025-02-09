import "./PatronagesDetail.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { useParams, useNavigate } from "react-router-dom";
import { Patronage, getPatronageId } from "../modules/SocialServiceApi";
import { Col, Row, Spinner, Image } from "react-bootstrap";
import { PATRONAGES_MOCK } from "../modules/mock";
import defaultImg from "../components/defaultImg.jpg";
import { GetPatronagesDetail } from "../api/Api";
import NotFoundPage from "./NotFoundPage"; // добавьте страницу 404

export const PatronageDetailPage: FC = () => {
  const [pageData, setPageData] = useState<GetPatronagesDetail | null>(null); // исправил тип на null
  const [loading, setLoading] = useState<boolean>(true); // для контроля загрузки
  const [error, setError] = useState<boolean>(false); // для контроля ошибки
  const { id } = useParams(); // ид страницы
  const navigate = useNavigate(); // для навигации в случае ошибки 404

  useEffect(() => {
    if (!id) return;
    setLoading(true); // начинаем загрузку
    getPatronageId(id)
      .then((response) => {
        setPageData(response);
        setLoading(false);
      })
      .catch(() => {
        // В случае ошибки, фильтруем данные по имени из моков
        const mockData = PATRONAGES_MOCK.find(
          (patronage) => String(patronage.id) === id
        );
        if (mockData) {
          setPageData(mockData);
        } else {
          setError(true); // если данные не найдены
        }
        setLoading(false); // заканчиваем загрузку
      });
  }, [id]);

  if (loading) {
    return (
      <div className="album_page_loader_block">
        {/* загрузка */}
        <Spinner animation="border" />
      </div>
    );
  }

  if (error || !pageData?.id) {
    // если произошла ошибка или данные не найдены
    return <NotFoundPage />;
  }

  return (
    <div>
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.SERVICES, path: ROUTES.SERVICES },
          { label: pageData?.title || "Услуга" },
        ]}
      />
      <div className="container">
        <Row>
          <Col md={6} style={{ alignContent: "center" }}>
            <p className="font-60">{pageData.title}</p>
            <p className="font-30">для пожилых и маломобильных граждан</p>
          </Col>
          <Col md={6} style={{ display: "flex", justifyContent: "center" }}>
            <Image
              className="image"
              src={pageData.img || defaultImg} // дефолтное изображение
              alt="Картинка"
            />
          </Col>
          <p className="font-40">Что мы делаем?</p>
          <p className="font-20">{pageData.description}</p>
        </Row>
      </div>
    </div>
  );
};
