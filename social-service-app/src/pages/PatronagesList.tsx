import "./PatronagesList.css";
import { FC, useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Patronage, getPatronage } from "../modules/SocialServiceApi";
import InputField from "../components/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { PatronageCard } from "../components/PatronageCard";
import  {PATRONAGES_MOCK}  from "../modules/mock";

const PatronageListPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [patronage, setPatronage] = useState<Patronage[]>([]);

  const handleSearch = () => {
    setLoading(true);
    getPatronage(searchValue)
      .then((response) => {
        setPatronage(
          response
        )
        setLoading(false);
      })
      .catch(() => { // В случае ошибки используем mock данные, фильтруем по имени 
        setPatronage(
          PATRONAGES_MOCK
          )
        setLoading(false);
      });
  };

  useEffect(() => {
    handleSearch();  // Например, загрузим музыку по запросу "pop" сразу при загрузке
  }, []);

  return (
    <div className="container">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.SERVICES }]} />
      
      <InputField
        value={searchValue}
        setValue={(value) => setSearchValue(value)}
        loading={loading}
        onSubmit={handleSearch}
      />

      {loading && (
        <div className="loadingBg">
          <Spinner animation="border" />
        </div>
      )}
      
      {!loading &&
        (!patronage.length /* Проверка на существование данных */ ? (
          <div>
            <h1>Пусто</h1>
          </div>
        ) : (
          <Row xs={4} md={4} className="g-2" style={{marginInline: 'auto'}}>
            {patronage.map((item, index) => (
              <Col key={index} style={{padding:'0px'}}>
                <PatronageCard {...item} />
              </Col>
            ))}
          </Row>
        ))
        }
    </div>
  );
};
export default PatronageListPage;