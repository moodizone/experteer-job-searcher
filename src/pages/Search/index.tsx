import * as React from "react";

import JobCard from "../../components/JobCard";
import SearchLoading from "../../components/SearchLoading/SearchLoading";
import { baseWsURL } from "../../constant/baseURL";
import { setResults } from "../../redux/slice/jobs";
import { setUUID } from "../../redux/slice/user";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useAsyncFn } from "../../hooks/async";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.user.session);
  const result = useAppSelector((state) => state.jobs.result);
  const { loading, handler: onSubmit } = useAsyncFn<any>(
    async (event: any) => {
      const location = event[0].target[0].value;
      const query = event[0].target[1].value;

      if (query && session && location) {
        await dispatch(setUUID({ query, session, location }));
        const webSocket = new WebSocket(`ws://${baseWsURL}/stream/${session}`);

        webSocket.onmessage = ({ data }) => {
          dispatch(setResults(JSON.parse(data)));
        };
        webSocket.onerror = (e) => {
          console.error(`Error occurred during communication : ${e}`);
          webSocket.close();
        };
        return () => {
          webSocket.close();
        };
      }
    },
    [dispatch, session]
  );
  const content = (
    <div className="row">
      <div className="col-10 col-sm-9 col-md-8 col-lg-6 mx-auto my-3">
        <div className="row gy-3">
          {result?.Jobs?.map((job) => (
            <JobCard
              {...job}
              key={job.Guid}
              onClick={() =>
                navigate(`${ROUTES.details.path}`.replace(":id", job.Guid))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );

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
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e);
              }}
            >
              <div className="px-3 d-flex flex-wrap gx-3 gy-3 row">
                <div className="col-12 col-sm-6 col-md-5">
                  <select
                    name={"location"}
                    className="form-select"
                    defaultValue={"Munich"}
                  >
                    <option value="Munich">Munich</option>
                    <option value="Berlin">Berlin</option>
                  </select>
                </div>
                <div className="col-12 col-sm-6 col-md-5">
                  <input
                    required
                    name="query"
                    type="text"
                    className="form-control"
                    placeholder={"Find your dream job now"}
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-2">
                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : null}
                    {"Search"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading ? <SearchLoading /> : content}
    </div>
  );
};

export default Search;
