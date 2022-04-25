import * as React from "react";
import { useNavigate } from "react-router-dom";

import { JobCard, SearchLoading } from "../../components";
import { ROUTES } from "../../router";
import { ResultsProps } from "./type";
import { useAppSelector } from "../../hooks/redux";

const Results: React.FC<ResultsProps> = ({ results, loading, error }) => {
  // =========================================
  // Init
  // =========================================
  const navigate = useNavigate();
  const appliedList = useAppSelector((state) => state.jobs.appliedList);

  // =========================================
  // Subcomponents
  // =========================================
  const jobsContent = results?.map((job) => {
    const isApplied = appliedList.indexOf(job.Guid) !== -1;
    return (
      <JobCard
        {...job}
        key={job.Guid}
        isApplied={isApplied}
        onClick={() =>
          navigate(`${ROUTES.details.path}`.replace(":id", job.Guid), {
            state: { ...job, isApplied },
          })
        }
      />
    );
  });
  const emptyContent = (
    <h1 className="text-center text-black mt-5">
      {"No jobs were found to match your search "}
    </h1>
  );
  const errorContent = (
    <>
      <h1 className="text-center text-black mt-5">
        {"Some thing went wrong, please try again later."}
      </h1>
      <pre>{error?.toString()}</pre>
    </>
  );
  const content = (
    <div className="row">
      <div className="col-10 col-sm-9 col-md-8 col-lg-6 mx-auto my-3">
        <div className="row gy-3">
          {error ? errorContent : null}
          {results && results.length === 0 ? emptyContent : jobsContent}
        </div>
      </div>
    </div>
  );

  // =========================================
  // Render
  // =========================================
  return <div>{loading ? <SearchLoading /> : content}</div>;
};

export default Results;
