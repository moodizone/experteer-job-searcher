import * as React from "react";

import { JobsType } from "../../redux/slice/jobs";

interface Props extends JobsType {
  onClick: () => void;
}

const JobCard: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p className="card-text">lorem</p>
      </div>
    </div>
  );
};

export default JobCard;
