import { SearchResults } from "../../redux/slice/jobs";

type StatusType = "pending" | "resolved" | "rejected" | "idle";
export interface StateType {
  results: SearchResults | null;
  loading: boolean;
  error: any;
  status: StatusType;
}

export interface ActionType {
  type: StatusType;
  payload?: StateType["results"] | StateType["error"];
}
