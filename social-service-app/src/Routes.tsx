export const ROUTES = {
    HOME: "/",
    SERVICES: "/list-patronage",
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    SERVICES: "Услуги для инвалидов",
  };