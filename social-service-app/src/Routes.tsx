export const ROUTES = {
    HOME: "/",
    SERVICES: "/list-patronage",
    LOGIN: "/login",
    REGISTER: "/register",
    DISABILITY: "/disability",
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    SERVICES: "Услуги для инвалидов",
    LOGIN: "Вход в систему",
    REGISTER: "Регистрация",
    DISABILITY: "Заявка"
  };