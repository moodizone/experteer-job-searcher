import { JobType } from "../../api/type";

type StatusType = "pending" | "resolved" | "rejected" | "idle";
export interface StateType {
  loading: boolean;
  error: any;
  status: StatusType;
}
export interface ResultsProps extends StateType {
  results?: JobType[];
}

export interface ActionType {
  type: StatusType;
  payload?: StateType["error"];
}
