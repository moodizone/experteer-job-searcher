import * as React from "react";
import { useSearchParams } from "react-router-dom";

import Results from "./Results";
import { ActionType, StateType } from "./type";
import { baseWsURL } from "../../constant/baseURL";
import { setResults } from "../../redux/slice/jobs";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

let webSocket: WebSocket;
const initialState: StateType = {
  loading: false,
  error: null,
  results: null,
  status: "idle",
};

function searchReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "idle":
      return initialState;
    case "pending":
      return {
        error: null,
        results: null,
        loading: true,
        status: "pending",
      };
    case "rejected":
      return {
        error: action.payload,
        results: null,
        loading: false,
        status: "rejected",
      };
    case "resolved":
      return {
        error: null,
        results: action.payload,
        loading: true,
        status: "resolved",
      };
    default:
      throw Error(`invalid action type :${action.type}`);
  }
}

const Search = () => {
  const dispatch = useAppDispatch();
  const [searchedParams, setSearchParams] = useSearchParams();
  const session = useAppSelector((state) => state.user.session);
  const [state, action] = React.useReducer(searchReducer, initialState);

  const onSubmit = React.useCallback(() => {
    const form: HTMLFormElement | null = document.querySelector(
      "form[name='searchForm']"
    );

    if (form) {
      const { Query, Limit } = Object.fromEntries(new FormData(form).entries());
      if (Query && Limit && session && webSocket) {
        // type alias because I'm sure I dont have uploader input
        const body = { Query, Limit } as Record<string, string>;
        action({ type: "pending" });
        setSearchParams({ Query: body.Query });
        webSocket.send(JSON.stringify(body));
      }
    }
  }, [session, setSearchParams]);

  React.useEffect(() => {
    if (searchedParams.has("Query")) {
      const input = document.querySelector('input[name="Query"]');
      const value = searchedParams.get("Query");
      if (input && value) {
        (input as HTMLInputElement).value = value;
      }
    }
  }, [searchedParams]);

  React.useEffect(() => {
    if (session) {
      webSocket = new WebSocket(`ws://${baseWsURL}/stream/${session}`);
      webSocket.onmessage = ({ data: rawDate }) => {
        const data = JSON.parse(rawDate);
        action({ type: "resolved", payload: JSON.parse(data) });
        dispatch(setResults(data));
      };
      webSocket.onerror = (e) => {
        action({ type: "rejected", payload: e });
        webSocket.close();
      };
    }

    return () => {
      action({ type: "idle" });
      webSocket?.close();
    };
  }, [dispatch, session]);

  return (
    <div className="container">
      <div>
        <div className={"row gy-3"}>
          <div className="col-12">
            <h1 className="text-white text-center mb-3 mb-lg-5">
              {"Welcome to DevJobs"}
            </h1>
          </div>
          <div className="col-12">
            <form
              name={"searchForm"}
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
            >
              <div className="px-3 d-flex flex-wrap gx-3 gy-3 row">
                <div className="col-12 col-sm-8 col-md-7">
                  <input
                    required
                    name="Query"
                    type="text"
                    className="form-control"
                    placeholder={"Find your dream job now"}
                  />
                </div>
                <div className="col-12 col-sm-4 col-md-3">
                  <select
                    name={"Limit"}
                    className="form-select"
                    defaultValue={"10"}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div className="col-12 col-sm-12 col-md-2">
                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={state.loading}
                  >
                    {"Search"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Results {...state} />
    </div>
  );
};

export default Search;
