import { Navigate, Route, Routes } from "react-router-dom";

import Details from "../pages/Details";
import Search from "../pages/Search";
import { RouteName, RouteType } from "./type";
import AppLayout from "../AppLayout";

const ROUTES: Record<RouteName, RouteType> = {
  search: { path: "/jobs", Component: Search },
  details: { path: "/jobs/:id", Component: Details },
};
const defaultRoute = ROUTES.search.path;

const Router = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {Object.entries(ROUTES).map(
          ([key, { path, Component, ...otherProps }]) => (
            <Route
              key={key}
              path={path}
              element={<Component {...otherProps} />}
            />
          )
        )}
        <Route path={"*"} element={<Navigate to={defaultRoute} />} />
      </Route>
    </Routes>
  );
};

export { ROUTES, defaultRoute, Router };
