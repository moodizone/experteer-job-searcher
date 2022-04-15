import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../layout";
import Details from "../pages/Details";
import Search from "../pages/Search";
import { RouteName, RouteType } from "./type";
import React from "react";

const ROUTES: Record<RouteName, RouteType> = {
  search: { path: "/jobs", Component: Search,title:'Search' },
  details: { path: "/jobs/:id", Component: Details, },
};
const defaultRoute = ROUTES.search.path;

const Router = () => {
  return (
    <Routes>
      {Object.entries(ROUTES).map(
        ([key, { path, Component, ...otherProps }]) => (
          <Route
            key={key}
            path={path}
            element={
              <AppLayout {...otherProps}>
                <Component />
              </AppLayout>
            }
          />
        )
      )}
      <Route path={"*"} element={<Navigate to={defaultRoute} />} />
    </Routes>
  );
};

export { ROUTES, defaultRoute, Router };
