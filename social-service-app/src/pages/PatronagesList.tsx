import "./PatronagesList.css";
import { FC, useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Patronage, getPatronage } from "../modules/SocialServiceApi";
import InputField from "../components/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTE_LABELS } from "../Routes";
import { PatronageCard } from "../components/PatronageCard";
import  {PATRONAGES_MOCK}  from "../modules/mock";


import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSearchTerm } from '../slices/dataSlices';

const PatronageListPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [patronage, setPatronage] = useState<Patronage[]>([]);
  
  const dispatch = useDispatch();
  const handleSearchSubmit = () => {
    dispatch(setSearchTerm(searchValue));
  };

  const { searchTerm } = useSelector(
    (state: RootState) => state.filter
  );
  
  const [searchValue, setSearchValue] = useState<string>(searchTerm);
  const filteredServices = PATRONAGES_MOCK.filter((service) => {
    return (
      (searchTerm ? service.title.toLowerCase().startsWith(searchTerm.toLowerCase()) : true)
    );
  });

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
          filteredServices
          )
        setLoading(false);
      });
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <div className="container">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.SERVICES }]} />
      <InputField
        value={searchValue}
        setValue={setSearchValue}
        onSubmit={handleSearchSubmit}
        placeholder="Поиск по услуге"
        buttonTitle="Найти"
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
          <Row 
              className="g-2"  /* Большее расстояние между карточками */
              style={{ marginInline: 'auto' }}
>
            {patronage.map((item, index) => (
              <Col key={index} style={{ padding: '0', justifyItems: 'center'}}>
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