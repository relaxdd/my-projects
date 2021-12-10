import { ComponentType } from "react";

export default interface IRoute {
  path: string;
  component: ComponentType;
  exact: boolean;
  title: string;
}
