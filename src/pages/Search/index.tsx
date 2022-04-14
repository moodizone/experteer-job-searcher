import * as React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const Search = () => {
  return (
    <div
      className={classNames(
        styles.container,
        "d-flex justify-content-center align-items-center"
      )}
    >
      <div className={classNames("row gy-3", styles.content)}>
        <div className="col-12">
          <h1 className="text-white text-center mb-3 mb-lg-5">
            {"Welcome to DevJobs"}
          </h1>
        </div>
        <div className="col-12">
          <form>
            <div className="px-3 d-flex flex-wrap gx-3 gy-3 row">
              <div className="col-12 col-sm-6 col-md-5">
                <input
                  type="text"
                  placeholder={"Location"}
                  className="form-control"
                />
              </div>
              <div className="col-12 col-sm-6 col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder={"Find your dream job now"}
                />
              </div>
              <div className="col-12 col-sm-12 col-md-2">
                <button type="submit" className="btn btn-success w-100">
                  {"Search"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
