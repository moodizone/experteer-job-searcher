import React from "react";

export type RouteName = "search" | "details";

export interface RouteType {
  path: string;
  Component: React.ComponentType;
}
