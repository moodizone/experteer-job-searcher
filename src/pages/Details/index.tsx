import * as React from "react";
import classNames from "classnames";
import { MapPin } from "react-feather";
import { Navigate, useLocation, useParams } from "react-router-dom";

import styles from "../../components/JobCard/styles.module.scss";
import { Props } from "../../components";
import { ROUTES } from "../../router";
import { apply } from "../../redux/slice/jobs";
import { useAppDispatch } from "../../hooks/redux";

const Details = () => {
  const { id } = useParams<keyof { id: string }>();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const jobDetails = location.state as Props | null;

  if (!jobDetails || id !== jobDetails?.Guid) {
    return <Navigate to={ROUTES.search.path} replace />;
  }

  return (
    <div className={"row"}>
      <div className={"col-12"}>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col flex-grow-1 flex-shrink-1">
                  <h5 className="card-title">{jobDetails?.Title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {jobDetails?.Company}
                  </h6>
                  {jobDetails?.Location ? (
                    <div
                      className={classNames(
                        "d-flex align-items-center",
                        styles.icon
                      )}
                    >
                      <MapPin />
                      <span className="d-block ps-1">
                        {jobDetails.Location}
                      </span>
                    </div>
                  ) : null}
                  {jobDetails?.Published ? (
                    <div className="mt-2">{jobDetails?.Published}</div>
                  ) : null}
                </div>
                <div className="col flex-shrink-0 flex-grow-0 ps-1">
                  {jobDetails.isApplied ? (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      disabled
                    >
                      Applied
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() =>
                        jobDetails?.Guid && dispatch(apply(jobDetails?.Guid))
                      }
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
              <div className={"mt-5"}>
                <p
                  className="card-text"
                  dangerouslySetInnerHTML={{ __html: jobDetails.Description! }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
