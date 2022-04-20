import * as React from "react";
import classNames from "classnames";
import { MapPin } from "react-feather";

import { JobsType } from "../../redux/slice/jobs";
import styles from "./styles.module.scss";

export interface Props extends JobsType {
  onClick: () => void;
  isApplied?: boolean;
}

export const JobCard: React.FC<Props> = ({
  onClick,
  Company,
  Description,
  Location,
  Published,
  Title,
  isApplied = false,
  Guid,
}) => {
  return (
    <div className={classNames("card", styles.container)} onClick={onClick}>
      <div className="card-body">
        <div className="row">
          <div className="col flex-grow-1 flex-shrink-1">
            <h5 className="card-title">{Title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{Company}</h6>
          </div>
          {isApplied? (
            <div className="col flex-grow-0 flex-shrink-0 ps-2">
              <span className="badge bg-secondary">Applied</span>
            </div>
          ) : null}
        </div>
        <p className={classNames("card-text", styles.paragraph)}>
          {Description}
        </p>
        {Location ? (
          <div className={classNames("d-flex align-items-center", styles.icon)}>
            <MapPin />
            <span className="d-block ps-1"> {Location}</span>
          </div>
        ) : null}
        {Published ? <div className="mt-3">{Published}</div> : null}
      </div>
    </div>
  );
};
