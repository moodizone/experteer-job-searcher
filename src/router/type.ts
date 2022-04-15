import React from "react";

export type RouteName = "search" | "details";
export interface PageProps {
  /**
   * tab title
   * @default 'Experteer'
   */
  title?: string;
}

export interface RouteType {
  path: string;
  title?: string;
  Component: React.ComponentType;
}
