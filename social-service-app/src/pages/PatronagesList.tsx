import "./PatronagesList.css";
import { FC, useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";

import InputField from "../components/InputField";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTE_LABELS } from "../Routes";
import { PatronageCard } from "../components/PatronageCard";
import  {PATRONAGES_MOCK}  from "../modules/mock";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../slices/dataSlices';
import { AppDispatch, RootState } from '../store';

import { getPatronageList } from '../slices/patronageSlice';


const PatronageListPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { searchValue, patronage, loading } = useSelector((state: RootState) => state.patronages); // получение данных из стора

  useEffect(() => {
    dispatch(getPatronageList()); // отправляем `thunk`
  }, [dispatch]);

  const handleCardClick = (patronages_id: number | undefined) => {
    navigate(`${PATRONAGES_MOCK}/${patronages_id}`);
  };

  return (
    <div className="container">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.SERVICES }]} />
      <InputField
        loading={loading}
        value={searchValue}
        // setValue={setSearchValue}
        // onSubmit={handleSearchSubmit}
        // placeholder="Поиск по услуге"
        // buttonTitle="Найти"
        // currentCount={patronage[patronage.length - 1]?.current_count}
        // disabilityId={patronage[patronage.length - 1]?.disabilities_id}
        // isLinkDisabled = {patronage[patronage.length - 1]?.current_count ? false : true}
      />
      {/* {patronage[patronage.length - 1].current_count}
      {patronage[patronage.length - 1].disabilities_id} */}
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
              {patronage.slice(0, patronage.length - 1).map((item) => (
                <Col key={item.id} style={{ padding: '0', display: 'flex', justifyContent: 'center' }}>
                  <PatronageCard 
                  {...item } 
                  // isLinkDisabled = {patronage[patronage.length - 1]?.current_count ? false : true}
                  />
                </Col>
              ))}
          </Row>
        ))
        }
    
    </div>
  );
};
export default PatronageListPage;



// const [loading, setLoading] = useState(false);
// const [patronage, setPatronage] = useState<Patronage[]>([]);

// const dispatch = useDispatch();
// const handleSearchSubmit = () => {
//   dispatch(setSearchTerm(searchValue));
// };

// const { searchTerm } = useSelector(
//   (state: RootState) => state.filter
// );

// const [searchValue, setSearchValue] = useState<string>(searchTerm);
// const filteredServices = PATRONAGES_MOCK.filter((service) => {
//   return (
//     (searchTerm ? service.title.toLowerCase().startsWith(searchTerm.toLowerCase()) : true)
//   );
// });

// const handleSearch = () => {
//   setLoading(true);
//   getPatronage(searchValue)
//     .then((response) => {
//       setPatronage(
//         response
//       )
//       setLoading(false);
//     })
//     .catch(() => { // В случае ошибки используем mock данные, фильтруем по имени 
//       setPatronage(
//         filteredServices
//         )
//       setLoading(false);
//   });
// useEffect(() => {
//   handleSearch();
// }, [searchTerm]);