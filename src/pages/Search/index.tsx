import * as React from "react";
import { useSearchParams } from "react-router-dom";

import Results from "./Results";
import { ActionType, StateType } from "./type";
import { JobType } from "../../api/type";
import { jobSearcherApi, SearchBody } from "../../api";
import { useInterval } from "../../hooks/useInterval";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearResults, setResults } from "../../redux/slice/jobs";

let interval: NodeJS.Timer;
const initialState: StateType = {
  loading: false,
  status: "idle",
  error: null,
};
function searchReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "idle":
      return initialState;
    case "pending":
      return {
        error: null,
        loading: true,
        status: "pending",
      };
    case "rejected":
      return {
        error: action.payload,
        loading: false,
        status: "rejected",
      };
    case "resolved":
      return {
        error: null,
        loading: false,
        status: "resolved",
      };
    default:
      throw Error(`invalid action type :${action.type}`);
  }
}

const Search = () => {
  const dispatch = useAppDispatch();
  const [state, action] = React.useReducer(searchReducer, initialState);
  const [searchedParams, setSearchParams] = useSearchParams();
  const [UUID, setUUID] = React.useState<string | null>(null);
  const results = useAppSelector((state) => state.jobs.result);
  const onSubmit = React.useCallback(async () => {
    const form: HTMLFormElement | null = document.querySelector(
      "form[name='searchForm']"
    );

    if (form) {
      const { Query, Limit } = Object.fromEntries(new FormData(form).entries());

      if (Query && Limit) {
        action({ type: "pending" });
        // type alias because I'm sure I dont have uploader input
        const body = { Query, Limit } as SearchBody;

        // set query string on URL
        setSearchParams({ Query: body.Query });

        // fake delay in order to loading last longer
        await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
          const uuidResponse = await jobSearcherApi.search(body);

          // results which cached by backend so skip other steps
          if (Array.isArray(uuidResponse)) {
            action({ type: "resolved", payload: uuidResponse as JobType[] });
            return;
          }

          // polling for status with new UUID every 3 seconds
          setUUID(uuidResponse as string);
        } catch (e) {
          action({ type: "rejected", payload: e });
        }
      }
    }
  }, [setSearchParams]);

  useInterval(
    async () => {
      if (UUID) {
        const status = await jobSearcherApi.status(UUID);
        if (status === 200) {
          const response = await jobSearcherApi.result(UUID);
          setUUID(null);
          action({ type: "resolved", payload: response });
          dispatch(setResults(response));
          clearInterval(interval);
        }
      }
    },
    // - set delay as `null` consider as termination of interval
    // - interval will cleanup automatically with build-in mechanism on `unMount` phase
    UUID ? 3000 : null
  );

  // cleanup on component unmount
  React.useEffect(() => {
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  // parse URL and fill input if provided
  React.useEffect(() => {
    if (searchedParams.has("Query")) {
      const inputElement = document.querySelector('input[name="Query"]');
      const value = searchedParams.get("Query");

      if (inputElement && value) {
        (inputElement as HTMLInputElement).value = value;
      }
    } else {
      dispatch(clearResults());
    }
  }, [dispatch, searchedParams]);

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
      <Results {...state} results={results} />
    </div>
  );
};

export default Search;
