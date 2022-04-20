import * as React from "react";
import { useNavigate } from "react-router-dom";

import { JobCard, SearchLoading } from "../../components";
import { ROUTES } from "../../router";
import { StateType } from "./type";
import { useAppSelector } from "../../hooks/redux";

const Results: React.FC<StateType> = ({ results, loading, status, error }) => {
  const appliedList = useAppSelector((state) => state.jobs.appliedList);
  const navigate = useNavigate();
  const content = (
    <div className="row">
      <div className="col-10 col-sm-9 col-md-8 col-lg-6 mx-auto my-3">
        <div className="row gy-3">
          {status === "resolved" &&
            (results?.Jobs && results.Jobs.length > 0 ? (
              results.Jobs.map((job) => {
                const isApplied = appliedList.indexOf(job.Guid) !== -1;
                return (
                  <JobCard
                    {...job}
                    key={job.Guid}
                    isApplied={isApplied}
                    onClick={() =>
                      navigate(
                        `${ROUTES.details.path}`.replace(":id", job.Guid),
                        {
                          state: { ...job, isApplied },
                        }
                      )
                    }
                  />
                );
              })
            ) : (
              <h1 className="text-center text-black mt-5">
                {"No jobs were found to match your search "}
              </h1>
            ))}
          {status === "rejected" ? (
            <h1 className="text-center text-black mt-5">
              {"Some thing went wrong, please try again later."}
            </h1>
          ) : null}
        </div>
      </div>
    </div>
  );

  return <div>{loading ? <SearchLoading /> : content}</div>;
};

export default Results;
