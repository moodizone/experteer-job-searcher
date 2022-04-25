import { JobType } from "../../api/type";

type StatusType = "pending" | "resolved" | "rejected" | "idle";
export interface StateType {
  results: JobType[] | null;
  loading: boolean;
  error: any;
  status: StatusType;
}

export interface ActionType {
  type: StatusType;
  payload?: StateType["results"] | StateType["error"];
}
