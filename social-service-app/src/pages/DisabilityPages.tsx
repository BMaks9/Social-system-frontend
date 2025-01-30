import "./PatronagesDetail.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { AppDispatch, RootState } from "../store";
import { Card, Button, Form, Col, Row, Spinner, Image } from "react-bootstrap";
import { DisabilityCard } from "../components/disabilityCard";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  deletePatronagesFromDisability,
  getDisability,
} from "../slices/disabilityDraftSlice";
import {
  deleteDisability,
  setError,
  setDisabilityData,
  saveDisability,
} from "../slices/disabilityDraftSlice";
import "../components/PatronageCard.css";

const DisabilityPage: FC = () => {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isDraft = useSelector(
    (state: RootState) => state.disabilityDraft.isDraft
  );

  const { disabilityData, error } = useSelector(
    (state: RootState) => state.disabilityDraft
  );

  useEffect(() => {
    if (id) {
      dispatch(getDisability(id));
    }
  }, [dispatch]);

  const handleCardClick = (id: number | undefined) => {
    navigate(`${ROUTES.SERVICES}/${id}`);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      try {
        await dispatch(deleteDisability(id)).unwrap();
        navigate(ROUTES.SERVICES);
      } catch (error) {
        dispatch(setError(error));
      }
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(
      setDisabilityData({
        ...disabilityData,
        [name]: value,
      })
    );
  };
  const handleSaveDisability = () => {
    if (id) {
      const disabilityDataToSend = {
        disability_address: disabilityData.disability_address ?? "",
        disability_phone: disabilityData.disability_phone ?? "",
      };
      try {
        dispatch(
          saveDisability({ appId: id, disabilityData: disabilityDataToSend })
        );
      } catch (error) {
        dispatch(setError(error));
      }
    }
  };
  return (
    <>
      <div>
        {/* <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.DISABILITY, path: ROUTES.DISABILITY },
          { label: disabilityData?.id.toString() || "" },
        ]}
      /> */}
        {!isDraft ? (
          <div>
            <h4>Адрес: {disabilityData.disability_address}</h4>
            <h4>Телефон: {disabilityData.disability_phone}</h4>
          </div>
        ) : (
          <div
            style={{
              padding: "0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group
                  controlId="formPhone"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10px",
                    marginTop: "20px",
                  }}
                >
                  <Form.Label
                    style={{
                      width: "80px",
                      textAlign: "right",
                      marginRight: "10px",
                    }}
                  >
                    Телефон
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="disability_phone"
                    className="input-comment"
                    placeholder="Введите телефон"
                    value={disabilityData.disability_phone ?? ""}
                    onChange={handleInputChange}
                    required
                    disabled={!isDraft}
                    style={{ width: "300px" }} // Устанавливаем ширину
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group
                  controlId="formAddress"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Form.Label
                    style={{
                      width: "80px",
                      textAlign: "right",
                      marginRight: "10px",
                    }}
                  >
                    Адрес
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="disability_address"
                    className="input-comment"
                    placeholder="Введите адрес"
                    value={disabilityData.disability_address ?? ""}
                    onChange={handleInputChange}
                    required
                    disabled={!isDraft}
                    style={{ width: "300px" }} // Устанавливаем ширину
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        )}
        {disabilityData ? (
          disabilityData.disability_patronages?.map((item) => (
            <Col
              key={item.id}
              style={{
                padding: "0",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <DisabilityCard
                {...item}
                isDraft={isDraft}
                disabilityData={disabilityData}
              />
            </Col>
          ))
        ) : (
          <div className="album_page_loader_block">
            {/* загрузка */}
            <Spinner animation="border" />
          </div>
        )}
        {isDraft && (
          <div className="d-flex justify-content-center mt-3">
            <Button
              className="save-button me-2"
              variant="success"
              onClick={handleDelete}
            >
              Очистить
            </Button>
            <Button
              type="submit"
              className="save-button me-2"
              variant="success"
              onClick={handleSaveDisability}
            >
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
export default DisabilityPage;
